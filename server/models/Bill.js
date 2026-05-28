const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  billNumber: { type: String, required: true, unique: true },
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' },
  dueDate: { type: Date, required: true },
  billDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);