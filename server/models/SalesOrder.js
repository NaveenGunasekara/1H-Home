const mongoose = require('mongoose');

const SalesOrderItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, min: 1 },
  rate: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true }
});

const SalesOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  items: [SalesOrderItemSchema],
  totalAmount: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['Draft', 'Confirmed', 'Invoiced', 'Cancelled'], default: 'Draft' },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('SalesOrder', SalesOrderSchema);