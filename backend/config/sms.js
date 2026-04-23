
 
const sendOtpSms = async (phone, otp) => {
  const isDev = process.env.NODE_ENV !== 'production';
  const apiKey = process.env.FAST2SMS_API_KEY;

  // ── No API key configured ────────────────────────────
  if (!apiKey || apiKey === 'YOUR_FAST2SMS_API_KEY_HERE') {
    if (isDev) {
      // Development fallback: just log OTP to console — no SMS needed
      console.log('\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📱  DEV MODE — OTP for +91${phone}: ${otp}`);
      console.log('   (Set FAST2SMS_API_KEY in .env for real SMS)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n');
      return { success: true, dev: true };
    } else {
      throw new Error('SMS_NOT_CONFIGURED: FAST2SMS_API_KEY missing in production .env');
    }
  }

  // ── Send real SMS via Fast2SMS OTP route ─────────────
  // API docs: https://docs.fast2sms.com
  // This route sends: "Your OTP is XXXXXX"
  // No sender ID / DLT template needed on this route.
  const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${apiKey}&variables_values=${otp}&route=otp&numbers=${phone}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    });

    const data = await response.json();

    // Fast2SMS returns { return: true, request_id: '...', message: [...] } on success
    if (!data.return) {
      const reason = Array.isArray(data.message) ? data.message.join(', ') : data.message;
      throw new Error(`Fast2SMS error: ${reason}`);
    }

    console.log(`✅ OTP SMS sent to +91${phone} | Request ID: ${data.request_id}`);
    return { success: true, requestId: data.request_id };

  } catch (error) {
    // fetch() network error (not Fast2SMS API error)
    if (error.name === 'TypeError') {
      throw new Error('SMS delivery failed: Could not reach Fast2SMS. Check internet connection.');
    }
    // Re-throw Fast2SMS API errors as-is
    throw new Error(`SMS delivery failed: ${error.message}`);
  }
};

module.exports = { sendOtpSms };