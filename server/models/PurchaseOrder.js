const mongoose = require('mongoose');

const PurchaseOrderItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, min: 1 },
  rate: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true }
});

const PurchaseOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  items: [PurchaseOrderItemSchema],
  totalAmount: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['Draft', 'Ordered', 'Received', 'Cancelled'], default: 'Draft' },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);