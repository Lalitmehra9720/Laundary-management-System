// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Phone, Hash, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useAuth } from '../hooks/useAuth';
// import Input from '../components/common/Input';
// import Button from '../components/common/Button';

// const STEPS = { PHONE: 'phone', OTP: 'otp' };

// const CustomerLoginPage = () => {
//   const { sendOtp, verifyOtp } = useAuth();
//   const navigate = useNavigate();

//   const [step, setStep] = useState(STEPS.PHONE);
//   const [phone, setPhone] = useState('');
//   const [name, setName] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isNewUser, setIsNewUser] = useState(false);
//   const [devOtp, setDevOtp] = useState(''); // only in development
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!/^[6-9]\d{9}$/.test(phone)) {
//       setError('Enter a valid 10-digit Indian phone number');
//       return;
//     }
//     if (isNewUser && !name.trim()) {
//       setError('Please enter your name');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await sendOtp(phone, name || undefined);

//       // Dev mode: show OTP in UI
//       if (res.devOtp) {
//         setDevOtp(res.devOtp);
//         toast.success(`Dev OTP: ${res.devOtp}`, { duration: 10000 });
//       } else {
//         toast.success(`OTP sent to ${phone}`);
//       }

//       if (res.isNewUser) {
//         setIsNewUser(true);
//         toast('New user detected — please enter your name', { icon: '👋' });
//       } else {
//         setStep(STEPS.OTP);
//       }
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Failed to send OTP';
//       // Backend says new user needs name
//       if (err.response?.data?.isNewUser) {
//         setIsNewUser(true);
//         setError('Please enter your name to register');
//       } else {
//         setError(msg);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (otp.length !== 6) {
//       setError('Enter the 6-digit OTP');
//       return;
//     }
//     setLoading(true);
//     try {
//       await verifyOtp(phone, otp);
//       toast.success('Welcome! Tracking your orders 🎉');
//       navigate('/my-orders');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Invalid OTP. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md animate-fade-up" style={{ animationFillMode: 'forwards' }}>
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl mx-auto mb-4">
//             <Phone size={24} className="text-white" />
//           </div>
//           <h1 className="font-display font-bold text-3xl text-cream-100">
//             Track Your Orders
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Login with your phone number — no password needed
//           </p>
//         </div>

//         <div className="glass-card p-8" style={{ boxShadow: '0 0 30px rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>

//           {/* Step 1 — Phone number */}
//           {step === STEPS.PHONE && (
//             <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
//               <Input
//                 label="Phone Number"
//                 type="tel"
//                 placeholder="9876543210"
//                 icon={Phone}
//                 value={phone}
//                 maxLength={10}
//                 onChange={(e) => {
//                   setPhone(e.target.value.replace(/\D/g, ''));
//                   setError('');
//                 }}
//               />

//               {/* Name field — shows for new users */}
//               {isNewUser && (
//                 <div className="animate-fade-up" style={{ animationFillMode: 'forwards' }}>
//                   <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-3 mb-3 text-xs text-emerald-400 flex items-center gap-2">
//                     👋 You're new here! Tell us your name to get started.
//                   </div>
//                   <Input
//                     label="Your Name"
//                     placeholder="e.g. Rahul Sharma"
//                     value={name}
//                     onChange={(e) => { setName(e.target.value); setError(''); }}
//                   />
//                 </div>
//               )}

//               {error && <p className="text-rose-400 text-sm">{error}</p>}

//               <Button
//                 type="submit"
//                 size="lg"
//                 loading={loading}
//                 className="w-full btn-primary"
//                 icon={ArrowRight}
//               >
//                 {isNewUser ? 'Register & Send OTP' : 'Send OTP'}
//               </Button>
//             </form>
//           )}

//           {/* Step 2 — OTP entry */}
//           {step === STEPS.OTP && (
//             <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
//               <div className="text-center mb-2">
//                 <div className="w-10 h-10 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-3">
//                   <CheckCircle size={20} className="text-emerald-400" />
//                 </div>
//                 <p className="text-sm text-gray-400">
//                   OTP sent to{' '}
//                   <span className="text-emerald-400 font-mono font-medium">+91 {phone}</span>
//                 </p>
//               </div>

//               {/* Dev OTP hint */}
//               {devOtp && (
//                 <div className="bg-amber-400/10 border border-amber-400/30 rounded-xl p-3 text-center">
//                   <p className="text-xs text-amber-400 mb-1 font-mono uppercase tracking-wide">Dev Mode OTP</p>
//                   <p className="font-mono font-bold text-2xl text-amber-300 tracking-widest">{devOtp}</p>
//                 </div>
//               )}

//               <Input
//                 label="Enter 6-digit OTP"
//                 type="text"
//                 placeholder="_ _ _ _ _ _"
//                 icon={Hash}
//                 value={otp}
//                 maxLength={6}
//                 onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
//                 className="text-center tracking-widest text-lg font-mono"
//               />

//               {error && <p className="text-rose-400 text-sm text-center">{error}</p>}

//               <Button
//                 type="submit"
//                 size="lg"
//                 loading={loading}
//                 className="w-full btn-primary"
//                 icon={ArrowRight}
//               >
//                 Verify & Login
//               </Button>

//               <button
//                 type="button"
//                 onClick={() => { setStep(STEPS.PHONE); setOtp(''); setError(''); setDevOtp(''); }}
//                 className="flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-gray-400 transition-colors mx-auto"
//               >
//                 <RotateCcw size={13} /> Change number
//               </button>
//             </form>
//           )}

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-6">
//             <div className="flex-1 h-px bg-white/5" />
//             <span className="text-gray-700 text-xs">or</span>
//             <div className="flex-1 h-px bg-white/5" />
//           </div>

//           <p className="text-center text-sm text-gray-600">
//             Are you a staff member?{' '}
//             <Link to="/login" className="text-gold-400 hover:underline font-medium">
//               Staff Login →
//             </Link>
//           </p>
//         </div>

//         {/* Info box */}
//         <div className="mt-4 glass-card p-4 text-xs text-gray-600 space-y-1">
//           <p>📱 You'll see only your own orders</p>
//           <p>🔔 We'll notify you when your clothes are ready</p>
//           <p>🔒 No password needed — OTP is safer</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerLoginPage;





import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Hash, ArrowRight, RotateCcw, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const STEPS = { PHONE: 'phone', NAME: 'name', OTP: 'otp' };

const CustomerLoginPage = () => {
  const { sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(STEPS.PHONE);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState('');

  // Countdown timer for resend button
  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    setError('');

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    if (step === STEPS.NAME && !name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    try {
      await sendOtp(phone, name || undefined);
      toast.success(`OTP sent to +91 ${phone}`, {
        icon: '📱',
        duration: 4000,
      });
      setStep(STEPS.OTP);
      startResendTimer();
    } catch (err) {
      const res = err.response?.data;
      if (res?.isNewUser) {
        // New user — need name
        setStep(STEPS.NAME);
      } else if (err.response?.status === 429) {
        setError(res?.message || 'Too many requests. Wait a moment.');
      } else {
        setError(res?.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP sent to your phone');
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(phone, otp);
      toast.success('Welcome to CleanPress! 🎉');
      navigate('/my-orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect OTP. Try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep(STEPS.PHONE);
    setOtp('');
    setError('');
    setName('');
    setResendTimer(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up" style={{ animationFillMode: 'forwards' }}>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl mx-auto mb-4">
            <Phone size={24} className="text-white" />
          </div>
          <h1 className="font-display font-bold text-3xl text-cream-100">Track Your Order</h1>
          <p className="text-gray-500 text-sm mt-1">
            Login with your phone — we'll send you an OTP
          </p>
        </div>

        <div
          className="glass-card p-8"
          style={{ border: '1px solid rgba(52,211,153,0.2)', boxShadow: '0 0 30px rgba(16,185,129,0.06)' }}
        >
          {/* ── Step 1: Phone number ── */}
          {step === STEPS.PHONE && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 font-body block mb-1.5">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  {/* Country code badge */}
                  <div className="input-dark rounded-xl px-3 flex items-center text-sm text-gray-400 font-mono flex-shrink-0">
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setError(''); }}
                    className="flex-1 input-dark rounded-xl px-4 py-2.5 font-body text-sm font-mono tracking-wider"
                    autoFocus
                  />
                </div>
              </div>
              {error && <p className="text-rose-400 text-sm">{error}</p>}
              <Button type="submit" size="lg" loading={loading} icon={ArrowRight} className="w-full btn-primary">
                Send OTP
              </Button>
            </form>
          )}

          {/* ── Step 1b: Name (new users only) ── */}
          {step === STEPS.NAME && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div className="bg-emerald-400/8 border border-emerald-400/20 rounded-xl p-3 text-sm text-emerald-300 flex items-center gap-2">
                👋 Welcome! You're new here. Tell us your name to get started.
              </div>
              <Input
                label="Your Name"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                autoFocus
              />
              {error && <p className="text-rose-400 text-sm">{error}</p>}
              <div className="flex gap-2">
                <Button type="button" variant="ghost" size="lg" onClick={resetFlow} className="flex-1">
                  Back
                </Button>
                <Button type="submit" size="lg" loading={loading} icon={ArrowRight} className="flex-1 btn-primary">
                  Send OTP
                </Button>
              </div>
            </form>
          )}

          {/* ── Step 2: OTP entry ── */}
          {step === STEPS.OTP && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              {/* SMS sent confirmation */}
              <div className="text-center py-2">
                <div className="text-3xl mb-2">📱</div>
                <p className="text-sm text-gray-400">
                  OTP sent to{' '}
                  <span className="text-emerald-400 font-mono font-semibold">+91 {phone}</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Check your SMS inbox. Valid for 10 minutes.
                </p>
              </div>

              {/* OTP input — big and clear */}
              <div>
                <label className="text-sm font-medium text-gray-300 font-body block mb-1.5">
                  Enter 6-digit OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                  className="w-full input-dark rounded-xl px-4 py-4 text-center text-2xl font-mono tracking-[0.5em] font-bold"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-rose-400 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                loading={loading}
                className="w-full btn-primary"
              >
                Verify OTP
              </Button>

              {/* Resend + change number */}
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <RotateCcw size={13} /> Change number
                </button>

                {resendTimer > 0 ? (
                  <span className="text-gray-600 font-mono">
                    Resend in {resendTimer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={loading}
                    className="text-emerald-400 hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 mt-6 mb-5">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-gray-700 text-xs">store staff?</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <Link
            to="/login"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gold-400/20 text-gold-400 hover:bg-gold-400/8 transition-all text-sm font-medium"
          >
            Staff / Admin Login →
          </Link>
        </div>

        {/* Info */}
        <div className="mt-4 glass-card p-4 text-xs text-gray-600 space-y-1.5">
          <p>📦 See all your orders and their current status</p>
          <p>🔔 Know when your clothes are ready for pickup</p>
          <p>🔒 OTP login — no password to remember</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
