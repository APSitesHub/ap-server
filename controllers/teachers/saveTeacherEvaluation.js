const { saveTeacherEvaluation } = require("../../services/teacherEvaluationService");

/**
 * Save teacher evaluation to Google Sheets
 * 
 * This controller handles teacher evaluation data and saves it to Google Sheets.
 * Features:
 * - Validates incoming data using Joi schema
 * - Recalculates average rating from 3 individual ratings for accuracy
 * - Converts average rating to percentage (5 = 100%)
 * - Saves data to specified Google Sheet with proper formatting
 * - Returns success response with calculated values
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing evaluation data
 * @param {string} req.body.userId - User ID
 * @param {number} req.body.teacherClarityRating - Teacher clarity rating (1-5)
 * @param {number} req.body.lessonOrganizationRating - Lesson organization rating (1-5)
 * @param {number} req.body.overallTeacherRating - Overall teacher rating (1-5)
 * @param {string} [req.body.additionalComments] - Optional additional comments
 * @param {string} req.body.submittedAt - ISO date string of submission
 * @param {number} req.body.averageRating - Average rating (recalculated in service)
 * @param {Object} res - Express response object
 */
const saveTeacherEvaluationController = async (req, res) => {
  try {
    console.log('saveTeacherEvaluation request body:', req.body);
    
    const result = await saveTeacherEvaluation(req.body);
    
    if (result.success) {
      res.status(201).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message
      });
    }
    
  } catch (error) {
    console.error('Error in saveTeacherEvaluationController:', error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error occurred while saving teacher evaluation",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = saveTeacherEvaluationController;
