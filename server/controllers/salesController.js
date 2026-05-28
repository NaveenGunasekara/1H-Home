const mongoose = require('mongoose');
const SalesOrder = require('../models/SalesOrder');
const Invoice = require('../models/Invoice');
const Item = require('../models/Item');

exports.createSalesOrder = async (req, res) => {
  try {
    const { orderNumber, customer, items } = req.body;
    let totalAmount = 0;
    
    const processedItems = items.map(i => {
      const lineTotal = i.quantity * i.rate;
      totalAmount += lineTotal;
      return { item: i.item, quantity: i.quantity, rate: i.rate, total: lineTotal };
    });

    const order = await SalesOrder.create({
      orderNumber, 
      customer, 
      items: processedItems, 
      totalAmount, 
      status: 'Draft'
    });
    
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.confirmAndExecuteSalesOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { id } = req.params;
    const order = await SalesOrder.findById(id).session(session);
    
    if (!order) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Sales Order not found" });
    }
    if (order.status !== 'Draft') {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Only Draft orders can be confirmed" });
    }

    // Dynamic stock decrement verification loop
    for (const lineItem of order.items) {
      const inventoryItem = await Item.findById(lineItem.item).session(session);
      if (!inventoryItem || inventoryItem.stockOnHand < lineItem.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ 
          message: `Insufficient stock for SKU: ${inventoryItem ? inventoryItem.sku : 'Unknown'}. Available: ${inventoryItem ? inventoryItem.stockOnHand : 0}` 
        });
      }
      inventoryItem.stockOnHand -= lineItem.quantity;
      await inventoryItem.save({ session });
    }

    order.status = 'Confirmed';
    await order.save({ session });

    // Instantly generate downstream Invoice counterpart
    const invoiceNumber = `INV-${order.orderNumber}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    await Invoice.create([{
      invoiceNumber,
      salesOrder: order._id,
      customer: order.customer,
      totalAmount: order.totalAmount,
      status: 'Unpaid',
      dueDate
    }], { session });

    order.status = 'Invoiced';
    await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ message: "Sales Order executed, stock decremented, and invoice created", order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: error.message });
  }
};

exports.getSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find().populate('customer', 'name').sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};