import axios from 'axios';

const DARAJA_CONSUMER_KEY = process.env.DARAJA_CONSUMER_KEY;
const DARAJA_CONSUMER_SECRET = process.env.DARAJA_CONSUMER_SECRET;
const DARAJA_PASSKEY = process.env.DARAJA_PASSKEY;
const DARAJA_SHORTCODE = process.env.DARAJA_SHORTCODE;
const DARAJA_CALLBACK_URL = process.env.DARAJA_CALLBACK_URL;

const getAccessToken = async () => {
    const auth = Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString('base64');
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: { Authorization: `Basic ${auth}` }
    });
    return response.data.access_token;
};

export const initiateSTKPush = async (phoneNumber: string, amount: number, accountReference: string) => {
    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${DARAJA_SHORTCODE}${DARAJA_PASSKEY}${timestamp}`).toString('base64');

    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        BusinessShortCode: DARAJA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: DARAJA_SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: DARAJA_CALLBACK_URL,
        AccountReference: accountReference,
        TransactionDesc: 'Payment for order'
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
};
