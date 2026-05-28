const mongoose = require('mongoose');
const PurchaseOrder = require('../models/PurchaseOrder');
const Bill = require('../models/Bill');
const Item = require('../models/Item');

exports.createPurchaseOrder = async (req, res) => {
  try {
    const { orderNumber, vendor, items } = req.body;
    let totalAmount = 0;
    const processedItems = items.map(i => {
      const lineTotal = i.quantity * i.rate;
      totalAmount += lineTotal;
      return { item: i.item, quantity: i.quantity, rate: i.rate, total: lineTotal };
    });

    const order = await PurchaseOrder.create({
      orderNumber, vendor, items: processedItems, totalAmount, status: 'Draft'
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.receivePurchaseGoods = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const order = await PurchaseOrder.findById(id).session(session);
    if (!order) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Purchase Order not found" });
    }
    if (order.status !== 'Draft' && order.status !== 'Ordered') {
      await session.abortTransaction();
      return res.status(400).json({ message: "Order is already complete or cancelled" });
    }

    for (const lineItem of order.items) {
      await Item.findByIdAndUpdate(
        lineItem.item,
        { $inc: { stockOnHand: lineItem.quantity } },
        { session }
      );
    }

    order.status = 'Received';
    await order.save({ session });

    const billNumber = `BILL-${order.orderNumber}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);

    await Bill.create([{
      billNumber,
      purchaseOrder: order._id,
      vendor: order.vendor,
      totalAmount: order.totalAmount,
      status: 'Unpaid',
      dueDate
    }], { session });

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ message: "Goods received, stock incremented, and vendor bill established", order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

exports.getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().populate('vendor', 'name').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};