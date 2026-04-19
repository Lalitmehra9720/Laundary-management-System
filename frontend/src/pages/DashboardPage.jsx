import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, IndianRupee, Clock, CheckCircle, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ordersAPI } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import StatCard from '../components/dashboard/StatCard';
import StatusChart from '../components/dashboard/StatusChart';
import GarmentsChart from '../components/dashboard/GarmentsChart';
import Card, { CardHeader } from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import { PageLoader } from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

const DashboardPage = () => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => ordersAPI.getDashboard().then((r) => r.data.data),
    refetchInterval: 30000, // auto-refresh every 30s
  });

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <Layout>
        <div className="text-center py-20 text-rose-400">
          Failed to load dashboard data. Please refresh.
        </div>
      </Layout>
    );
  }

  const { totalOrders, totalRevenue, ordersPerStatus, recentOrders, topGarments } = data;

  const pendingOrders =
    (ordersPerStatus.RECEIVED || 0) + (ordersPerStatus.PROCESSING || 0);

  return (
    <Layout>
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-gray-500 text-sm font-mono mb-1">
            {format(new Date(), 'EEEE, dd MMM yyyy')}
          </p>
          <h1 className="font-display font-bold text-3xl text-cream-100">
            Good morning, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening at your store today.
          </p>
        </div>
        <Link to="/orders/new">
          <Button variant="primary" icon={Plus}>
            New Order
          </Button>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          label="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          accent="gold"
          delay={0}
        />
        <StatCard
          label="Total Revenue"
          value={totalRevenue}
          icon={IndianRupee}
          accent="emerald"
          prefix="₹"
          delay={100}
        />
        <StatCard
          label="Pending Orders"
          value={pendingOrders}
          icon={Clock}
          accent="blue"
          delay={200}
        />
        <StatCard
          label="Delivered"
          value={ordersPerStatus.DELIVERED || 0}
          icon={CheckCircle}
          accent="violet"
          delay={300}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader
            title="Orders by Status"
            subtitle="Current distribution across all orders"
          />
          <StatusChart data={ordersPerStatus} />
        </Card>

        <Card>
          <CardHeader
            title="Top Garments"
            subtitle="Most cleaned garment types by volume"
          />
          <GarmentsChart data={topGarments} />
        </Card>
      </div>

      {/* Status breakdown pills */}
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
          subtitle="Last 5 orders created"
          action={
            <Link to="/orders">
              <Button variant="ghost" size="sm" icon={ArrowRight}>
                View All
              </Button>
            </Link>
          }
        />

        {recentOrders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            subtitle="Create your first order to get started"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Order ID', 'Customer', 'Amount', 'Status', 'Date'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs text-gray-600 font-mono uppercase tracking-wider pb-3 pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-white/3 transition-colors group"
                  >
                    <td className="py-3 pr-4">
                      <Link
                        to={`/orders/${order._id}`}
                        className="font-mono text-xs text-gold-400 hover:underline"
                      >
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-cream-100 font-medium">
                      {order.customerName}
                    </td>
                    <td className="py-3 pr-4 font-mono text-emerald-400">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="py-3 text-gray-600 text-xs">
                      {format(new Date(order.createdAt), 'dd MMM, hh:mm a')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </Layout>
  );
};

export default DashboardPage;
