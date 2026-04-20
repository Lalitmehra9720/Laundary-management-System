// import { Link } from 'react-router-dom';
// import {
//   ArrowRight,
//   CheckCircle,
//   Zap,
//   Shield,
//   BarChart2,
//   Smartphone,
//   Star,
//   Clock,
//   IndianRupee,
//   Package,
// } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';

// // ─── Section 1: Hero ──────────────────────────────────
// const HeroSection = ({ isAuthenticated }) => (
//   <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//     {/* Background orbs */}
//     <div className="absolute inset-0 pointer-events-none">
//       <div
//         className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
//         style={{ background: 'radial-gradient(circle, #f0c040, transparent)' }}
//       />
//       <div
//         className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
//         style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
//       />
//       {/* Grid lines */}
//       <div
//         className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage:
//             'linear-gradient(rgba(240,192,64,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,64,0.3) 1px, transparent 1px)',
//           backgroundSize: '60px 60px',
//         }}
//       />
//     </div>

//     <div className="relative text-center max-w-4xl mx-auto px-6">
//       {/* Badge */}
//       <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-mono px-4 py-2 rounded-full mb-8 animate-fade-in">
//         <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
//         AI-First Laundry Management System
//       </div>

//       {/* Headline */}
//       <h1
//         className="font-display font-black mb-6 opacity-0 animate-fade-up"
//         style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.05, animationFillMode: 'forwards' }}
//       >
//         Manage Your{' '}
//         <span className="text-gold-gradient">Dry Cleaning</span>
//         <br />
//         Orders Effortlessly
//       </h1>

//       <p
//         className="font-body text-gray-400 text-lg max-w-xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2"
//         style={{ animationFillMode: 'forwards' }}
//       >
//         From order creation to delivery — track every garment, calculate bills instantly,
//         and keep customers happy with real-time status updates.
//       </p>

//       {/* CTAs */}
//       <div
//         className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3"
//         style={{ animationFillMode: 'forwards' }}
//       >
//         {isAuthenticated ? (
//           <>
//             <Link
//               to="/dashboard"
//               className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
//             >
//               Go to Dashboard <ArrowRight size={18} />
//             </Link>
//             <Link
//               to="/orders/new"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-all text-base font-medium"
//             >
//               New Order <Package size={18} />
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/register"
//               className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
//             >
//               Start Free <ArrowRight size={18} />
//             </Link>
//             <Link
//               to="/login"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all text-base"
//             >
//               Login to Dashboard
//             </Link>
//           </>
//         )}
//       </div>

//       {/* Floating stats */}
//       <div
//         className="mt-16 flex flex-wrap justify-center gap-6 opacity-0 animate-fade-up stagger-4"
//         style={{ animationFillMode: 'forwards' }}
//       >
//         {[
//           { label: 'Orders Managed', value: '10K+' },
//           { label: 'Happy Stores', value: '200+' },
//           { label: 'Garment Types', value: '12+' },
//         ].map((s) => (
//           <div key={s.label} className="text-center">
//             <p className="font-display font-bold text-2xl text-gold-gradient">{s.value}</p>
//             <p className="text-xs text-gray-600 mt-0.5">{s.label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// // ─── Section 2: Features ─────────────────────────────
// const FeaturesSection = () => {
//   const features = [
//     {
//       icon: Zap,
//       title: 'Instant Order Creation',
//       desc: 'Create a complete order with itemized billing in under 30 seconds. Auto-calculated totals, no math required.',
//       accent: 'gold',
//     },
//     {
//       icon: BarChart2,
//       title: 'Live Dashboard',
//       desc: 'Real-time revenue tracking, status breakdown charts, and top-garment analytics at a glance.',
//       accent: 'blue',
//     },
//     {
//       icon: Shield,
//       title: 'Secure Auth',
//       desc: 'JWT-based authentication with role support (Admin/Staff). Your data stays yours.',
//       accent: 'emerald',
//     },
//     {
//       icon: Smartphone,
//       title: 'Works Everywhere',
//       desc: 'Fully responsive design. Run it from the shop counter desktop or your phone.',
//       accent: 'violet',
//     },
//     {
//       icon: Clock,
//       title: 'Status Tracking',
//       desc: 'Four-stage workflow: Received → Processing → Ready → Delivered. Full history logged.',
//       accent: 'amber',
//     },
//     {
//       icon: IndianRupee,
//       title: 'Smart Billing',
//       desc: 'Pre-configured Indian garment prices. Instantly compute bills with quantity multipliers.',
//       accent: 'rose',
//     },
//   ];

//   const accentMap = {
//     gold: 'text-gold-400 bg-gold-400/10 border-gold-400/20',
//     blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
//     emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
//     violet: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
//     amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
//     rose: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
//   };

//   return (
//     <section className="py-24 px-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">
//             Everything You Need
//           </p>
//           <h2 className="font-display font-bold text-4xl text-cream-100">
//             Built for the Dry Cleaning Business
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {features.map((f, i) => (
//             <div
//               key={f.title}
//               className="glass-card p-6 hover:border-white/20 transition-all duration-300 group opacity-0 animate-fade-up"
//               style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
//             >
//               <div
//                 className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${accentMap[f.accent]}`}
//               >
//                 <f.icon size={20} />
//               </div>
//               <h3 className="font-display font-semibold text-base text-cream-100 mb-2">
//                 {f.title}
//               </h3>
//               <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── Section 3: How It Works ─────────────────────────
// const HowItWorksSection = () => {
//   const steps = [
//     {
//       num: '01',
//       title: 'Create an Order',
//       desc: 'Enter customer name, phone, and add garments. The system instantly calculates the total bill.',
//     },
//     {
//       num: '02',
//       title: 'Track Progress',
//       desc: 'Update order status as it moves through Received → Processing → Ready → Delivered.',
//     },
//     {
//       num: '03',
//       title: 'Monitor Revenue',
//       desc: 'View the dashboard for total revenue, order counts, and popular garment types.',
//     },
//   ];

//   return (
//     <section className="py-24 px-6 relative overflow-hidden">
//       <div
//         className="absolute inset-0 opacity-5 pointer-events-none"
//         style={{
//           background: 'radial-gradient(ellipse at 50% 50%, #f0c040, transparent 70%)',
//         }}
//       />
//       <div className="relative max-w-5xl mx-auto">
//         <div className="text-center mb-16">
//           <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">
//             Simple Workflow
//           </p>
//           <h2 className="font-display font-bold text-4xl text-cream-100">
//             How CleanPress Works
//           </h2>
//         </div>

//         <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Connecting line */}
//           <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

//           {steps.map((step, i) => (
//             <div key={step.num} className="flex flex-col items-center text-center gap-4">
//               <div className="relative w-20 h-20 rounded-2xl glass-card border border-gold-500/25 flex items-center justify-center gold-glow">
//                 <span className="font-display font-black text-2xl text-gold-gradient">
//                   {step.num}
//                 </span>
//               </div>
//               <h3 className="font-display font-semibold text-lg text-cream-100">
//                 {step.title}
//               </h3>
//               <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── Section 4: Garment Pricing ──────────────────────
// const PricingSection = () => {
//   const items = [
//     { name: 'Shirt', price: 50, emoji: '👔' },
//     { name: 'Pants', price: 70, emoji: '👖' },
//     { name: 'Saree', price: 150, emoji: '🥻' },
//     { name: 'Suit', price: 250, emoji: '🤵' },
//     { name: 'Jacket', price: 200, emoji: '🧥' },
//     { name: 'Kurta', price: 80, emoji: '👘' },
//     { name: 'Lehenga', price: 300, emoji: '💃' },
//     { name: 'Blanket', price: 200, emoji: '🛏️' },
//   ];

//   return (
//     <section className="py-24 px-6">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-16">
//           <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">
//             Transparent Pricing
//           </p>
//           <h2 className="font-display font-bold text-4xl text-cream-100">
//             Pre-configured Garment Rates
//           </h2>
//           <p className="text-gray-500 mt-3 text-sm">
//             All prices in INR. Configurable in the backend.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           {items.map((item, i) => (
//             <div
//               key={item.name}
//               className="glass-card p-5 text-center hover:border-gold-500/30 transition-all duration-200 hover:-translate-y-1 opacity-0 animate-fade-up"
//               style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}
//             >
//               <div className="text-3xl mb-2">{item.emoji}</div>
//               <p className="font-body text-sm text-gray-400 mb-1">{item.name}</p>
//               <p className="font-display font-bold text-xl text-gold-gradient">
//                 ₹{item.price}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── Section 5: CTA ──────────────────────────────────
// const CtaSection = ({ isAuthenticated }) => (
//   <section className="py-24 px-6">
//     <div className="max-w-3xl mx-auto text-center">
//       <div className="glass-card p-12 gold-glow relative overflow-hidden">
//         <div
//           className="absolute inset-0 opacity-5 pointer-events-none"
//           style={{
//             background: 'radial-gradient(ellipse at 50% 0%, #f0c040, transparent 60%)',
//           }}
//         />
//         <div className="relative">
//           <div className="flex justify-center gap-1 mb-6">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} size={18} className="text-gold-400 fill-gold-400" />
//             ))}
//           </div>
//           <h2 className="font-display font-bold text-4xl text-cream-100 mb-4">
//             Ready to Streamline Your Store?
//           </h2>
//           <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
//             Join the stores already using CleanPress to manage orders, track revenue, and delight
//             customers — all from one clean dashboard.
//           </p>
//           {isAuthenticated ? (
//             <Link
//               to="/dashboard"
//               className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
//             >
//               Open Dashboard <ArrowRight size={18} />
//             </Link>
//           ) : (
//             <Link
//               to="/register"
//               className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold"
//             >
//               Get Started Free <ArrowRight size={18} />
//             </Link>
//           )}
//           <p className="text-gray-700 text-xs mt-4">No credit card required</p>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // ─── Page ─────────────────────────────────────────────
// const HomePage = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <div className="overflow-x-hidden">
//       <HeroSection isAuthenticated={isAuthenticated} />
//       <FeaturesSection />
//       <HowItWorksSection />
//       <PricingSection />
//       <CtaSection isAuthenticated={isAuthenticated} />
//     </div>
//   );
// };

// export default HomePage;








import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Zap, Shield, BarChart2,
  Smartphone, Star, Clock, IndianRupee, Package,
  Phone, LayoutDashboard, LogOut, User,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// ── Logged-in user banner ─────────────────────────────
const LoggedInBanner = ({ user, logout, isAdmin, isStaff, isCustomer }) => {
  const roleConfig = {
    admin:    { label: 'Administrator', color: 'from-gold-400/20 to-gold-600/10', border: 'border-gold-400/25', text: 'text-gold-400', cta: '/dashboard', ctaLabel: 'Open Dashboard' },
    staff:    { label: 'Staff Member',  color: 'from-blue-400/15 to-blue-600/10', border: 'border-blue-400/25',  text: 'text-blue-400',  cta: '/dashboard', ctaLabel: 'Go to Dashboard' },
    customer: { label: 'Customer',      color: 'from-emerald-400/15 to-emerald-600/10', border: 'border-emerald-400/25', text: 'text-emerald-400', cta: '/my-orders', ctaLabel: 'Track My Orders' },
  };
  const cfg = roleConfig[user.role] || roleConfig.customer;

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 bg-gradient-to-r ${cfg.color} border-b ${cfg.border} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-sm">
          <div className={`w-5 h-5 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold ${cfg.text}`}
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            {user.name[0].toUpperCase()}
          </div>
          <span className="text-gray-400">
            Logged in as{' '}
            <span className={`font-semibold ${cfg.text}`}>{user.name}</span>
            <span className="text-gray-600 ml-1.5">({cfg.label})</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={cfg.cta}
            className={`text-xs font-medium ${cfg.text} hover:underline flex items-center gap-1`}
          >
            {cfg.ctaLabel} <ArrowRight size={12} />
          </Link>
          <button
            onClick={logout}
            className="text-xs text-gray-600 hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Hero Section ──────────────────────────────────────
const HeroSection = ({ isAuthenticated, user, isAdmin, isStaff, isCustomer }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* BG orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f0c040, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(240,192,64,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(240,192,64,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </div>

    <div className="relative text-center max-w-4xl mx-auto px-6">
      <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs font-mono px-4 py-2 rounded-full mb-8 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        AI-First Laundry Management System
      </div>

      <h1
        className="font-display font-black mb-6 opacity-0 animate-fade-up"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 1.05, animationFillMode: 'forwards' }}
      >
        Manage Your{' '}
        <span className="text-gold-gradient">Dry Cleaning</span>
        <br />Orders Effortlessly
      </h1>

      <p className="font-body text-gray-400 text-lg max-w-xl mx-auto mb-10 opacity-0 animate-fade-up stagger-2"
        style={{ animationFillMode: 'forwards' }}>
        From order creation to delivery — track every garment, calculate bills instantly,
        and keep customers happy with real-time status updates.
      </p>

      {/* ── Dynamic CTAs based on auth state ── */}
      <div className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-up stagger-3"
        style={{ animationFillMode: 'forwards' }}>

        {!isAuthenticated ? (
          // NOT LOGGED IN — show all 3 options
          <>
            <Link
              to="/customer-login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white transition-all font-semibold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              <Phone size={18} /> Track My Order
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 transition-all text-base font-medium"
            >
              Staff Login <ArrowRight size={18} />
            </Link>
          </>
        ) : isCustomer ? (
          // CUSTOMER logged in
          <>
            <Link to="/my-orders"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold">
              <Package size={18} /> My Orders
            </Link>
          </>
        ) : (
          // STAFF / ADMIN logged in
          <>
            <Link to="/dashboard"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/orders/new"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gold-400/30 text-gold-400 hover:bg-gold-400/10 transition-all text-base font-medium">
              New Order <ArrowRight size={18} />
            </Link>
          </>
        )}
      </div>

      {/* Role-specific welcome card when logged in */}
      {isAuthenticated && (
        <div className="mt-10 inline-flex items-center gap-3 glass-card px-5 py-3 opacity-0 animate-fade-up stagger-4"
          style={{ animationFillMode: 'forwards' }}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            isCustomer ? 'bg-emerald-400/20 text-emerald-400' : 'bg-gold-400/20 text-gold-400'
          }`}>
            {user.name[0].toUpperCase()}
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-600">Welcome back</p>
            <p className="text-sm font-medium text-cream-100">{user.name}
              <span className={`ml-2 text-xs font-mono px-1.5 py-0.5 rounded ${
                isCustomer ? 'text-emerald-400 bg-emerald-400/10' :
                user.role === 'admin' ? 'text-gold-400 bg-gold-400/10' : 'text-blue-400 bg-blue-400/10'
              }`}>{user.role}</span>
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-16 flex flex-wrap justify-center gap-6 opacity-0 animate-fade-up stagger-4"
        style={{ animationFillMode: 'forwards' }}>
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

// ── Features ──────────────────────────────────────────
const FeaturesSection = () => {
  const features = [
    { icon: Zap, title: 'Instant Order Creation', desc: 'Create a complete order with itemized billing in under 30 seconds. Auto-calculated totals, no math required.', accent: 'gold' },
    { icon: BarChart2, title: 'Live Dashboard', desc: 'Real-time revenue tracking, status breakdown charts, and top-garment analytics at a glance.', accent: 'blue' },
    { icon: Shield, title: 'Role-Based Access', desc: '3 roles: Admin (full access), Staff (operations), Customer (own orders only). Secure and organized.', accent: 'emerald' },
    { icon: Smartphone, title: 'Customer OTP Login', desc: 'Customers login with phone + real SMS OTP. No passwords to remember — just track your clothes.', accent: 'violet' },
    { icon: Clock, title: 'Status Tracking', desc: 'Four-stage workflow: Received → Processing → Ready → Delivered. Full history logged per order.', accent: 'amber' },
    { icon: IndianRupee, title: 'Smart Billing', desc: 'Pre-configured Indian garment prices. Instantly compute bills with live quantity multipliers.', accent: 'rose' },
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
          <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">Everything You Need</p>
          <h2 className="font-display font-bold text-4xl text-cream-100">Built for the Dry Cleaning Business</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={f.title}
              className="glass-card p-6 hover:border-white/20 transition-all duration-300 opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}>
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${accentMap[f.accent]}`}>
                <f.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-base text-cream-100 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── How It Works ──────────────────────────────────────
const HowItWorksSection = () => (
  <section className="py-24 px-6 relative overflow-hidden">
    <div className="absolute inset-0 opacity-5 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #f0c040, transparent 70%)' }} />
    <div className="relative max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">Simple Workflow</p>
        <h2 className="font-display font-bold text-4xl text-cream-100">How CleanPress Works</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { num: '01', title: 'Create an Order', desc: 'Staff enters customer name, phone, and garments. Bill is auto-calculated instantly.' },
          { num: '02', title: 'Track Progress', desc: 'Update status as clothes move through Received → Processing → Ready → Delivered.' },
          { num: '03', title: 'Customer Tracks Too', desc: 'Customer logs in with phone OTP and sees their order status in real-time.' },
        ].map((step) => (
          <div key={step.num} className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 rounded-2xl glass-card border border-gold-500/25 flex items-center justify-center gold-glow">
              <span className="font-display font-black text-2xl text-gold-gradient">{step.num}</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-cream-100">{step.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Role Cards ────────────────────────────────────────
const RolesSection = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">3 Types of Users</p>
        <h2 className="font-display font-bold text-4xl text-cream-100">The Right Access for Everyone</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            role: 'Admin', emoji: '👑', color: 'border-gold-400/25 bg-gold-400/5',
            badge: 'text-gold-400 bg-gold-400/10',
            perms: ['Full dashboard & revenue', 'Create & delete orders', 'Manage staff accounts', 'All analytics & charts'],
          },
          {
            role: 'Staff', emoji: '🧑‍💼', color: 'border-blue-400/25 bg-blue-400/5',
            badge: 'text-blue-400 bg-blue-400/10',
            perms: ['Create new orders', 'Update order status', 'View all orders', 'No revenue data'],
          },
          {
            role: 'Customer', emoji: '👤', color: 'border-emerald-400/25 bg-emerald-400/5',
            badge: 'text-emerald-400 bg-emerald-400/10',
            perms: ['OTP phone login', 'Track own orders only', 'See delivery dates', 'No staff features'],
          },
        ].map((r) => (
          <div key={r.role} className={`glass-card p-6 border ${r.color}`}>
            <div className="text-3xl mb-3">{r.emoji}</div>
            <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${r.badge}`}>{r.role}</span>
            <ul className="mt-4 space-y-2">
              {r.perms.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle size={13} className="text-gray-600 flex-shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pricing ───────────────────────────────────────────
const PricingSection = () => (
  <section className="py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-mono text-gold-400 text-xs tracking-widest uppercase mb-3">Transparent Pricing</p>
        <h2 className="font-display font-bold text-4xl text-cream-100">Pre-configured Garment Rates</h2>
        <p className="text-gray-500 mt-3 text-sm">All prices in INR · Configurable in backend</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { name: 'Shirt', price: 50, emoji: '👔' }, { name: 'Pants', price: 70, emoji: '👖' },
          { name: 'Saree', price: 150, emoji: '🥻' }, { name: 'Suit', price: 250, emoji: '🤵' },
          { name: 'Jacket', price: 200, emoji: '🧥' }, { name: 'Kurta', price: 80, emoji: '👘' },
          { name: 'Lehenga', price: 300, emoji: '💃' }, { name: 'Blanket', price: 200, emoji: '🛏️' },
        ].map((item, i) => (
          <div key={item.name}
            className="glass-card p-5 text-center hover:border-gold-500/30 transition-all duration-200 hover:-translate-y-1 opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'forwards' }}>
            <div className="text-3xl mb-2">{item.emoji}</div>
            <p className="font-body text-sm text-gray-400 mb-1">{item.name}</p>
            <p className="font-display font-bold text-xl text-gold-gradient">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────
const CtaSection = ({ isAuthenticated, isCustomer }) => (
  <section className="py-24 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <div className="glass-card p-12 gold-glow relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, #f0c040, transparent 60%)' }} />
        <div className="relative">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-gold-400 fill-gold-400" />)}
          </div>
          <h2 className="font-display font-bold text-4xl text-cream-100 mb-4">
            Ready to Streamline Your Store?
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            CleanPress manages your entire laundry workflow — from counter to customer.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {!isAuthenticated ? (
              <>
                <Link to="/customer-login"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all text-sm">
                  <Phone size={16} /> Track My Order
                </Link>
                <Link to="/login"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold">
                  Staff Login <ArrowRight size={16} />
                </Link>
              </>
            ) : isCustomer ? (
              <Link to="/my-orders"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold">
                My Orders <ArrowRight size={18} />
              </Link>
            ) : (
              <Link to="/dashboard"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold">
                Open Dashboard <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Page ──────────────────────────────────────────────
const HomePage = () => {
  const { isAuthenticated, user, logout, isAdmin, isStaff, isCustomer } = useAuth();

  return (
    <div className="overflow-x-hidden">
      {/* Logged-in user top banner */}
      {isAuthenticated && (
        <LoggedInBanner
          user={user}
          logout={logout}
          isAdmin={isAdmin}
          isStaff={isStaff}
          isCustomer={isCustomer}
        />
      )}

      <HeroSection
        isAuthenticated={isAuthenticated}
        user={user}
        isAdmin={isAdmin}
        isStaff={isStaff}
        isCustomer={isCustomer}
      />
      <FeaturesSection />
      <HowItWorksSection />
      <RolesSection />
      <PricingSection />
      <CtaSection isAuthenticated={isAuthenticated} isCustomer={isCustomer} />
    </div>
  );
};

export default HomePage;
