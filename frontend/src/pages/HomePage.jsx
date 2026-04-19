import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  BarChart2,
  Smartphone,
  Star,
  Clock,
  IndianRupee,
  Package,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// ─── Section 1: Hero ──────────────────────────────────
const HeroSection = ({ isAuthenticated }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f0c040, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(240,192,64,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,64,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>

    <div className="relative text-center max-w-4xl mx-auto px-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-mono px-4 py-2 rounded-full mb-8 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        AI-First Laundry Management System
      </div>

      {/* Headline */}
      <h1
        className="font-display font-black mb-6 opacity-0 animate-fade-up"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.05, animationFillMode: 'forwards' }}
      >
        Manage Your{' '}
        <span className="text-gold-gradient">Dry Cleaning</span>
        <br />
        Orders Effortlessly
      </h1>

      <p
        className="font-body text-gray-400 text-lg max-w-xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2"
        style={{ animationFillMode: 'forwards' }}
      >
        From order creation to delivery — track every garment, calculate bills instantly,
        and keep customers happy with real-time status updates.
      </p>

      {/* CTAs */}
      <div
        className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3"
        style={{ animationFillMode: 'forwards' }}
      >
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
            >
              Go to Dashboard <ArrowRight size={18} />
            </Link>
            <Link
              to="/orders/new"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-all text-base font-medium"
            >
              New Order <Package size={18} />
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
            >
              Start Free <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-base"
            >
              Login to Dashboard
            </Link>
          </>
        )}
      </div>

      {/* Floating stats */}
      <div
        className="mt-16 flex flex-wrap justify-center gap-6 opacity-0 animate-fade-up stagger-4"
        style={{ animationFillMode: 'forwards' }}
      >
        {[
          { label: 'Orders Managed', value: '10K+' },
          { label: 'Happy Stores', value: '200+' },
          { label: 'Garment Types', value: '12+' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display font-bold text-2xl text-gold-gradient">{s.value}</p>
            <p className="text-xs text-gray-600 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Section 2: Features ─────────────────────────────
const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Order Creation',
      desc: 'Create a complete order with itemized billing in under 30 seconds. Auto-calculated totals, no math required.',
      accent: 'gold',
    },
    {
      icon: BarChart2,
      title: 'Live Dashboard',
      desc: 'Real-time revenue tracking, status breakdown charts, and top-garment analytics at a glance.',
      accent: 'blue',
    },
    {
      icon: Shield,
      title: 'Secure Auth',
      desc: 'JWT-based authentication with role support (Admin/Staff). Your data stays yours.',
      accent: 'emerald',
    },
    {
      icon: Smartphone,
      title: 'Works Everywhere',
      desc: 'Fully responsive design. Run it from the shop counter desktop or your phone.',
      accent: 'violet',
    },
    {
      icon: Clock,
      title: 'Status Tracking',
      desc: 'Four-stage workflow: Received → Processing → Ready → Delivered. Full history logged.',
      accent: 'amber',
    },
    {
      icon: IndianRupee,
      title: 'Smart Billing',
      desc: 'Pre-configured Indian garment prices. Instantly compute bills with quantity multipliers.',
      accent: 'rose',
    },
  ];

  const accentMap = {
    gold: 'text-gold-400 bg-gold-400/10 border-gold-400/20',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    rose: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">
            Everything You Need
          </p>
          <h2 className="font-display font-bold text-4xl text-cream-100">
            Built for the Dry Cleaning Business
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card p-6 hover:border-white/20 transition-all duration-300 group opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
            >
              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${accentMap[f.accent]}`}
              >
                <f.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-base text-cream-100 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 3: How It Works ─────────────────────────
const HowItWorksSection = () => {
  const steps = [
    {
      num: '01',
      title: 'Create an Order',
      desc: 'Enter customer name, phone, and add garments. The system instantly calculates the total bill.',
    },
    {
      num: '02',
      title: 'Track Progress',
      desc: 'Update order status as it moves through Received → Processing → Ready → Delivered.',
    },
    {
      num: '03',
      title: 'Monitor Revenue',
      desc: 'View the dashboard for total revenue, order counts, and popular garment types.',
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #f0c040, transparent 70%)',
        }}
      />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">
            Simple Workflow
          </p>
          <h2 className="font-display font-bold text-4xl text-cream-100">
            How CleanPress Works
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center text-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl glass-card border border-gold-500/25 flex items-center justify-center gold-glow">
                <span className="font-display font-black text-2xl text-gold-gradient">
                  {step.num}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-cream-100">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 4: Garment Pricing ──────────────────────
const PricingSection = () => {
  const items = [
    { name: 'Shirt', price: 50, emoji: '👔' },
    { name: 'Pants', price: 70, emoji: '👖' },
    { name: 'Saree', price: 150, emoji: '🥻' },
    { name: 'Suit', price: 250, emoji: '🤵' },
    { name: 'Jacket', price: 200, emoji: '🧥' },
    { name: 'Kurta', price: 80, emoji: '👘' },
    { name: 'Lehenga', price: 300, emoji: '💃' },
    { name: 'Blanket', price: 200, emoji: '🛏️' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">
            Transparent Pricing
          </p>
          <h2 className="font-display font-bold text-4xl text-cream-100">
            Pre-configured Garment Rates
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            All prices in INR. Configurable in the backend.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={item.name}
              className="glass-card p-5 text-center hover:border-gold-500/30 transition-all duration-200 hover:-translate-y-1 opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <p className="font-body text-sm text-gray-400 mb-1">{item.name}</p>
              <p className="font-display font-bold text-xl text-gold-gradient">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Section 5: CTA ──────────────────────────────────
const CtaSection = ({ isAuthenticated }) => (
  <section className="py-24 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <div className="glass-card p-12 gold-glow relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, #f0c040, transparent 60%)',
          }}
        />
        <div className="relative">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-gold-400 fill-gold-400" />
            ))}
          </div>
          <h2 className="font-display font-bold text-4xl text-cream-100 mb-4">
            Ready to Streamline Your Store?
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Join the stores already using CleanPress to manage orders, track revenue, and delight
            customers — all from one clean dashboard.
          </p>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
            >
              Open Dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <Link
              to="/register"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
          )}
          <p className="text-gray-700 text-xs mt-4">No credit card required</p>
        </div>
      </div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────
const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="overflow-x-hidden">
      <HeroSection isAuthenticated={isAuthenticated} />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CtaSection isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default HomePage;
