import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, PlusCircle, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/orders/new', label: 'New Order', icon: PlusCircle },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gold-500/10 bg-charcoal-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
            <span className="text-charcoal-900 font-display font-black text-sm">C</span>
          </div>
          <span className="font-display font-bold text-lg text-cream-100 group-hover:text-gold-400 transition-colors">
            CleanPress
          </span>
        </Link>

        {/* Desktop nav */}
        {user && (
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  pathname === to
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Logged in as</p>
                  <p className="text-sm font-medium text-cream-100">{user.name}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400/30 to-gold-600/30 border border-gold-500/30 flex items-center justify-center">
                  <span className="text-gold-400 text-sm font-bold">
                    {user.name[0].toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-rose-500/10"
                >
                  <LogOut size={16} />
                </button>
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden text-gray-400 hover:text-gold-400 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm text-gray-400 hover:text-gold-400 transition-colors px-3 py-1.5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-primary text-xs px-4 py-2 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {user && menuOpen && (
        <div className="md:hidden border-t border-white/5 bg-charcoal-900/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === to
                  ? 'bg-gold-500/10 text-gold-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
