const { updateReferralAnalytics } = require('../services/referralAnalyticsService');

async function referralAnalyticsController(req, res) {
  try {
    if (!req.body || !req.body.leads) {
      return res.status(400).json({
        success: false,
        message: 'Missing required field: leads'
      });
    }

    const { leads } = req.body;
    if (!leads.status || !Array.isArray(leads.status) || leads.status.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid leads data structure: status array is missing or empty'
      });
    }
    const crmId = leads.status[0].id;
    if (!crmId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead data: missing ID'
      });
    }
    console.log(`Processing lead with CRM ID: ${crmId}`);
    const result = await updateReferralAnalytics(crmId);
    if (result.isSuccessful) {
      return res.status(200).json({
        success: true,
        message: result.message || 'Lead processed successfully',
        data: { leadId: crmId }
      });
    } else {
      return res.status(422).json({
        success: false,
        message: result.message || 'Failed to process lead',
        data: { leadId: crmId }
      });
    }
  } catch (error) {
    console.error('Error in referral analytics controller:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}

module.exports = {
    referralAnalyticsController,
};