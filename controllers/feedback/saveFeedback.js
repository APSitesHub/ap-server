const { writeFeedbackToGoogleSheet } = require("../../services/feedback/feedbackSheet");

/**
 * Controller for saving feedback data to Google Sheets
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const saveFeedback = async (req, res) => {
  try {
    const { feedback, improvements } = req.body;

    // Validate input data
    if (!feedback && !improvements) {
      return res.status(400).json({
        success: false,
        message: "At least one field (feedback or improvements) is required"
      });
    }

    // Save to Google Sheets
    const result = await writeFeedbackToGoogleSheet({
      feedback,
      improvements
    });

    res.status(201).json({
      success: true,
      message: "Feedback successfully saved",
      data: result
    });

  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save feedback",
      error: error.message
    });
  }
};

module.exports = {
  saveFeedback
};
