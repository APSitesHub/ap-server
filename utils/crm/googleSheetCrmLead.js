const { google } = require("googleapis");
const getCRMLead = require("../../services/crmGetLead");
const { toSheetsDate } = require("../dateUtils");
const { LEAD_CUSTOM_FIELDS, STATUS_ID } = require("./constants");

const getGoogleSheetsAuth = () => {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

const getSheetsClient = (auth) => {
  return google.sheets({ version: 'v4', auth });
};

// Configuration
const SOURCE_SPREADSHEET_ID = '1LMTGGnj9AaMorg84dE1FQ0hmRgekXYnHR83Cgm79P5o';
const SOURCE_SHEET_NAME = 'Наступний крок назначено після пробного';
const SOURCE_RANGE = `${SOURCE_SHEET_NAME}!A:A`;

const TARGET_SPREADSHEET_ID = "1LMTGGnj9AaMorg84dE1FQ0hmRgekXYnHR83Cgm79P5o";
const TARGET_SHEET_NAME = 'Наступний крок назначено після пробного';
const TARGET_RANGE = `${TARGET_SHEET_NAME}!A:Z`; // Wide range to accommodate all possible data

/**
 * Retrieve lead IDs from the source spreadsheet
 * @returns {Promise<Array<string>>} - Array of lead IDs
 */
async function getLeadIdsFromSourceSheet() {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = getSheetsClient(auth);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SOURCE_SPREADSHEET_ID,
      range: SOURCE_RANGE,
    });
    
    const rows = response.data.values || [];
    // Skip header row if it exists and flatten the 2D array
    const leadIds = rows.slice(1).map(row => row[0]).filter(id => id);
    
    console.log(`Retrieved ${leadIds.length} lead IDs from source sheet`);
    return leadIds;
  } catch (error) {
    console.error('Error retrieving lead IDs from source sheet:', error.message);
    throw error;
  }
}


async function createLeadAnalytics(lead, statusId) {
    const leadAnalytics = {
        lead_name: lead.name,
        lead_tag: lead._embedded.tags.map(tag => tag.name).join(", "),
        lead_id: lead.id,
        created_at: toSheetsDate(lead.created_at),
        current_date: toSheetsDate(),
        responsible_user: lead.responsible_user_id,
    };

    Object.keys(LEAD_CUSTOM_FIELDS).forEach(key => {
        leadAnalytics[key.toLowerCase()] = getValueCustomFields(lead, LEAD_CUSTOM_FIELDS[key]);
    });

    const statusKey = Object.keys(STATUS_ID).find(key => STATUS_ID[key] === statusId);
    const identifierCount = getIdentifierCountForStatus(statusKey);

    for (let i = 1; i <= identifierCount; i++) {
        const identifierKey = `IDENTIFIER_${i}`;
        leadAnalytics[identifierKey.toLowerCase()] = getValueCustomFields(lead, LEAD_CUSTOM_FIELDS[identifierKey]);
    }

    return leadAnalytics;
}

function getIdentifierCountForStatus(statusKey) {
    switch (statusKey) {
        case 'BOOK_TRIAL':
            return 11;
        case 'BOOK_TRIAL_YEARLY_ENG':
            return 12;
        case 'BOOK_TRIAL_YEARLY_PL':
            return 13;
        case 'BOOK_TRIAL_YEARLY_GER':
            return 14;
        case 'NOT_WAS_TRIAL':
            return 15;
        case 'WAS_TRIAL':
            return 16;
        case 'NEXT_STEP_2':
            return 17;
        case 'PROPOSITION_SEND_AFTER_TRIAL':
            return 18;
        case 'IGNORE_PROPOSITION_AFTER_SEND':
            return 19;
        case 'NEXT_STEP_AFTER_TRIAL':
            return 20;
        case 'WAIT_PAYMENT':
            return 21;
        default:
            return 11;
    }
}

function getValueCustomFields(lead, field) {
    if (!lead.custom_fields_values || !lead.custom_fields_values.length) {
        return "";
    }
    if (!field || !field.field_id) {
        return "";
    }

    const customField = lead.custom_fields_values.find(f => f.field_id === field.field_id);

    if (!customField || !customField.values || !customField.values[0]) {
        return ""; // Return an empty string if customField or its values are undefined
    }

    if (field.field_type === "date") {
        return toSheetsDate(customField.values[0].value);
    }
    return customField.values[0].value;
}

/**
 * Write lead data to target Google Sheet
 * @param {Object} data - The lead data to write
 * @returns {Promise<void>}
 */
async function writeToTargetSheet(data) {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = getSheetsClient(auth);
    
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: TARGET_SPREADSHEET_ID,
      range: `${TARGET_SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [Object.values(data)],
      },
    });
    
    console.log(`Lead data appended successfully to target sheet. ${result.data.updates.updatedCells} cells updated.`);
    return result;
  } catch (error) {
    console.error('Error writing to target Google Sheet:', error.message);
    throw error;
  }
}

/**
 * Process a single lead: fetch from CRM and write to target sheet
 * @param {string} leadId - The lead ID to process
 * @returns {Promise<{isSuccessful: boolean, message: string}>} - Result of the operation
 */
async function processLead(leadId) {
  let retries = 3; // Number of retries for getCRMLead
  while (retries > 0) {
    try {
      const lead = await getCRMLead(leadId);
      if (!lead) {
        return { 
          isSuccessful: false, 
          message: `No lead found in CRM with ID: ${leadId}` 
        };
      }

      const leadData = await createLeadAnalytics(lead, lead.status_id);
      
      await writeToTargetSheet(leadData);
      return { 
        isSuccessful: true, 
        message: `Lead with ID ${lead.id} successfully transferred to target sheet` 
      };
    } catch (error) {
      retries--;
      console.error(`Error processing lead ${leadId}: ${error.message}. Retries left: ${retries}`);
      if (retries === 0) {
        return { 
          isSuccessful: false, 
          message: `Error processing lead ${leadId}: ${error.message}` 
        };
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
}

/**
 * Main function to transfer lead data from source to target
 * @returns {Promise<{successful: number, failed: number, messages: Array}>} - Summary of the operation
 */
async function transferCRMDataBetweenSheets() {
  const results = {
    successful: 0,
    failed: 0,
    messages: []
  };

  try {
    // Get all lead IDs from source sheet
    const leadIds = await getLeadIdsFromSourceSheet();
    
    if (leadIds.length === 0) {
      results.messages.push("No lead IDs found in source sheet");
      return results;
    }

    // Process each lead ID
    for (const leadId of leadIds) {
      console.log(`Processing lead ID: ${leadId}`);
      const result = await processLead(leadId);
      
      if (result.isSuccessful) {
        results.successful++;
      } else {
        results.failed++;
      }
      
      results.messages.push(`Lead ${leadId}: ${result.message}`);
    }

    console.log(`Transfer complete. Successful: ${results.successful}, Failed: ${results.failed}`);
    return results;
  } catch (error) {
    console.error('Error in data transfer process:', error);
    results.failed++;
    results.messages.push(`Error in data transfer process: ${error.message}`);
    return results;
  }
}

module.exports = {
  transferCRMDataBetweenSheets,
  getLeadIdsFromSourceSheet,
  processLead
};