const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All order routes are protected
router.use(protect);

// GET /api/orders/garment-prices  — get configured prices
router.get('/garment-prices', (req, res) => {
  res.json({
    success: true,
    data: Order.GARMENT_PRICES,
  });
});

// GET /api/orders/dashboard  — summary stats
router.get('/dashboard', async (req, res, next) => {
  try {
    const [totalOrders, revenueResult, statusCounts, recentOrders, topGarments] =
      await Promise.all([
        Order.countDocuments(),

        Order.aggregate([
          { $group: { _id: null, total: { $sum: '$totalAmount' } } },
        ]),

        Order.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),

        Order.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select('orderId customerName totalAmount status createdAt'),

        Order.aggregate([
          { $unwind: '$garments' },
          {
            $group: {
              _id: '$garments.type',
              totalQuantity: { $sum: '$garments.quantity' },
              totalRevenue: { $sum: '$garments.subtotal' },
            },
          },
          { $sort: { totalQuantity: -1 } },
          { $limit: 5 },
        ]),
      ]);

    const statusMap = { RECEIVED: 0, PROCESSING: 0, READY: 0, DELIVERED: 0 };
    statusCounts.forEach(({ _id, count }) => {
      statusMap[_id] = count;
    });

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue: revenueResult[0]?.total || 0,
        ordersPerStatus: statusMap,
        recentOrders,
        topGarments,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders  — list with filters
router.get('/', async (req, res, next) => {
  try {
    const { status, search, garmentType, page = 1, limit = 10 } = req.query;

    const query = {};

    if (status) query.status = status.toUpperCase();

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { orderId: { $regex: search, $options: 'i' } },
      ];
    }

    if (garmentType) {
      query['garments.type'] = garmentType;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('createdBy', 'name email'),
      Order.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          limit: parseInt(limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/orders  — create new order
router.post('/', async (req, res, next) => {
  try {
    const { customerName, phoneNumber, garments, specialInstructions } = req.body;

    if (!garments || garments.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one garment is required',
      });
    }

    // Calculate prices using configured price list
    const PRICES = Order.GARMENT_PRICES;
    const processedGarments = garments.map((g) => {
      const pricePerItem = PRICES[g.type];
      if (!pricePerItem) {
        throw { statusCode: 400, message: `Unknown garment type: ${g.type}` };
      }
      return {
        type: g.type,
        quantity: g.quantity,
        pricePerItem,
        subtotal: pricePerItem * g.quantity,
      };
    });

    const totalAmount = processedGarments.reduce((sum, g) => sum + g.subtotal, 0);

    const order = await Order.create({
      customerName,
      phoneNumber,
      garments: processedGarments,
      totalAmount,
      specialInstructions,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id  — get single order
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      $or: [{ _id: req.params.id }, { orderId: req.params.id }],
    }).populate('createdBy', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: { order } });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/orders/:id/status  — update order status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status, note } = req.body;

    const validStatuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];
    if (!validStatuses.includes(status?.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.findOne({
      $or: [{ _id: req.params.id }, { orderId: req.params.id }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status.toUpperCase();
    order.statusHistory.push({
      status: status.toUpperCase(),
      note: note || `Status updated to ${status.toUpperCase()}`,
    });

    await order.save();

    res.json({
      success: true,
      message: `Order status updated to ${status.toUpperCase()}`,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orders/:id  — delete order (admin only in practice)
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOneAndDelete({
      $or: [{ _id: req.params.id }, { orderId: req.params.id }],
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
