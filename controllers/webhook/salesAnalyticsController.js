const  { updateSalesAnalytics } = require('../../services/analytics/updateSalesAnalytics');

const salesAnalyticsController = async (req, res) => {
    try {
        const { leads } = req.body;
        if (!leads) {
            return res.status(400).json({ error: 'leads not found' });
        }
        if (!leads.status && !leads.status.length) {
            return res.status(400).json({ error: 'leads status not found' });
        }
        const crmId = leads.status[0].id;
        const response = await updateSalesAnalytics(crmId);
        return res.status(200).json({ message: 'Analytics updated successfully', data: response });
    } catch (error) {
        console.error('salesAnalyticsController has error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    salesAnalyticsController,
};