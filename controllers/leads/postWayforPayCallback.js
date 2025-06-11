function postWayforPayCallback (req, res) {
    console.log('WayforPay Callback Body:', req.body);
    res.status(200).send('Callback received');
};

// WayforPay Callback Body: {
//   '{"merchantAccount":"test_merch_n1","orderReference":"AP-1749645521-4956","merchantSignature":"454fd4698293514a13449ff2836de2ac","amount":490,"currency":"UAH","authCode":"847011","email":"seo@ap.education","phone":"7812348134162","createdDate":1749645522,"processingDate":1749645656,"cardPan":"51****5977","cardType":"MasterCard","issuerBankCountry":"Ukraine","issuerBankName":"JSC CB PRIVATBANK","recToken":"68497932-8940-464b-987e-17599cb36dc2","transactionStatus":"Approved","reason":"Ok","reasonCode":1100,"fee":9.8,"paymentSystem":"card","acquirerBankName":"WayForPay","cardProduct":"debit","clientName":"\\u0412\\u041e\\u0414\\u041e\\u041d\\u0406\\u0421 \\u0406\\u041b\\u041b\\u042f"}': ''
// }
// POST /leads/wayforpay-callback/ 200 3.827 ms - 17
// WayforPay Callback Body: {
//   '{"merchantAccount":"test_merch_n1","orderReference":"AP-1749645521-4956","merchantSignature":"454fd4698293514a13449ff2836de2ac","amount":490,"currency":"UAH","authCode":"847011","email":"seo@ap.education","phone":"7812348134162","createdDate":1749645522,"processingDate":1749645656,"cardPan":"51****5977","cardType":"MasterCard","issuerBankCountry":"Ukraine","issuerBankName":"JSC CB PRIVATBANK","recToken":"68497932-8940-464b-987e-17599cb36dc2","transactionStatus":"Approved","reason":"Ok","reasonCode":1100,"fee":9.8,"paymentSystem":"card","acquirerBankName":"WayForPay","cardProduct":"debit","clientName":"\\u0412\\u041e\\u0414\\u041e\\u041d\\u0406\\u0421 \\u0406\\u041b\\u041b\\u042f"}': ''

module.exports = postWayforPayCallback;