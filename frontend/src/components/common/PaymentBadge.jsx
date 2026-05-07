import { CheckCircle, Clock } from 'lucide-react';

const PaymentBadge = ({ status, method, size = 'sm' }) => {
  const isPaid = status === 'PAID';
  const Icon = isPaid ? CheckCircle : Clock;
  const label = isPaid ? `PAID${method === 'RAZORPAY' ? ' ONLINE' : ''}` : 'PAYMENT DUE';
  const classes = isPaid
    ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25'
    : 'text-amber-400 bg-amber-400/10 border-amber-400/25';
  const sizing = size === 'md' ? 'text-xs px-3 py-1.5' : 'text-[10px] px-2 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono rounded-full border whitespace-nowrap ${classes} ${sizing}`}>
      <Icon size={size === 'md' ? 13 : 11} />
      {label}
    </span>
  );
};

export default PaymentBadge;
