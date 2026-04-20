import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, KeyRound, ArrowRight, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const AdminSetupPage = () => {
  const { registerAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', adminSecret: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.includes('@')) errs.email = 'Valid email required';
    if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (!form.adminSecret.trim()) errs.adminSecret = 'Admin secret key is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await registerAdmin(form.name, form.email, form.password, form.adminSecret);
      toast.success('Admin account created! Welcome 🎉');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Setup failed';
      toast.error(msg);
      if (msg.includes('already exists')) {
        // Admin already set up — redirect to login
        setTimeout(() => navigate('/login'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-up" style={{ animationFillMode: 'forwards' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-xl mx-auto mb-4">
            <Shield size={24} className="text-charcoal-900" />
          </div>
          <h1 className="font-display font-bold text-3xl text-cream-100">Admin Setup</h1>
          <p className="text-gray-500 text-sm mt-1">One-time setup for store administrator</p>
        </div>

        {/* Warning box */}
        <div className="mb-6 bg-amber-400/8 border border-amber-400/25 rounded-2xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-300/80 space-y-1">
            <p className="font-medium text-amber-300">This page is for first-time setup only.</p>
            <p>Only 1 admin can exist in the system. After setup, this page will no longer work. Keep the Admin Secret safe — it's set in your backend <code className="font-mono bg-white/5 px-1 rounded">.env</code> file.</p>
          </div>
        </div>

        <div className="glass-card p-8 gold-glow">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="Store Owner Name"
              icon={User}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@yourstore.com"
              icon={Mail}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 6 characters"
              icon={Lock}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
            <div>
              <Input
                label="Admin Secret Key"
                type="password"
                placeholder="Secret key from backend .env"
                icon={KeyRound}
                value={form.adminSecret}
                onChange={(e) => setForm({ ...form, adminSecret: e.target.value })}
                error={errors.adminSecret}
              />
              <p className="text-xs text-gray-700 mt-1.5">
                This is the <code className="font-mono">ADMIN_SECRET</code> value from your backend <code className="font-mono">.env</code> file
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              icon={ArrowRight}
              className="w-full mt-2"
            >
              Create Admin Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-5">
            Admin already set up?{' '}
            <Link to="/login" className="text-gold-400 hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetupPage;
