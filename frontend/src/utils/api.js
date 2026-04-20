// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api',
//   headers: { 'Content-Type': 'application/json' },
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
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // ─── Auth ───────────────────────────────────────────
// export const authAPI = {
//   login: (data) => api.post('/auth/login', data),
//   register: (data) => api.post('/auth/register', data),
//   me: () => api.get('/auth/me'),
// };

// // ─── Orders ─────────────────────────────────────────
// export const ordersAPI = {
//   getAll: (params) => api.get('/orders', { params }),
//   getById: (id) => api.get(`/orders/${id}`),
//   create: (data) => api.post('/orders', data),
//   updateStatus: (id, status, note) =>
//     api.patch(`/orders/${id}/status`, { status, note }),
//   delete: (id) => api.delete(`/orders/${id}`),
//   getDashboard: () => api.get('/orders/dashboard'),
//   getGarmentPrices: () => api.get('/orders/garment-prices'),
// };

// export default api;






// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api',
//   headers: { 'Content-Type': 'application/json' },
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
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // ─── Auth ───────────────────────────────────────────
// export const authAPI = {
//   // Staff / Admin
//   login: (data) => api.post('/auth/login', data),
//   register: (data) => api.post('/auth/register', data),
//   me: () => api.get('/auth/me'),

//   // Customer OTP
//   sendOtp: (data) => api.post('/auth/customer/send-otp', data),
//   verifyOtp: (data) => api.post('/auth/customer/verify-otp', data),

//   // Staff management (admin only)
//   getStaff: () => api.get('/auth/staff'),
//   toggleStaff: (id) => api.patch(`/auth/staff/${id}/toggle`),
// };

// // ─── Orders ─────────────────────────────────────────
// export const ordersAPI = {
//   getAll: (params) => api.get('/orders', { params }),
//   getById: (id) => api.get(`/orders/${id}`),
//   create: (data) => api.post('/orders', data),
//   updateStatus: (id, status, note) =>
//     api.patch(`/orders/${id}/status`, { status, note }),
//   delete: (id) => api.delete(`/orders/${id}`),

//   // Dashboards
//   getDashboard: () => api.get('/orders/dashboard'),           // admin only
//   getStaffDashboard: () => api.get('/orders/staff-dashboard'), // staff

//   // Customer
//   getMyOrders: () => api.get('/orders/my-orders'),

//   getGarmentPrices: () => api.get('/orders/garment-prices'),
// };

// export default api;







import axios from 'axios';

// Uses env variable — change in .env for production deployment
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally — redirect to appropriate login
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

// ─── Auth ────────────────────────────────────────────────
export const authAPI = {
  // Admin setup (1 time only, needs ADMIN_SECRET)
  registerAdmin: (data) => api.post('/auth/register-admin', data),

  // Staff creation — admin only, done from dashboard
  registerStaff: (data) => api.post('/auth/register-staff', data),

  // Login for admin + staff
  login: (data) => api.post('/auth/login', data),

  // Customer OTP flow
  sendOtp: (data) => api.post('/auth/customer/send-otp', data),
  verifyOtp: (data) => api.post('/auth/customer/verify-otp', data),

  // Common
  me: () => api.get('/auth/me'),

  // Staff management (admin only)
  getStaff: () => api.get('/auth/staff'),
  createStaff: (data) => api.post('/auth/register-staff', data),
  toggleStaff: (id) => api.patch(`/auth/staff/${id}/toggle`),
  deleteStaff: (id) => api.delete(`/auth/staff/${id}`),
};

// ─── Orders ──────────────────────────────────────────────
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
