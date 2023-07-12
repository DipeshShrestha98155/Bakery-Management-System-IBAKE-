import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from "../models/productModel.js"

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    deliveryCharge,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      deliveryCharge,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id || '',
        status: req.body.status || '',
        update_time: req.body.update_time || '',
        email_address: req.body.email_address || '',
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  } catch (err) {
    console.log(err);
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const items = order.orderItems;

  // Changes countInStock for each product in order
  items.forEach(async (item) => {
    const product = await Product.findById(item.product);
    const currentCount = product.countInStock;
    const orderCount = item.qty;

    Product.findOneAndUpdate({name: product.name}, {countInStock: currentCount-orderCount})
  });

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // update is paid to true if payment method is cash on delivery
    if (order.paymentMethod === 'Cash On Delivery') {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: '',
        status: 'paid',
        update_time: Date.now(),
        email_address: 'ibake@gmail.com',
      };
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
