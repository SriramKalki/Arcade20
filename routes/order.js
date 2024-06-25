const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Create an order
router.post('/', async (req, res) => {
  const order = new Order({
    product: req.body.product,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
  });

  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('product');
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an order
router.patch('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const removedOrder = await Order.findByIdAndDelete(req.params.id);
    res.json(removedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
