// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Mail, Lock, ArrowRight } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { useAuth } from '../hooks/useAuth';
// import Input from '../components/common/Input';
// import Button from '../components/common/Button';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errs = {};
//     if (!form.email.includes('@')) errs.email = 'Enter a valid email';
//     if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       await login(form.email, form.password);
//       toast.success('Welcome back!');
//       navigate('/dashboard');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md animate-fade-up" style={{ animationFillMode: 'forwards' }}>
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-xl mx-auto mb-4">
//             <span className="text-charcoal-900 font-display font-black text-2xl">C</span>
//           </div>
//           <h1 className="font-display font-bold text-3xl text-cream-100">Welcome back</h1>
//           <p className="text-gray-500 text-sm mt-1">Login to your CleanPress account</p>
//         </div>

//         <div className="glass-card p-8 gold-glow">
//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             <Input
//               label="Email Address"
//               type="email"
//               placeholder="you@store.com"
//               icon={Mail}
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               error={errors.email}
//             />
//             <Input
//               label="Password"
//               type="password"
//               placeholder="Your password"
//               icon={Lock}
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               error={errors.password}
//             />

//             <Button
//               type="submit"
//               variant="primary"
//               size="lg"
//               loading={loading}
//               icon={ArrowRight}
//               className="w-full mt-2"
//             >
//               Login
//             </Button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-6">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-gold-400 hover:underline font-medium">
//               Register here
//             </Link>
//           </p>
//         </div>

//         {/* Demo creds hint */}
//         <div className="mt-4 text-center text-xs text-gray-700 bg-white/3 border border-white/5 rounded-xl px-4 py-3">
//           Register first to create your admin account
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;







import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.includes('@')) errs.email = 'Enter a valid email';
    if (form.password.length < 1) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
      if (msg.toLowerCase().includes('deactivated')) {
        setErrors({ email: 'Account deactivated. Contact your admin.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-up" style={{ animationFillMode: 'forwards' }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-xl mx-auto mb-4">
            <span className="text-charcoal-900 font-display font-black text-2xl">C</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-cream-100">Staff Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            CleanPress admin & staff portal
          </p>
        </div>

        <div className="glass-card p-8 gold-glow">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@cleanpress.com"
              icon={Mail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              icon={Lock}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              icon={ArrowRight}
              className="w-full mt-1"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-gray-700 text-xs">not staff?</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Customer login */}
          <Link
            to="/customer-login"
            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-emerald-400/25 text-emerald-400 hover:bg-emerald-400/8 transition-all text-sm font-medium"
          >
            <Phone size={15} />
            Track My Order (Customer Login)
          </Link>
        </div>

        {/* Admin setup hint */}
        <p className="text-center text-xs text-gray-700 mt-4">
          First time setting up?{' '}
          <Link to="/admin-setup" className="text-gold-400/60 hover:text-gold-400 transition-colors">
            Admin Setup →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
