const axios = require('axios');
const { google } = require('googleapis');
const { getToken } = require('../services/tokensServices');
const getCRMUser = require('../services/crmGetUser');
const { format } = require('date-fns');

const idString = '20719531 20691151 20881343 20872959 20686271 19800299 20882827 20864849 20798799 20897945 20886939 20871809 20907621 20868695 20871311 20808527 20774811 20763037 20860161 20861879 20836605 20804217 20891377 20865437 20834355 20771655 20813223 20859481 20884411 20841669 20826629 20869277 20776607 20811045 20796137 20836487 20822817 20676757 20868613 20865897 20839959 20906283 20905729 20537793 20738991 20655023 20906235 20804967 20821265 20812851 20751419 20844771 20630587 20784401 20695051 20809187 20842875 20805743 20867553 20866693 20871339 20851123 20865465 20905109 20863223 20869713 20822289 20866649 20866801 20818363 20867415 20866045 20871915 20868889 20819505 20841801 20869103 20792917 20851251 20635349 20823565 20782421 20893903 20865515 20788515 20867705 20869561 20824883 20682981 20804193 20872971 20843223 20793201 20854183 20833353 20781563 20841877 20839307 20819909 20859307 20483825 20869697 20810483 20688521 20853705 20819085 20901013 20900845 20832669 20869539 20772043 20868907 20781891 20869503 20710163 20886777 20887139 20895071 20888775 20888233 20889485 20886365 20891945 20866651 20864895 20889413 20863699 20882217 20892775 20860679 20863645 20867711 20793923 20811199 20408183 20789423 20853323 20862729 20884683 20886473 20888429 20866981 20889057 20862915 20888945 20828509 20887719 20795891 20833501 20891911 20892557 20855763 20861771 20846255 20872229 20892877 20893627 20686511 20894275 20851367 20894511 20888651 20808941 20894549 20899031 20308983 20868685 20900313 20883351 20882775 20881905 20866745 20874665 20865891 20904667 20904351 20886759 20895301 20889147 20871899 20904191 20824627 20904491 20869469 20870737 20870789 20871243 20868667 20867411 20870755 20852541 20833137 20904305 20779399 20897749 20899821 20900009 20899785 20901709 20892277 20889525 20904049 20899815 20900665 20898879';

const idArray = idString.split(' ');

// Google Sheets setup
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
const SHEET_ID = '1us5u7W5OLnuL7tun9-WA9i_VrTK4NtrCa5mmEZ9ZExo'; // Replace with your Google Sheet ID
const SHEET_RANGE = 'test!A1'; // Replace with your desired sheet and range

// Function to authenticate with Google Sheets API
async function authenticateGoogleSheets() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: clientEmail,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    return google.sheets({ version: 'v4', auth });
}

// Function to fetch a single lead by ID
async function getCRMLead(id) {
    try {
        const currentToken = await getToken();
        axios.defaults.headers.common.Authorization = `Bearer ${currentToken[0].access_token}`;
        const crmLead = await axios.get(
            `https://apeducation.kommo.com/api/v4/leads/${id}?with=contacts`
        );
        return crmLead.data;
    } catch (error) {
        console.error(`Error fetching lead with ID ${id}:`, error.message);
        return null;
    }
}

// Function to fetch all leads by IDs
async function fetchAllLeads() {
    const allLeads = [];
    for (const id of idArray) {
        const lead = await getCRMLead(id);
        if (lead) {
            allLeads.push(lead);
        }
    }
    return allLeads;
}

// Function to fetch responsible user names and replace IDs
async function replaceResponsibleUserIds(leads) {
    const userCache = {}; // Cache to avoid duplicate API calls
    for (const lead of leads) {
        const userId = lead.responsible_user_id;
        if (!userCache[userId]) {
            const user = await getCRMUser(userId);
            userCache[userId] = user ? user.name : 'Unknown User';
        }
        lead.responsible_user_name = userCache[userId];
    }

    return leads;
}

// Function to write leads to Google Sheets
async function writeLeadsToGoogleSheets(leads) {
    try {
        const sheets = await authenticateGoogleSheets();
        const prepearLeads = await replaceResponsibleUserIds(leads);

        // Extract all unique custom field names
        const customFieldNames = new Set();
        prepearLeads.forEach(lead => {
            if (lead.custom_fields_values) {
                lead.custom_fields_values.forEach(field => {
                    customFieldNames.add(field.field_name);
                });
            }
        });

        const customFieldHeaders = Array.from(customFieldNames);

        // Prepare data for Google Sheets
        const rows = prepearLeads.map(lead => {
            const row = [
                lead.id,
                lead.name,
                lead.price,
                lead.responsible_user_name, // Use the name instead of the ID
                lead.status_id,
                lead.pipeline_id,
                format(new Date(lead.created_at * 1000), 'dd.MM.yyyy'), // Format created_at
                '25.03.2025', // Set updated_at to a fixed date
                lead.closed_at ? format(new Date(lead.closed_at * 1000), 'dd.MM.yyyy') : '', // Format closed_at
                lead._embedded?.tags ? lead._embedded.tags.map(tag => tag.name).join(', ') : '', // Join tags into a single cell
            ];

            // Add custom field values in the same order as headers
            customFieldHeaders.forEach(header => {
                const field = lead.custom_fields_values?.find(f => f.field_name === header);
                row.push(field ? field.values.map(v => v.value).join(', ') : '');
            });

            return row;
        });

        // Add headers
        const headers = [
            'ID',
            'Name',
            'Price',
            'Responsible User',
            'Status ID',
            'Pipeline ID',
            'Created At',
            'Updated At',
            'Closed At',
            'Tags', // Add a header for tags
            ...customFieldHeaders,
        ];
        rows.unshift(headers);

        // Write data to Google Sheets
        await sheets.spreadsheets.values.update({
            spreadsheetId: SHEET_ID,
            range: SHEET_RANGE,
            valueInputOption: 'RAW',
            resource: {
                values: rows,
            },
        });

        console.log('Leads written to Google Sheets successfully.');
    } catch (error) {
        console.error('Error writing to Google Sheets:', error);
    }
}

// Main function to fetch leads and write them to Google Sheets
async function WRITE_LEADS() {
    const leads = await fetchAllLeads();
    if (leads.length > 0) {
        await writeLeadsToGoogleSheets(leads);
    } else {
        console.log('No leads to write.');
    } 
} 

module.exports = {
    WRITE_LEADS
};