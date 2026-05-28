const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const { name, sku, purchaseCost, sellingPrice, stockOnHand, reorderPoint } = req.body;
    const item = await Item.create({ name, sku, purchaseCost, sellingPrice, stockOnHand, reorderPoint });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ name: 1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adjustStockManually = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStock } = req.body;
    if (newStock < 0) return res.status(400).json({ message: "Stock cannot be negative" });

    const item = await Item.findByIdAndUpdate(id, { stockOnHand: newStock }, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};