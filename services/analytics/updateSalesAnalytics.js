const getCRMLead = require("../crmGetLead");
const getCRMUser = require("../crmGetUser");
const { formatDate } = require("../../utils/dateUtils");
require("dotenv").config();
const { LEAD_CUSTOM_FIELDS, STATUS_ID, PIPELINE_ID_SALES, EXEL_TABS } = require("../../utils/crm/constants");
const { google } = require("googleapis");

async function updateSalesAnalytics(crmId) {
    const lead = await getCRMLead(crmId);
    if (!lead) {
        return null;
    }

    if (lead.pipeline_id !== PIPELINE_ID_SALES) {
        return null;
    }

    const leadAnalytics = await createLeadAnalytics(lead, lead.status_id);
    await writeToGoogleSheet(leadAnalytics, lead.status_id);
    return leadAnalytics;
}

async function createLeadAnalytics(lead, statusId) {
    const leadAnalytics = {
        lead_name: lead.name,
        lead_tag: lead._embedded.tags.map(tag => tag.name).join(", "),
        lead_id: lead.id,
        created_at: formatDate(lead.created_at),
        current_date: formatDate(),
        responsible_user: await getResponsibleUser(lead).then(user => user ? user.name : (lead.responsible_user_id || "")),
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

    if(field.field_type === "date") {
        return formatDate(customField.values[0].value);
    }
    return customField ? customField.values[0].value : "";
}

async function getResponsibleUser(lead) {
    if (!lead.responsible_user_id) {
        return null;
    }
    return await getCRMUser(lead.responsible_user_id);
}

async function writeToGoogleSheet(data, statusId) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const statusKey = Object.keys(STATUS_ID).find(key => STATUS_ID[key] === statusId);
    const sheetName = EXEL_TABS[statusKey];

    console.log(`Attempting to write to sheet: ${sheetName}`);

    const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID_ANALYTICS_SALES,
    });

    const sheet = spreadsheet.data.sheets.find(sheet => sheet.properties.title === sheetName);
    if (!sheet) {
        console.error(`Sheet with name ${sheetName} not found`);
        throw new Error(`Sheet with name ${sheetName} not found`);
    }

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID_ANALYTICS_SALES,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [Object.values(data)],
        },
    });
}

module.exports = {
    updateSalesAnalytics,
};
