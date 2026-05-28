const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
  purchaseCost: { type: Number, required: true, min: 0 },
  sellingPrice: { type: Number, required: true, min: 0 },
  stockOnHand: { type: Number, required: true, min: 0, default: 0 },
  reorderPoint: { type: Number, required: true, min: 0, default: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);