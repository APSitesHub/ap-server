const crypto = require('crypto');

/**
 * Generates a merchantSignature for WayForPay payment form.
 * @param {Object} params - Payment parameters.
 * @param {string} secretKey - Secret key for signature.
 * @returns {string} - The generated signature.
 */
function generateMerchantSignature(params, secretKey) {
    // Формуємо масиви для productName, productCount, productPrice
    const productNames = Array.isArray(params.productName) ? params.productName : [params.productName];
    const productCounts = Array.isArray(params.productCount) ? params.productCount : [params.productCount];
    const productPrices = Array.isArray(params.productPrice) ? params.productPrice : [params.productPrice];

    // Формуємо масив у потрібному порядку
    const signatureParams = [
        params.merchantAccount,
        params.merchantDomainName,
        params.orderReference,
        params.orderDate,
        params.amount,
        params.currency,
        ...productNames,
        ...productCounts,
        ...productPrices
    ];

    // Створюємо рядок для підпису
    const stringToSign = signatureParams.join(';');

    // Генеруємо HMAC_MD5 підпис
    return crypto.createHmac('md5', secretKey).update(stringToSign).digest('hex');
}

module.exports = {
    generateMerchantSignature
};