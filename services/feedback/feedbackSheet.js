const { google } = require("googleapis");
require("dotenv").config();

// Configuration for feedback data
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID_FEEDBACK || '1Jlw3bBtkXU9b4Gd-29jTm8dxiQVWCI9uj9Xeq1E5hVw';
const SHEET_NAME = 'Feedback';

/**
 * Write feedback data to Google Sheets
 * @param {Object} data - Feedback data containing feedback and improvements
 * @returns {Promise<Object>} - Result of the operation
 */
async function writeFeedbackToGoogleSheet(data) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get current timestamp for the record
    const timestamp = new Date().toLocaleString('uk-UA', {
      timeZone: 'Europe/Kiev',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Prepare the row data
    const rowData = [
      timestamp,
      data.feedback || '',
      data.improvements || ''
    ];

    console.log('Writing feedback data to Google Sheets:', { timestamp, feedback: data.feedback, improvements: data.improvements });

    // Check if headers exist, if not create them
    try {
      const headerResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:C1`,
      });

      if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
        // Add headers if they don't exist
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:C1`,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [['Timestamp', 'Feedback', 'Improvements']],
          },
        });
        console.log('Headers added to the sheet');
      }
    } catch (headerError) {
      console.log('Error checking/adding headers, proceeding with data insertion:', headerError.message);
    }

    // Append the feedback data
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:C`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    console.log(`Feedback data written successfully. ${result.data.updates.updatedCells} cells updated.`);
    
    return {
      success: true,
      message: 'Feedback data successfully saved to Google Sheets',
      updatedCells: result.data.updates.updatedCells,
      spreadsheetId: SPREADSHEET_ID,
      sheetName: SHEET_NAME
    };

  } catch (error) {
    console.error('Error writing feedback to Google Sheets:', error);
    throw new Error(`Failed to write feedback to Google Sheets: ${error.message}`);
  }
}

module.exports = {
  writeFeedbackToGoogleSheet
};
