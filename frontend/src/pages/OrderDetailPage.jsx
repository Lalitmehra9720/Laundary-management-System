import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  ArrowLeft,
  Phone,
  Calendar,
  Clock,
  Pencil,
  Trash2,
  User,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ordersAPI } from '../utils/api';
import Layout from '../components/common/Layout';
import Card, { CardHeader } from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import Button from '../components/common/Button';
import UpdateStatusModal from '../components/orders/UpdateStatusModal';
import { PageLoader } from '../components/common/Spinner';

const STATUS_ORDER = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];

const TimelineStep = ({ status, isActive, isCompleted, timestamp }) => {
  const stepConfig = {
    RECEIVED: { label: 'Received', emoji: '📥' },
    PROCESSING: { label: 'Processing', emoji: '⚙️' },
    READY: { label: 'Ready', emoji: '✅' },
    DELIVERED: { label: 'Delivered', emoji: '🎉' },
  };

  const config = stepConfig[status];

  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300
          ${isCompleted || isActive
            ? 'border-gold-400 bg-gold-400/15 shadow-lg shadow-gold-400/10'
            : 'border-white/10 bg-white/3 opacity-40'
          }`}
      >
        {config.emoji}
      </div>
      <p
        className={`text-xs font-mono text-center mt-1 ${
          isCompleted || isActive ? 'text-gold-400' : 'text-gray-600'
        }`}
      >
        {config.label}
      </p>
      {timestamp && (
        <p className="text-xs text-gray-700 text-center">
          {format(new Date(timestamp), 'dd MMM')}
        </p>
      )}
    </div>
  );
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersAPI.getById(id).then((r) => r.data.data.order),
  });

  const deleteMutation = useMutation({
    mutationFn: () => ordersAPI.delete(id),
    onSuccess: () => {
      toast.success('Order deleted');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate('/orders');
    },
    onError: () => toast.error('Failed to delete order'),
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <PageLoader />;

  if (isError || !data) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-rose-400 mb-4">Order not found or failed to load.</p>
          <Link to="/orders">
            <Button variant="secondary">Back to Orders</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const order = data;
  const currentStatusIdx = STATUS_ORDER.indexOf(order.status);

  // Map status timestamps from history
  const statusTimestamps = {};
  order.statusHistory?.forEach((h) => {
    statusTimestamps[h.status] = h.changedAt;
  });

  return (
    <Layout>
      {/* Back nav */}
      <div className="mb-6">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gold-400 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Orders
        </Link>
      </div>

      {/* Top header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm text-gold-400 bg-gold-400/10 px-3 py-1 rounded-lg border border-gold-400/20">
              {order.orderId}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <h1 className="font-display font-bold text-3xl text-cream-100">
            {order.customerName}
          </h1>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="md"
            icon={Pencil}
            onClick={() => setStatusModalOpen(true)}
          >
            Update Status
          </Button>
          <Button
            variant="danger"
            size="md"
            icon={Trash2}
            onClick={handleDelete}
            loading={deleteMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader title="Order Progress" />
            <div className="flex items-start gap-2">
              {STATUS_ORDER.map((status, idx) => (
                <div key={status} className="flex items-center flex-1">
                  <TimelineStep
                    status={status}
                    isActive={order.status === status}
                    isCompleted={idx <= currentStatusIdx}
                    timestamp={statusTimestamps[status]}
                  />
                  {idx < STATUS_ORDER.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-1 mt-[-18px] transition-all duration-300 ${
                        idx < currentStatusIdx ? 'bg-gold-400/50' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Garments table */}
          <Card>
            <CardHeader title="Garments" subtitle={`${order.garments.length} item type(s)`} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Garment', 'Qty', 'Price/Item', 'Subtotal'].map((h) => (
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
                  {order.garments.map((g, i) => (
                    <tr key={i} className="hover:bg-white/3 transition-colors">
                      <td className="py-3 pr-4 font-medium text-cream-100">{g.type}</td>
                      <td className="py-3 pr-4 text-gray-400 font-mono">{g.quantity}</td>
                      <td className="py-3 pr-4 text-gray-400 font-mono">
                        ₹{g.pricePerItem}
                      </td>
                      <td className="py-3 font-mono font-semibold text-gold-400">
                        ₹{g.subtotal.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-white/10">
                    <td colSpan={3} className="pt-4 text-sm text-gray-400 font-medium">
                      Total Amount
                    </td>
                    <td className="pt-4 font-display font-bold text-xl text-gold-gradient">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          {/* Status history */}
          <Card>
            <CardHeader title="Status History" subtitle="Full audit trail" />
            <div className="flex flex-col gap-3">
              {[...order.statusHistory].reverse().map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-white/3 rounded-xl border border-white/5"
                >
                  <div className="w-2 h-2 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={h.status} size="sm" />
                      <span className="text-xs text-gray-600 font-mono">
                        {format(new Date(h.changedAt), 'dd MMM yyyy, hh:mm a')}
                      </span>
                    </div>
                    {h.note && (
                      <p className="text-xs text-gray-500 mt-1">{h.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Customer info */}
          <Card glow>
            <CardHeader title="Customer" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/30 flex items-center justify-center">
                  <span className="text-gold-400 font-bold text-sm">
                    {order.customerName[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-cream-100">{order.customerName}</p>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={14} className="text-gray-600" />
                {order.phoneNumber}
              </div>
            </div>
          </Card>

          {/* Order meta */}
          <Card>
            <CardHeader title="Order Details" />
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-2 text-gray-400">
                <Calendar size={14} className="text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-600">Created</p>
                  <p>{format(new Date(order.createdAt), 'dd MMM yyyy, hh:mm a')}</p>
                </div>
              </div>
              {order.estimatedDelivery && (
                <div className="flex items-start gap-2 text-amber-400">
                  <Clock size={14} className="mt-0.5" />
                  <div>
                    <p className="text-xs text-amber-600">Estimated Delivery</p>
                    <p>{format(new Date(order.estimatedDelivery), 'dd MMM yyyy')}</p>
                  </div>
                </div>
              )}
              {order.createdBy && (
                <div className="flex items-start gap-2 text-gray-400">
                  <User size={14} className="text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Created by</p>
                    <p>{order.createdBy.name}</p>
                  </div>
                </div>
              )}
              {order.specialInstructions && (
                <div className="flex items-start gap-2 text-gray-400">
                  <FileText size={14} className="text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-600">Special Instructions</p>
                    <p className="text-xs mt-0.5 text-gray-400 leading-relaxed">
                      {order.specialInstructions}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Revenue card */}
          <Card className="text-center">
            <p className="text-xs text-gray-600 uppercase tracking-widest font-mono mb-1">
              Bill Total
            </p>
            <p className="font-display font-bold text-4xl text-gold-gradient">
              ₹{order.totalAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {order.garments.reduce((s, g) => s + g.quantity, 0)} garments
            </p>
          </Card>
        </div>
      </div>

      {/* Update Status Modal */}
      <UpdateStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        order={order}
      />
    </Layout>
  );
};

export default OrderDetailPage;
