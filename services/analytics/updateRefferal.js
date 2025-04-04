const { google } = require("googleapis");
const getCRMLead = require("../crmGetLead");
const { toSheetsDate } = require("../../utils/dateUtils");

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

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_REFERRAL_DATA;
const SHEET_NAME = 'Аркуш1';
const DATA_RANGE = `${SHEET_NAME}!A:C`;

/**
 * Check if a lead already exists in the spreadsheet
 * @param {string|number} leadId - The ID of the lead to check
 * @returns {Promise<boolean>} - Whether the lead exists
 */
async function checkIfLeadExists(leadId) {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = getSheetsClient(auth);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: DATA_RANGE,
    });
    
    const rows = response.data.values || [];
    const leadIdStr = String(leadId);
    return rows.some(row => row[0] === leadIdStr);
  } catch (error) {
    console.error(`Error checking if lead ${leadId} exists:`, error.message);
    throw error;
  }
}

/**
 * Write lead data to Google Sheet
 * @param {Object} data - The lead data to write
 * @returns {Promise<void>}
 */
async function writeToGoogleSheet(data) {
  try {
    const auth = getGoogleSheetsAuth();
    const sheets = getSheetsClient(auth);
    
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [Object.values(data)],
      },
    });
    
    console.log(`Lead data appended successfully. ${result.data.updates.updatedCells} cells updated.`);
    return result;
  } catch (error) {
    console.error('Error writing to Google Sheet:', error.message);
    throw error;
  }
}

/**
 * Update referral analytics with CRM lead data
 * @param {string|number} crmId - The CRM ID to process
 * @returns {Promise<{isSuccessful: boolean, message?: string}>} - Result of the operation
 */
async function updateReferralAnalytics(crmId) {
  try {
    if (!crmId) {
      return { 
        isSuccessful: false, 
        message: 'CRM ID is required' 
      };
    }

    const lead = await getCRMLead(crmId);
    if (!lead) {
      return { 
        isSuccessful: false, 
        message: `No lead found with ID: ${crmId}` 
      };
    }
    const exists = await checkIfLeadExists(lead.id);
    if (exists) {
      console.log(`Lead with ID ${lead.id} already exists in the sheet`);
      return { 
        isSuccessful: true, 
        message: `Lead with ID ${lead.id} already exists in the sheet` 
      };
    }

    const leadAnalytics = {
      lead_id: lead.id,
      lead_tag: lead._embedded?.tags?.map(tag => tag.name).join(", ") || "",
      created_at: toSheetsDate(lead.created_at),
    };
    
    await writeToGoogleSheet(leadAnalytics);
    return { 
      isSuccessful: true, 
      message: `Lead with ID ${lead.id} successfully added to analytics` 
    };
  } catch (error) {
    console.error('Error updating referral analytics:', error);
    return { 
      isSuccessful: false, 
      message: `Error: ${error.message}` 
    };
  }
}

module.exports = {
  updateReferralAnalytics,
};