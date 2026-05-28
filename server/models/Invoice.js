const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  salesOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Unpaid', 'Paid', 'Overdue'], default: 'Unpaid' },
  dueDate: { type: Date, required: true },
  invoiceDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);