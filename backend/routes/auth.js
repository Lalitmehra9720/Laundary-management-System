
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { protect, adminOnly } = require('../middleware/auth');
// const { sendOtpSms } = require('../config/sms');

// const router = express.Router();

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// // ════════════════════════════════════════════════════════
// //  ADMIN REGISTRATION
// //  - Only 1 admin allowed in entire system
// //  - Requires ADMIN_SECRET from .env (like a secret passcode)
// //  - If admin already exists → reject
// // ════════════════════════════════════════════════════════
// router.post('/register-admin', async (req, res, next) => {
//   try {
//     const { name, email, password, adminSecret } = req.body;

//     // 1. Verify admin secret
//     if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
//       return res.status(403).json({
//         success: false,
//         message: 'Invalid admin secret. Contact system owner.',
//       });
//     }

//     // 2. Check if admin already exists — only 1 allowed
//     const existingAdmin = await User.findOne({ role: 'admin' });
//     if (existingAdmin) {
//       return res.status(400).json({
//         success: false,
//         message: 'An admin account already exists. Only 1 admin is allowed.',
//       });
//     }

//     // 3. Check duplicate email
//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({ success: false, message: 'Email already registered' });
//     }

//     // 4. Create admin
//     const admin = await User.create({ name, email, password, role: 'admin' });
//     const token = generateToken(admin._id);

//     res.status(201).json({
//       success: true,
//       message: '✅ Admin account created successfully',
//       data: {
//         token,
//         user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // ════════════════════════════════════════════════════════
// //  STAFF REGISTRATION
// //  - Only admin can create staff accounts
// //  - Staff CANNOT self-register
// // ════════════════════════════════════════════════════════
// router.post('/register-staff', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ success: false, message: 'Name, email and password required' });
//     }

//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({ success: false, message: 'Email already registered' });
//     }

//     const staff = await User.create({ name, email, password, role: 'staff' });

//     res.status(201).json({
//       success: true,
//       message: `Staff account created for ${name}`,
//       data: {
//         user: { id: staff._id, name: staff.name, email: staff.email, role: staff.role },
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // ════════════════════════════════════════════════════════
// //  STAFF / ADMIN LOGIN (email + password)
// // ════════════════════════════════════════════════════════
// router.post('/login', async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Email and password required' });
//     }

//     const user = await User.findOne({ email, role: { $in: ['admin', 'staff'] } });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
//     }

//     if (!user.isActive) {
//       return res.status(403).json({ success: false, message: 'Your account has been deactivated. Contact admin.' });
//     }

//     const token = generateToken(user._id);

//     res.json({
//       success: true,
//       message: 'Login successful',
//       data: {
//         token,
//         user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // ════════════════════════════════════════════════════════
// //  CUSTOMER OTP LOGIN
// //  Step 1: Send OTP via real Twilio SMS
// // ════════════════════════════════════════════════════════
// router.post('/customer/send-otp', async (req, res, next) => {
//   try {
//     const { phone, name } = req.body;

//     if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
//       return res.status(400).json({ success: false, message: 'Enter a valid 10-digit Indian mobile number' });
//     }

//     // Find or create customer
//     let customer = await User.findOne({ phone, role: 'customer' });

//     if (!customer) {
//       // New customer — name required
//       if (!name || !name.trim()) {
//         return res.status(400).json({
//           success: false,
//           message: 'New user — please provide your name to register',
//           isNewUser: true,
//         });
//       }
//       customer = new User({ name: name.trim(), phone, role: 'customer' });
//     }

//     // Rate limiting — prevent OTP spam (max 1 OTP per 60 seconds)
//     if (customer.otp?.expiresAt) {
//       const secondsSinceLast = (new Date() - new Date(customer.otp.expiresAt - 10 * 60 * 1000)) / 1000;
//       if (secondsSinceLast < 60) {
//         return res.status(429).json({
//           success: false,
//           message: `Please wait ${Math.ceil(60 - secondsSinceLast)} seconds before requesting another OTP`,
//         });
//       }
//     }

//     // Generate OTP and save
//     const otp = customer.generateOTP();
//     await customer.save();

//     // ── SEND REAL SMS via Twilio ──
//     await sendOtpSms(phone, otp);

//     res.json({
//       success: true,
//       message: `OTP sent to +91 ${phone}. Valid for 10 minutes.`,
//       isNewUser: !customer._id,
//     });

//   } catch (error) {
//     // Twilio errors
//     if (error.message?.includes('SMS delivery failed')) {
//       return res.status(500).json({
//         success: false,
//         message: 'Could not send SMS. Check your phone number and try again.',
//       });
//     }
//     next(error);
//   }
// });

// // ════════════════════════════════════════════════════════
// //  CUSTOMER OTP LOGIN
// //  Step 2: Verify OTP → issue JWT
// // ════════════════════════════════════════════════════════
// router.post('/customer/verify-otp', async (req, res, next) => {
//   try {
//     const { phone, otp } = req.body;

//     if (!phone || !otp) {
//       return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
//     }

//     const customer = await User.findOne({ phone, role: 'customer' });
//     if (!customer) {
//       return res.status(404).json({ success: false, message: 'No account found for this number. Please register first.' });
//     }

//     if (!customer.verifyOTP(otp)) {
//       return res.status(400).json({ success: false, message: 'Invalid or expired OTP. Please request a new one.' });
//     }

//     // Clear OTP after successful verification
//     customer.otp = undefined;
//     await customer.save();

//     const token = generateToken(customer._id);

//     res.json({
//       success: true,
//       message: 'Verified! Welcome to CleanPress.',
//       data: {
//         token,
//         user: {
//           id: customer._id,
//           name: customer.name,
//           phone: customer.phone,
//           role: customer.role,
//         },
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // ════════════════════════════════════════════════════════
// //  COMMON ROUTES
// // ════════════════════════════════════════════════════════

// // GET /api/auth/me
// router.get('/me', protect, (req, res) => {
//   res.json({ success: true, data: { user: req.user } });
// });

// // GET /api/auth/staff — list all staff (admin only)
// router.get('/staff', protect, adminOnly, async (req, res, next) => {
//   try {
//     const staff = await User.find({ role: 'staff' }).select('-password -otp').sort({ createdAt: -1 });
//     res.json({ success: true, data: { staff } });
//   } catch (error) {
//     next(error);
//   }
// });

// // PATCH /api/auth/staff/:id/toggle — activate/deactivate (admin only)
// router.patch('/staff/:id/toggle', protect, adminOnly, async (req, res, next) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id, role: 'staff' });
//     if (!user) return res.status(404).json({ success: false, message: 'Staff member not found' });

//     user.isActive = !user.isActive;
//     await user.save();

//     res.json({
//       success: true,
//       message: `${user.name} has been ${user.isActive ? 'activated' : 'deactivated'}`,
//       data: { isActive: user.isActive },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // DELETE /api/auth/staff/:id — remove staff (admin only)
// router.delete('/staff/:id', protect, adminOnly, async (req, res, next) => {
//   try {
//     const user = await User.findOneAndDelete({ _id: req.params.id, role: 'staff' });
//     if (!user) return res.status(404).json({ success: false, message: 'Staff member not found' });
//     res.json({ success: true, message: `${user.name}'s account removed` });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;




const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');
const { sendOtpSms } = require('../config/sms');

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ═══════════════════════════════════════════════════════
//  1. ADMIN SETUP  →  POST /api/auth/register-admin
//     - Sirf ek baar kaam karta hai
//     - ADMIN_SECRET banana padta hai .env se
//     - Agar admin already exist karta hai → reject
// ═══════════════════════════════════════════════════════
router.post('/register-admin', async (req, res, next) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // Secret check
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Invalid admin secret key.',
      });
    }

    // Only 1 admin allowed ever
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists. Only 1 admin is allowed in the system.',
      });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' });
    }

    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const admin = await User.create({ name, email, password, role: 'admin' });
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully!',
      data: {
        token,
        user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════
//  2. STAFF CREATION  →  POST /api/auth/register-staff
//     - Sirf Admin kar sakta hai (protect + adminOnly)
//     - Staff khud register NAHI kar sakta
//     - Admin /staff page se form fill karta hai
// ═══════════════════════════════════════════════════════
router.post('/register-staff', protect, adminOnly, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered',
      });
    }

    const staff = await User.create({ name, email, password, role: 'staff' });

    res.status(201).json({
      success: true,
      message: `Staff account created for ${staff.name}`,
      data: {
        user: {
          id: staff._id,
          name: staff.name,
          email: staff.email,
          role: staff.role,
          isActive: staff.isActive,
          createdAt: staff.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════
//  3. LOGIN  →  POST /api/auth/login
//     - Admin + Staff dono use karte hain
//     - Email + Password
// ═══════════════════════════════════════════════════════
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email, role: { $in: ['admin', 'staff'] } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Please contact the admin.',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════
//  4. CUSTOMER OTP - SEND  →  POST /api/auth/customer/send-otp
//     - Customer phone number deta hai
//     - Real SMS via Twilio
// ═══════════════════════════════════════════════════════
router.post('/customer/send-otp', async (req, res, next) => {
  try {
    const { phone, name } = req.body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Enter a valid 10-digit Indian mobile number',
      });
    }

    let customer = await User.findOne({ phone, role: 'customer' });

    // New customer - name required
    if (!customer) {
      if (!name || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'New user - please provide your name',
          isNewUser: true,
        });
      }
      customer = new User({ name: name.trim(), phone, role: 'customer' });
    }

    // Rate limit: 1 OTP per 60 seconds
    if (customer.otp && customer.otp.expiresAt) {
      const otpCreatedAt = new Date(customer.otp.expiresAt.getTime() - 10 * 60 * 1000);
      const secondsElapsed = (Date.now() - otpCreatedAt.getTime()) / 1000;
      if (secondsElapsed < 60) {
        const waitSeconds = Math.ceil(60 - secondsElapsed);
        return res.status(429).json({
          success: false,
          message: `Please wait ${waitSeconds} seconds before requesting another OTP`,
        });
      }
    }

    // Generate OTP and save
    const otp = customer.generateOTP();
    await customer.save();

    // Send real SMS via Twilio
    await sendOtpSms(phone, otp);

    res.json({
      success: true,
      message: `OTP sent to +91 ${phone}. Valid for 10 minutes.`,
    });
  } catch (error) {
    if (error.message && error.message.includes('SMS delivery failed')) {
      return res.status(500).json({
        success: false,
        message: 'Could not send SMS. Please check the number and try again.',
      });
    }
    next(error);
  }
});

// ═══════════════════════════════════════════════════════
//  5. CUSTOMER OTP - VERIFY  →  POST /api/auth/customer/verify-otp
// ═══════════════════════════════════════════════════════
router.post('/customer/verify-otp', async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
    }

    const customer = await User.findOne({ phone, role: 'customer' });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'No account found. Please register first.' });
    }

    if (!customer.verifyOTP(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Clear OTP after use
    customer.otp = undefined;
    await customer.save();

    const token = generateToken(customer._id);

    res.json({
      success: true,
      message: 'Login successful!',
      data: {
        token,
        user: {
          id: customer._id,
          name: customer.name,
          phone: customer.phone,
          role: customer.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════
//  6. GET ME  →  GET /api/auth/me
// ═══════════════════════════════════════════════════════
router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

// ═══════════════════════════════════════════════════════
//  7. GET ALL STAFF  →  GET /api/auth/staff   (admin only)
// ═══════════════════════════════════════════════════════
router.get('/staff', protect, adminOnly, async (req, res, next) => {
  try {
    const staff = await User.find({ role: 'staff' })
      .select('-password -otp')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { staff, total: staff.length },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════
//  8. TOGGLE STAFF  →  PATCH /api/auth/staff/:id/toggle  (admin only)
//     Activate / Deactivate
// ═══════════════════════════════════════════════════════
router.patch('/staff/:id/toggle', protect, adminOnly, async (req, res, next) => {
  try {
    const staff = await User.findOne({ _id: req.params.id, role: 'staff' });
    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff member not found' });
    }

    staff.isActive = !staff.isActive;
    await staff.save();

    res.json({
      success: true,
      message: `${staff.name} has been ${staff.isActive ? 'activated' : 'deactivated'}`,
      data: { isActive: staff.isActive },
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════
//  9. DELETE STAFF  →  DELETE /api/auth/staff/:id  (admin only)
// ═══════════════════════════════════════════════════════
router.delete('/staff/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const staff = await User.findOneAndDelete({ _id: req.params.id, role: 'staff' });
    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff member not found' });
    }
    res.json({ success: true, message: `${staff.name}'s account has been removed` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
