// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { protect } = require('../middleware/auth');

// const router = express.Router();

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// // POST /api/auth/register
// router.post('/register', async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: 'Email already registered' });
//     }

//     const user = await User.create({ name, email, password, role });
//     const token = generateToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: 'Account created successfully',
//       data: {
//         token,
//         user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // POST /api/auth/login
// router.post('/login', async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: 'Email and password are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ success: false, message: 'Invalid email or password' });
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

// // GET /api/auth/me
// router.get('/me', protect, async (req, res) => {
//   res.json({
//     success: true,
//     data: { user: req.user },
//   });
// });

// module.exports = router;










// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { protect, adminOnly } = require('../middleware/auth');

// const router = express.Router();

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// // ════════════════════════════════════════════
// //  ADMIN / STAFF AUTH
// // ════════════════════════════════════════════

// // POST /api/auth/register  — register admin or staff
// // First user becomes admin automatically
// router.post('/register', async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ success: false, message: 'Name, email and password required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: 'Email already registered' });
//     }

//     // First ever user in DB becomes admin automatically
//     const userCount = await User.countDocuments({ role: { $in: ['admin', 'staff'] } });
//     const assignedRole = userCount === 0 ? 'admin' : (role === 'staff' ? 'staff' : 'staff');

//     const user = await User.create({ name, email, password, role: assignedRole });
//     const token = generateToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: `Account created as ${assignedRole}`,
//       data: {
//         token,
//         user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // POST /api/auth/login  — email + password login (admin/staff)
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

// // ════════════════════════════════════════════
// //  CUSTOMER AUTH (OTP based)
// // ════════════════════════════════════════════

// // POST /api/auth/customer/send-otp
// // Customer enters phone → OTP generated → (in prod: sent via SMS/WhatsApp)
// router.post('/customer/send-otp', async (req, res, next) => {
//   try {
//     const { phone, name } = req.body;

//     if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
//       return res.status(400).json({ success: false, message: 'Valid 10-digit phone required' });
//     }

//     // Find or create customer account
//     let customer = await User.findOne({ phone, role: 'customer' });
//     if (!customer) {
//       if (!name) {
//         return res.status(400).json({
//           success: false,
//           message: 'New customer — please provide your name',
//           isNewUser: true,
//         });
//       }
//       customer = await User.create({ name, phone, role: 'customer' });
//     }

//     // Generate OTP
//     const otp = customer.generateOTP();
//     await customer.save();

//     // In production: send via SMS (Twilio/MSG91) or WhatsApp
//     // For now we return it in response (DEVELOPMENT ONLY)
//     console.log(`📱 OTP for ${phone}: ${otp}`);

//     res.json({
//       success: true,
//       message: `OTP sent to ${phone}`,
//       isNewUser: false,
//       // REMOVE THIS IN PRODUCTION — only for dev/testing
//       ...(process.env.NODE_ENV === 'development' && { devOtp: otp }),
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // POST /api/auth/customer/verify-otp
// router.post('/customer/verify-otp', async (req, res, next) => {
//   try {
//     const { phone, otp } = req.body;

//     if (!phone || !otp) {
//       return res.status(400).json({ success: false, message: 'Phone and OTP required' });
//     }

//     const customer = await User.findOne({ phone, role: 'customer' });
//     if (!customer) {
//       return res.status(404).json({ success: false, message: 'Customer not found' });
//     }

//     if (!customer.verifyOTP(otp)) {
//       return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
//     }

//     // Clear OTP after successful verify
//     customer.otp = undefined;
//     await customer.save();

//     const token = generateToken(customer._id);

//     res.json({
//       success: true,
//       message: 'Login successful',
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

// // ════════════════════════════════════════════
// //  COMMON
// // ════════════════════════════════════════════

// // GET /api/auth/me
// router.get('/me', protect, async (req, res) => {
//   res.json({ success: true, data: { user: req.user } });
// });

// // GET /api/auth/staff  — list all staff (admin only)
// router.get('/staff', protect, adminOnly, async (req, res, next) => {
//   try {
//     const staff = await User.find({ role: 'staff' }).select('-password -otp');
//     res.json({ success: true, data: { staff } });
//   } catch (error) {
//     next(error);
//   }
// });

// // PATCH /api/auth/staff/:id/toggle  — activate/deactivate staff (admin only)
// router.patch('/staff/:id/toggle', protect, adminOnly, async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user || user.role === 'admin') {
//       return res.status(404).json({ success: false, message: 'Staff not found' });
//     }
//     user.isActive = !user.isActive;
//     await user.save();
//     res.json({
//       success: true,
//       message: `Staff ${user.isActive ? 'activated' : 'deactivated'}`,
//       data: { isActive: user.isActive },
//     });
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

// ════════════════════════════════════════════════════════
//  ADMIN REGISTRATION
//  - Only 1 admin allowed in entire system
//  - Requires ADMIN_SECRET from .env (like a secret passcode)
//  - If admin already exists → reject
// ════════════════════════════════════════════════════════
router.post('/register-admin', async (req, res, next) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    // 1. Verify admin secret
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Invalid admin secret. Contact system owner.',
      });
    }

    // 2. Check if admin already exists — only 1 allowed
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'An admin account already exists. Only 1 admin is allowed.',
      });
    }

    // 3. Check duplicate email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // 4. Create admin
    const admin = await User.create({ name, email, password, role: 'admin' });
    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: '✅ Admin account created successfully',
      data: {
        token,
        user: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ════════════════════════════════════════════════════════
//  STAFF REGISTRATION
//  - Only admin can create staff accounts
//  - Staff CANNOT self-register
// ════════════════════════════════════════════════════════
router.post('/register-staff', protect, adminOnly, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password required' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const staff = await User.create({ name, email, password, role: 'staff' });

    res.status(201).json({
      success: true,
      message: `Staff account created for ${name}`,
      data: {
        user: { id: staff._id, name: staff.name, email: staff.email, role: staff.role },
      },
    });
  } catch (error) {
    next(error);
  }
});

// ════════════════════════════════════════════════════════
//  STAFF / ADMIN LOGIN (email + password)
// ════════════════════════════════════════════════════════
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = await User.findOne({ email, role: { $in: ['admin', 'staff'] } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated. Contact admin.' });
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

// ════════════════════════════════════════════════════════
//  CUSTOMER OTP LOGIN
//  Step 1: Send OTP via real Twilio SMS
// ════════════════════════════════════════════════════════
router.post('/customer/send-otp', async (req, res, next) => {
  try {
    const { phone, name } = req.body;

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Enter a valid 10-digit Indian mobile number' });
    }

    // Find or create customer
    let customer = await User.findOne({ phone, role: 'customer' });

    if (!customer) {
      // New customer — name required
      if (!name || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'New user — please provide your name to register',
          isNewUser: true,
        });
      }
      customer = new User({ name: name.trim(), phone, role: 'customer' });
    }

    // Rate limiting — prevent OTP spam (max 1 OTP per 60 seconds)
    if (customer.otp?.expiresAt) {
      const secondsSinceLast = (new Date() - new Date(customer.otp.expiresAt - 10 * 60 * 1000)) / 1000;
      if (secondsSinceLast < 60) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${Math.ceil(60 - secondsSinceLast)} seconds before requesting another OTP`,
        });
      }
    }

    // Generate OTP and save
    const otp = customer.generateOTP();
    await customer.save();

    // ── SEND REAL SMS via Twilio ──
    await sendOtpSms(phone, otp);

    res.json({
      success: true,
      message: `OTP sent to +91 ${phone}. Valid for 10 minutes.`,
      isNewUser: !customer._id,
    });

  } catch (error) {
    // Twilio errors
    if (error.message?.includes('SMS delivery failed')) {
      return res.status(500).json({
        success: false,
        message: 'Could not send SMS. Check your phone number and try again.',
      });
    }
    next(error);
  }
});

// ════════════════════════════════════════════════════════
//  CUSTOMER OTP LOGIN
//  Step 2: Verify OTP → issue JWT
// ════════════════════════════════════════════════════════
router.post('/customer/verify-otp', async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
    }

    const customer = await User.findOne({ phone, role: 'customer' });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'No account found for this number. Please register first.' });
    }

    if (!customer.verifyOTP(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP. Please request a new one.' });
    }

    // Clear OTP after successful verification
    customer.otp = undefined;
    await customer.save();

    const token = generateToken(customer._id);

    res.json({
      success: true,
      message: 'Verified! Welcome to CleanPress.',
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

// ════════════════════════════════════════════════════════
//  COMMON ROUTES
// ════════════════════════════════════════════════════════

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: { user: req.user } });
});

// GET /api/auth/staff — list all staff (admin only)
router.get('/staff', protect, adminOnly, async (req, res, next) => {
  try {
    const staff = await User.find({ role: 'staff' }).select('-password -otp').sort({ createdAt: -1 });
    res.json({ success: true, data: { staff } });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/auth/staff/:id/toggle — activate/deactivate (admin only)
router.patch('/staff/:id/toggle', protect, adminOnly, async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'staff' });
    if (!user) return res.status(404).json({ success: false, message: 'Staff member not found' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `${user.name} has been ${user.isActive ? 'activated' : 'deactivated'}`,
      data: { isActive: user.isActive },
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/auth/staff/:id — remove staff (admin only)
router.delete('/staff/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id, role: 'staff' });
    if (!user) return res.status(404).json({ success: false, message: 'Staff member not found' });
    res.json({ success: true, message: `${user.name}'s account removed` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
