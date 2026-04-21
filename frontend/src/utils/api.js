

// import axios from 'axios';

// // Uses env variable — change in .env for production deployment
// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Attach JWT token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Handle 401 globally — redirect to appropriate login
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = user?.role === 'customer' ? '/customer-login' : '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // ─── Auth ────────────────────────────────────────────────
// export const authAPI = {
//   // Admin setup (1 time only, needs ADMIN_SECRET)
//   registerAdmin: (data) => api.post('/auth/register-admin', data),

//   // Staff creation — admin only, done from dashboard
//   registerStaff: (data) => api.post('/auth/register-staff', data),

//   // Login for admin + staff
//   login: (data) => api.post('/auth/login', data),

//   // Customer OTP flow
//   sendOtp: (data) => api.post('/auth/customer/send-otp', data),
//   verifyOtp: (data) => api.post('/auth/customer/verify-otp', data),

//   // Common
//   me: () => api.get('/auth/me'),

//   // Staff management (admin only)
//   getStaff: () => api.get('/auth/staff'),
//   createStaff: (data) => api.post('/auth/register-staff', data),
//   toggleStaff: (id) => api.patch(`/auth/staff/${id}/toggle`),
//   deleteStaff: (id) => api.delete(`/auth/staff/${id}`),
// };

// // ─── Orders ──────────────────────────────────────────────
// export const ordersAPI = {
//   getAll: (params) => api.get('/orders', { params }),
//   getById: (id) => api.get(`/orders/${id}`),
//   create: (data) => api.post('/orders', data),
//   updateStatus: (id, status, note) =>
//     api.patch(`/orders/${id}/status`, { status, note }),
//   delete: (id) => api.delete(`/orders/${id}`),
//   getDashboard: () => api.get('/orders/dashboard'),
//   getStaffDashboard: () => api.get('/orders/staff-dashboard'),
//   getMyOrders: () => api.get('/orders/my-orders'),
//   getGarmentPrices: () => api.get('/orders/garment-prices'),
// };

// export default api;







// import axios from 'axios';

// // ✅ FIXED: trim() removes accidental spaces from .env value
// const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim();

// const api = axios.create({
//   baseURL: `${BASE_URL}/api`,
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: false,
// });

// // Attach JWT token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // Handle 401 globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = user?.role === 'customer' ? '/customer-login' : '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // ─── Auth ────────────────────────────────────────────────
// export const authAPI = {
//   registerAdmin: (data) => api.post('/auth/register-admin', data),
//   registerStaff: (data) => api.post('/auth/register-staff', data),
//   login: (data) => api.post('/auth/login', data),
//   sendOtp: (data) => api.post('/auth/customer/send-otp', data),
//   verifyOtp: (data) => api.post('/auth/customer/verify-otp', data),
//   me: () => api.get('/auth/me'),
//   getStaff: () => api.get('/auth/staff'),
//   toggleStaff: (id) => api.patch(`/auth/staff/${id}/toggle`),
//   deleteStaff: (id) => api.delete(`/auth/staff/${id}`),
// };

// // ─── Orders ──────────────────────────────────────────────
// export const ordersAPI = {
//   getAll: (params) => api.get('/orders', { params }),
//   getById: (id) => api.get(`/orders/${id}`),
//   create: (data) => api.post('/orders', data),
//   updateStatus: (id, status, note) =>
//     api.patch(`/orders/${id}/status`, { status, note }),
//   delete: (id) => api.delete(`/orders/${id}`),
//   getDashboard: () => api.get('/orders/dashboard'),
//   getStaffDashboard: () => api.get('/orders/staff-dashboard'),
//   getMyOrders: () => api.get('/orders/my-orders'),
//   getGarmentPrices: () => api.get('/orders/garment-prices'),
// };

// export default api;




import axios from 'axios';

// trim() removes accidental spaces from .env value — this was causing the CORS bug
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim();

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = user?.role === 'customer' ? '/customer-login' : '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth APIs ───────────────────────────────────────────

export const authAPI = {
  // One-time admin setup (needs ADMIN_SECRET from .env)
  registerAdmin: (data) => api.post('/auth/register-admin', data),

  // Create staff — only callable by logged-in admin
  registerStaff: (data) => api.post('/auth/register-staff', data),

  // Login for admin + staff (email + password)
  login: (data) => api.post('/auth/login', data),

  // Customer OTP flow
  sendOtp: (data) => api.post('/auth/customer/send-otp', data),
  verifyOtp: (data) => api.post('/auth/customer/verify-otp', data),

  // Common
  me: () => api.get('/auth/me'),

  // Staff management (admin only)
  getStaff: () => api.get('/auth/staff'),
  toggleStaff: (id) => api.patch(`/auth/staff/${id}/toggle`),
  deleteStaff: (id) => api.delete(`/auth/staff/${id}`),
};

// ─── Orders APIs ─────────────────────────────────────────

export const ordersAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status, note) =>
    api.patch(`/orders/${id}/status`, { status, note }),
  delete: (id) => api.delete(`/orders/${id}`),
  getDashboard: () => api.get('/orders/dashboard'),
  getStaffDashboard: () => api.get('/orders/staff-dashboard'),
  getMyOrders: () => api.get('/orders/my-orders'),
  getGarmentPrices: () => api.get('/orders/garment-prices'),
};

export default api;
