// config/sms.js
// Twilio SMS sender — replace toaster OTP with real SMS

const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send OTP via SMS using Twilio
 * @param {string} phone - 10 digit Indian phone number
 * @param {string} otp   - 6 digit OTP code
 */
const sendOtpSms = async (phone, otp) => {
  // Format to E.164 for India (+91XXXXXXXXXX)
  const formattedPhone = `+91${phone}`;

  const message = `Your CleanPress OTP is: ${otp}. Valid for 10 minutes. Do not share with anyone. -CleanPress`;

  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number e.g. +1XXXXXXXXXX
      to: formattedPhone,
    });

    console.log(`✅ SMS sent to ${formattedPhone} | SID: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error(`❌ SMS failed to ${formattedPhone}:`, error.message);
    throw new Error(`SMS delivery failed: ${error.message}`);
  }
};

module.exports = { sendOtpSms };
