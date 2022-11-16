require('dotenv').config();
var request = require('request');
exports.handler = async function (event, context, callback) {
    const data = JSON.parse(event.body);

    request({
        method: 'POST',
        url: `https://${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}@api.razorpay.com/v1/payments/${data.payment_id}/capture`,
        form: {
            amount: data.payment_amount,
            currency: data.payment_currency
        }
    }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
    });
    callback(null, {
        statusCode: 200
    })
}
