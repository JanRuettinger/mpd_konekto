import twilio from 'twilio';

const accountSid = 'AC6e0315334a5e22f8a9c9abf661c7f715'; // Your Account SID
const authToken = 'aa8727b9e743d2550bb1859a66cd8cc7'; // Your Auth Token

export default new twilio(accountSid, authToken);
