const  { updateSalesAnalytics } = require('../../services/analytics/updateSalesAnalytics');

const salesAnalyticsController = async (req, res) => {
    try {
        const { leads } = req.body;
        console.log(leads);
        if (!leads) {
            return res.status(400).json({ error: 'leads not found' });
        }
        if (!leads.status && !leads.status.length) {
            return res.status(400).json({ error: 'leads status not found' });
        }
        const crmId = leads.status[0].id;
        await updateSalesAnalytics(crmId);
        res.status(200).json({ message: 'Analytics updated successfully' });
    } catch (error) {
        console.error('salesAnalyticsController has error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    salesAnalyticsController,
};