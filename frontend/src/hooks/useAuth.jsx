
import { createContext, useContext, useState, useCallback } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const _saveSession = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // ── Admin first-time setup ─────────────────────────
  const registerAdmin = useCallback(async (name, email, password, adminSecret) => {
    const res = await authAPI.registerAdmin({ name, email, password, adminSecret });
    const { token, user: userData } = res.data.data;
    _saveSession(token, userData);
    return userData;
  }, []);

  // ── Staff/Admin email login ────────────────────────
  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    const { token, user: userData } = res.data.data;
    _saveSession(token, userData);
    return userData;
  }, []);

  // ── Customer OTP: send ─────────────────────────────
  const sendOtp = useCallback(async (phone, name) => {
    const res = await authAPI.sendOtp({ phone, name });
    return res.data;
  }, []);

  // ── Customer OTP: verify ───────────────────────────
  const verifyOtp = useCallback(async (phone, otp) => {
    const res = await authAPI.verifyOtp({ phone, otp });
    const { token, user: userData } = res.data.data;
    _saveSession(token, userData);
    return userData;
  }, []);

  // ── Logout ─────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff';
  const isCustomer = user?.role === 'customer';
  const isStaffOrAdmin = isAdmin || isStaff;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        registerAdmin,
        sendOtp,
        verifyOtp,
        logout,
        isAuthenticated: !!user,
        isAdmin,
        isStaff,
        isCustomer,
        isStaffOrAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
