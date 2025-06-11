const { generateMerchantSignature } = require('../../services/generateMerchantSignature');

const postPaymentSignature = (req, res) => {
    const requiredFields = [
        'merchantAccount',
        'merchantDomainName',
        'orderReference',
        'orderDate',
        'amount',
        'currency',
        'productName',
        'productCount',
        'productPrice',
        'customerFirstName',
        'customerLastName',
        'customerPhone',
    ];
    const params = req.body;

    params.merchantAccount = 'ap_education';
    params.merchantDomainName = 'ap.education';
    params.amount = 490;
    params.currency = 'UAH';
    params.productName = 'Курс іноземних мов';
    params.productCount = 1;
    params.productPrice = 490;

    for (const field of requiredFields) {
        if (!params[field] || (Array.isArray(params[field]) && params[field].length === 0)) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    try {
        const secretKey = process.env.WFP_SECRET_KEY || 'flk3409refn54t54t*FNJRET';
        const merchantSignature = generateMerchantSignature(params, secretKey);
        res.status(200).json({ merchantSignature });
    } catch (e) {
        res.status(400).json({ error: 'Invalid parameters', details: e.message });
    }
};

module.exports = postPaymentSignature;
