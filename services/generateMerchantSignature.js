const crypto = require('crypto');

/**
 * Generates a merchantSignature for WayForPay payment form.
 * @param {Object} params - Payment parameters.
 * @param {string} secretKey - Secret key for signature.
 * @returns {string} - The generated signature.
 */
function generateMerchantSignature (params, secretKey){
    // Сортуємо параметри за ключами
    const sortedKeys = Object.keys(params).sort();
    const sortedParams = sortedKeys.map(key => `${key}=${params[key]}`).join('&');

    // Формуємо рядок для підпису
    const stringToSign = `${sortedParams}&secretKey=${secretKey}`;

    // Генеруємо підпис
    return crypto.createHash('sha256').update(stringToSign).digest('hex');
}
module.exports = {
    generateMerchantSignature
};