const { google } = require("googleapis");
const { getTeacherInfoByUserId } = require("./teacherInfoService");

/**
 * Get authenticated Google Sheets client
 */
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

const SPREADSHEET_ID = "1A3yMWNhTLFKodFtS2x_L26EXCaUbUhr1-gvu83Hwkzo";
const SHEET_NAME = "Sheet1";

/**
 * Calculate percentage based on average rating (5 = 100%)
 * @param {number} averageRating - Average rating from 1 to 5
 * @returns {number} - Percentage value
 */
const calculatePercentage = (averageRating) => {
  return Math.round((averageRating / 5) * 100);
};

/**
 * Calculate average rating from three ratings
 * @param {number} teacherClarityRating 
 * @param {number} lessonOrganizationRating 
 * @param {number} overallTeacherRating 
 * @returns {number} - Average rating rounded to 2 decimal places
 */
const calculateAverageRating = (teacherClarityRating, lessonOrganizationRating, overallTeacherRating) => {
  const average = (teacherClarityRating + lessonOrganizationRating + overallTeacherRating) / 3;
  return Math.round(average * 100) / 100; // Round to 2 decimal places
};

/**
 * Format date to readable format
 * @param {string} isoDate - ISO date string
 * @returns {string} - Formatted date
 */
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString('uk-UA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Write teacher evaluation data to Google Sheet
 * @param {Object} evaluationData - The evaluation data to write
 * @returns {Promise<Object>} - Result of the operation
 */
async function writeTeacherEvaluationToSheet(evaluationData) {
  try {
    const {
      userId,
      teacherClarityRating,
      lessonOrganizationRating,
      overallTeacherRating,
      additionalComments,
      submittedAt
    } = evaluationData;

    // Get teacher information from Altegio appointments database
    console.log('Getting teacher info from appointments for userId:', userId);
    const teacherInfo = await getTeacherInfoByUserId(userId);
    
    let teacherName = 'Unknown Teacher';
    let teacherId = 'Unknown ID';
    let leadName = 'Unknown Lead';
    let lastAppointmentDate = 'N/A';
    let lastServiceName = 'N/A';
    
    if (teacherInfo) {
      teacherName = teacherInfo.teacherName || 'Unknown Teacher';
      teacherId = teacherInfo.teacherId || 'Unknown ID';
      leadName = teacherInfo.leadName || 'Unknown Lead';
      lastAppointmentDate = teacherInfo.lastAppointmentDate ? 
        new Date(teacherInfo.lastAppointmentDate).toLocaleString('uk-UA') : 'N/A';
      lastServiceName = teacherInfo.lastServiceName || 'N/A';
      
      console.log('Teacher info retrieved from appointments:', {
        teacherName,
        teacherId,
        leadName,
        lastAppointmentDate,
        lastServiceName
      });
    } else {
      console.log('Could not retrieve teacher info from appointments for userId:', userId);
    }

    // Recalculate average rating to ensure accuracy
    const recalculatedAverage = calculateAverageRating(
      teacherClarityRating, 
      lessonOrganizationRating, 
      overallTeacherRating
    );
    
    // Calculate percentage
    const percentage = calculatePercentage(recalculatedAverage);
    
    // Format date
    const formattedDate = formatDate(submittedAt);

    const auth = getGoogleSheetsAuth();
    const sheets = getSheetsClient(auth);
    
    // Data row to be written to the sheet (expanded with appointment info)
    const rowData = [
      userId,                          // A: User ID (Lead ID)
      leadName,                        // B: Lead Name  
      teacherId,                       // C: Teacher ID
      teacherName,                     // D: Teacher Name
      lastAppointmentDate,             // E: Last Appointment Date
      lastServiceName,                 // F: Last Service Name
      teacherClarityRating,           // G: Teacher Clarity Rating
      lessonOrganizationRating,       // H: Lesson Organization Rating
      overallTeacherRating,           // I: Overall Teacher Rating
      recalculatedAverage,            // J: Average Rating
      percentage,                     // K: Percentage
      additionalComments || "",       // L: Additional Comments
      formattedDate                   // M: Submitted At
    ];

    // Check if headers exist, if not add them
    const headerRange = `${SHEET_NAME}!A1:M1`;
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: headerRange,
    });

    const existingHeaders = headerResponse.data.values;
    
    if (!existingHeaders || existingHeaders.length === 0) {
      // Add headers if they don't exist (expanded with appointment info)
      const headers = [
        "User ID (Lead ID)",
        "Lead Name",
        "Teacher ID", 
        "Teacher Name",
        "Last Appointment Date",
        "Last Service Name",
        "Teacher Clarity Rating",
        "Lesson Organization Rating", 
        "Overall Teacher Rating",
        "Average Rating",
        "Percentage (%)",
        "Additional Comments",
        "Submitted At"
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: headerRange,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [headers],
        },
      });
    }

    // Append the data
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    console.log(`Teacher evaluation data appended successfully. ${result.data.updates.updatedCells} cells updated.`);
    
    return {
      success: true,
      message: "Teacher evaluation saved successfully",
      data: {
        userId,
        leadName,
        teacherId,
        teacherName,
        lastAppointmentDate,
        lastServiceName,
        averageRating: recalculatedAverage,
        percentage,
        updatedCells: result.data.updates.updatedCells
      }
    };

  } catch (error) {
    console.error('Error writing teacher evaluation to Google Sheet:', error.message);
    throw new Error(`Failed to save teacher evaluation: ${error.message}`);
  }
}

/**
 * Main service function to save teacher evaluation
 * @param {Object} evaluationData - The evaluation data
 * @returns {Promise<Object>} - Result of the operation
 */
async function saveTeacherEvaluation(evaluationData) {
  try {
    if (!evaluationData) {
      throw new Error('Evaluation data is required');
    }

    const result = await writeTeacherEvaluationToSheet(evaluationData);
    return result;

  } catch (error) {
    console.error('Error in saveTeacherEvaluation service:', error.message);
    return {
      success: false,
      message: error.message
    };
  }
}

module.exports = {
  saveTeacherEvaluation,
  calculateAverageRating,
  calculatePercentage,
  writeTeacherEvaluationToSheet,
};
