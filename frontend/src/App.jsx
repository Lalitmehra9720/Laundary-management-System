// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';

// // Pages
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import OrdersPage from './pages/OrdersPage';
// import OrderDetailPage from './pages/OrderDetailPage';
// import CreateOrderPage from './pages/CreateOrderPage';

// // Auth guard — redirects to /login if not authenticated
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   return children;
// };

// // Public-only routes — redirect to /dashboard if already logged in
// const GuestRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   if (isAuthenticated) return <Navigate to="/dashboard" replace />;
//   return children;
// };

// const App = () => {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<HomePage />} />

//       <Route
//         path="/login"
//         element={
//           <GuestRoute>
//             <LoginPage />
//           </GuestRoute>
//         }
//       />
//       <Route
//         path="/register"
//         element={
//           <GuestRoute>
//             <RegisterPage />
//           </GuestRoute>
//         }
//       />

//       {/* Protected routes */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/orders"
//         element={
//           <ProtectedRoute>
//             <OrdersPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/orders/new"
//         element={
//           <ProtectedRoute>
//             <CreateOrderPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/orders/:id"
//         element={
//           <ProtectedRoute>
//             <OrderDetailPage />
//           </ProtectedRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default App;







// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';

// // Pages
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import CustomerLoginPage from './pages/CustomerLoginPage';
// import DashboardPage from './pages/DashboardPage';
// import StaffDashboardPage from './pages/StaffDashboardPage';
// import OrdersPage from './pages/OrdersPage';
// import OrderDetailPage from './pages/OrderDetailPage';
// import CreateOrderPage from './pages/CreateOrderPage';
// import MyOrdersPage from './pages/MyOrdersPage';

// // ── Guard: must be logged in ──────────────────────────
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   return children;
// };

// // ── Guard: staff or admin only ────────────────────────
// const StaffRoute = ({ children }) => {
//   const { isAuthenticated, isStaffOrAdmin } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (!isStaffOrAdmin) return <Navigate to="/my-orders" replace />;
//   return children;
// };

// // ── Guard: admin only ─────────────────────────────────
// const AdminRoute = ({ children }) => {
//   const { isAuthenticated, isAdmin } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (!isAdmin) return <Navigate to="/dashboard" replace />;
//   return children;
// };

// // ── Guard: customer only ──────────────────────────────
// const CustomerRoute = ({ children }) => {
//   const { isAuthenticated, isCustomer } = useAuth();
//   if (!isAuthenticated) return <Navigate to="/customer-login" replace />;
//   if (!isCustomer) return <Navigate to="/dashboard" replace />;
//   return children;
// };

// // ── Guard: redirect logged-in users away from login pages ──
// const GuestRoute = ({ children }) => {
//   const { isAuthenticated, isCustomer } = useAuth();
//   if (isAuthenticated) {
//     return <Navigate to={isCustomer ? '/my-orders' : '/dashboard'} replace />;
//   }
//   return children;
// };

// // ── Smart Dashboard: shows right dashboard per role ──
// const SmartDashboard = () => {
//   const { isAdmin, isStaff } = useAuth();
//   if (isAdmin) return <DashboardPage />;
//   if (isStaff) return <StaffDashboardPage />;
//   return <Navigate to="/my-orders" replace />;
// };

// const App = () => {
//   return (
//     <Routes>
//       {/* ── Public ──────────────────────────────── */}
//       <Route path="/" element={<HomePage />} />

//       <Route
//         path="/login"
//         element={<GuestRoute><LoginPage /></GuestRoute>}
//       />
//       <Route
//         path="/register"
//         element={<GuestRoute><RegisterPage /></GuestRoute>}
//       />
//       <Route
//         path="/customer-login"
//         element={<GuestRoute><CustomerLoginPage /></GuestRoute>}
//       />

//       {/* ── Customer ────────────────────────────── */}
//       <Route
//         path="/my-orders"
//         element={<CustomerRoute><MyOrdersPage /></CustomerRoute>}
//       />

//       {/* ── Staff + Admin ────────────────────────── */}
//       <Route
//         path="/dashboard"
//         element={<StaffRoute><SmartDashboard /></StaffRoute>}
//       />
//       <Route
//         path="/orders"
//         element={<StaffRoute><OrdersPage /></StaffRoute>}
//       />
//       <Route
//         path="/orders/new"
//         element={<StaffRoute><CreateOrderPage /></StaffRoute>}
//       />
//       <Route
//         path="/orders/:id"
//         element={<StaffRoute><OrderDetailPage /></StaffRoute>}
//       />

//       {/* ── Fallback ────────────────────────────── */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default App;







import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminSetupPage from './pages/AdminSetupPage';
import CustomerLoginPage from './pages/CustomerLoginPage';
import DashboardPage from './pages/DashboardPage';
import StaffDashboardPage from './pages/StaffDashboardPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import CreateOrderPage from './pages/CreateOrderPage';
import MyOrdersPage from './pages/MyOrdersPage';

// ── Must be logged in ─────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// ── Staff or Admin only ───────────────────────────────
const StaffRoute = ({ children }) => {
  const { isAuthenticated, isStaffOrAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isStaffOrAdmin) return <Navigate to="/my-orders" replace />;
  return children;
};

// ── Admin only ────────────────────────────────────────
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
};

// ── Customer only ─────────────────────────────────────
const CustomerRoute = ({ children }) => {
  const { isAuthenticated, isCustomer } = useAuth();
  if (!isAuthenticated) return <Navigate to="/customer-login" replace />;
  if (!isCustomer) return <Navigate to="/dashboard" replace />;
  return children;
};

// ── Already logged in → redirect away from login pages ─
const GuestRoute = ({ children }) => {
  const { isAuthenticated, isCustomer } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={isCustomer ? '/my-orders' : '/dashboard'} replace />;
  }
  return children;
};

// ── Smart dashboard: admin gets full, staff gets limited ─
const SmartDashboard = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <DashboardPage /> : <StaffDashboardPage />;
};

const App = () => {
  return (
    <Routes>
      {/* ── Public ──────────────────────────────── */}
      <Route path="/" element={<HomePage />} />

      {/* Staff/Admin login */}
      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />

      {/* One-time admin setup — needs ADMIN_SECRET */}
      <Route path="/admin-setup" element={<GuestRoute><AdminSetupPage /></GuestRoute>} />

      {/* Customer OTP login */}
      <Route path="/customer-login" element={<GuestRoute><CustomerLoginPage /></GuestRoute>} />

      {/* ── Customer ────────────────────────────── */}
      <Route path="/my-orders" element={<CustomerRoute><MyOrdersPage /></CustomerRoute>} />

      {/* ── Staff + Admin ────────────────────────── */}
      <Route path="/dashboard" element={<StaffRoute><SmartDashboard /></StaffRoute>} />
      <Route path="/orders" element={<StaffRoute><OrdersPage /></StaffRoute>} />
      <Route path="/orders/new" element={<StaffRoute><CreateOrderPage /></StaffRoute>} />
      <Route path="/orders/:id" element={<StaffRoute><OrderDetailPage /></StaffRoute>} />

      {/* ── Fallback ─────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
