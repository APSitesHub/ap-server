const leadFeedback = require("../../services/leadFeedback");

const postLeadFeedback = async (req, res) => {
  try {
    const { leadId, answers } = req.body;
    await leadFeedback(leadId, answers);

    return res.status(201).json({ message: 'Analytics updated successfully'});
} catch (error) {
    console.error('salesAnalyticsController has error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
};

module.exports = postLeadFeedback;