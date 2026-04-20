// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

// const GARMENT_PRICES = {
//   Shirt: 50,
//   Pants: 70,
//   Saree: 150,
//   Suit: 250,
//   Jacket: 200,
//   Kurta: 80,
//   Lehenga: 300,
//   Bedsheet: 120,
//   Curtain: 180,
//   Blanket: 200,
//   Tie: 40,
//   Sweater: 100,
// };

// const garmentSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//     enum: Object.keys(GARMENT_PRICES),
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: [1, 'Quantity must be at least 1'],
//   },
//   pricePerItem: {
//     type: Number,
//     required: true,
//   },
//   subtotal: {
//     type: Number,
//     required: true,
//   },
// });

// const statusHistorySchema = new mongoose.Schema({
//   status: {
//     type: String,
//     enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
//   },
//   changedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   note: String,
// });

// const orderSchema = new mongoose.Schema(
//   {
//     orderId: {
//       type: String,
//       unique: true,
//       default: () => 'ORD-' + uuidv4().slice(0, 8).toUpperCase(),
//     },
//     customerName: {
//       type: String,
//       required: [true, 'Customer name is required'],
//       trim: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: [true, 'Phone number is required'],
//       trim: true,
//       match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
//     },
//     garments: {
//       type: [garmentSchema],
//       validate: {
//         validator: (v) => v.length > 0,
//         message: 'At least one garment is required',
//       },
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
//       default: 'RECEIVED',
//     },
//     statusHistory: [statusHistorySchema],
//     estimatedDelivery: {
//       type: Date,
//     },
//     specialInstructions: {
//       type: String,
//       trim: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   },
//   { timestamps: true }
// );

// // Auto-calculate estimated delivery (3 days from creation)
// orderSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const delivery = new Date();
//     delivery.setDate(delivery.getDate() + 3);
//     this.estimatedDelivery = delivery;

//     // Push initial status to history
//     this.statusHistory.push({ status: 'RECEIVED', note: 'Order created' });
//   }
//   next();
// });

// // Export garment prices too for reuse
// orderSchema.statics.GARMENT_PRICES = GARMENT_PRICES;

// module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const GARMENT_PRICES = {
  Shirt: 50,
  Pants: 70,
  Saree: 150,
  Suit: 250,
  Jacket: 200,
  Kurta: 80,
  Lehenga: 300,
  Bedsheet: 120,
  Curtain: 180,
  Blanket: 200,
  Tie: 40,
  Sweater: 100,
};

const garmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: Object.keys(GARMENT_PRICES),
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  pricePerItem: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
  },
  changedAt: { type: Date, default: Date.now },
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  note: String,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      default: () => 'ORD-' + uuidv4().slice(0, 8).toUpperCase(),
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'],
    },
    // Link to registered customer account (optional — walk-in customers won't have this)
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    garments: {
      type: [garmentSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: 'At least one garment is required',
      },
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
      default: 'RECEIVED',
    },
    statusHistory: [statusHistorySchema],
    estimatedDelivery: { type: Date },
    specialInstructions: { type: String, trim: true },
    // Payment tracking
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID'],
      default: 'PENDING',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Auto-set estimated delivery on creation
orderSchema.pre('save', function (next) {
  if (this.isNew) {
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3);
    this.estimatedDelivery = delivery;
    this.statusHistory.push({ status: 'RECEIVED', note: 'Order created' });
  }
  next();
});

// Auto-link customerId from phoneNumber if a customer account exists
orderSchema.statics.linkCustomer = async function (phoneNumber) {
  const User = mongoose.model('User');
  const customer = await User.findOne({ phone: phoneNumber, role: 'customer' });
  return customer ? customer._id : null;
};

orderSchema.statics.GARMENT_PRICES = GARMENT_PRICES;

module.exports = mongoose.model('Order', orderSchema);
