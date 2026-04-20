import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Clock, CheckCircle, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ordersAPI } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import StatCard from '../components/dashboard/StatCard';
import Card, { CardHeader } from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import { PageLoader } from '../components/common/Spinner';

const StaffDashboardPage = () => {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['staff-dashboard'],
    queryFn: () => ordersAPI.getStaffDashboard().then((r) => r.data.data),
    refetchInterval: 30000,
  });

  if (isLoading) return <PageLoader />;

  const { ordersPerStatus = {}, recentOrders = [] } = data || {};
  const totalActive = (ordersPerStatus.RECEIVED || 0) + (ordersPerStatus.PROCESSING || 0);

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-gray-500 text-sm font-mono mb-1">
            {format(new Date(), 'EEEE, dd MMM yyyy')}
          </p>
          <h1 className="font-display font-bold text-3xl text-cream-100">
            Welcome, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here are today's orders to manage.
          </p>
        </div>
        <Link to="/orders/new">
          <Button variant="primary" icon={Plus}>New Order</Button>
        </Link>
      </div>

      {/* Stat cards — no revenue for staff */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard
          label="Active Orders"
          value={totalActive}
          icon={Clock}
          accent="gold"
          delay={0}
        />
        <StatCard
          label="Ready for Pickup"
          value={ordersPerStatus.READY || 0}
          icon={CheckCircle}
          accent="emerald"
          delay={100}
        />
        <StatCard
          label="Delivered Today"
          value={ordersPerStatus.DELIVERED || 0}
          icon={ShoppingBag}
          accent="violet"
          delay={200}
        />
      </div>

      {/* Status cards as clickable quick filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { status: 'RECEIVED', count: ordersPerStatus.RECEIVED || 0, color: 'border-blue-400/20 bg-blue-400/5' },
          { status: 'PROCESSING', count: ordersPerStatus.PROCESSING || 0, color: 'border-amber-400/20 bg-amber-400/5' },
          { status: 'READY', count: ordersPerStatus.READY || 0, color: 'border-emerald-400/20 bg-emerald-400/5' },
          { status: 'DELIVERED', count: ordersPerStatus.DELIVERED || 0, color: 'border-violet-400/20 bg-violet-400/5' },
        ].map(({ status, count, color }) => (
          <Link
            key={status}
            to={`/orders?status=${status}`}
            className={`glass-card p-4 border ${color} hover:scale-105 transition-transform duration-200 text-center`}
          >
            <p className="font-display font-bold text-2xl text-cream-100">{count}</p>
            <StatusBadge status={status} size="sm" />
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader
          title="Recent Orders"
          subtitle="Last 5 orders"
          action={
            <Link to="/orders">
              <Button variant="ghost" size="sm" icon={ArrowRight}>View All</Button>
            </Link>
          }
        />
        {recentOrders.length === 0 ? (
          <p className="text-gray-600 text-sm text-center py-8">No orders yet today</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Order ID', 'Customer', 'Status', 'Est. Delivery'].map((h) => (
                    <th key={h} className="text-left text-xs text-gray-600 font-mono uppercase tracking-wider pb-3 pr-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-white/3 transition-colors">
                    <td className="py-3 pr-4">
                      <Link to={`/orders/${order._id}`} className="font-mono text-xs text-gold-400 hover:underline">
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-cream-100 font-medium">{order.customerName}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="py-3 text-amber-500 text-xs font-mono">
                      {order.estimatedDelivery
                        ? format(new Date(order.estimatedDelivery), 'dd MMM')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Staff note — no revenue access */}
      <div className="mt-5 text-center text-xs text-gray-700 bg-white/3 border border-white/5 rounded-xl p-3">
        💡 Revenue and analytics are available to admins only. Contact your admin for reports.
      </div>
    </Layout>
  );
};

export default StaffDashboardPage;
