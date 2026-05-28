const SalesOrder = require('../models/SalesOrder');
const PurchaseOrder = require('../models/PurchaseOrder');
const Item = require('../models/Item');

exports.getComprehensiveReport = async (req, res) => {
  try {
    const { from, to, status } = req.query;

    let dateFilter = {};
    if (from || to) {
      dateFilter.createdAt = {};
      if (from) dateFilter.createdAt.$gte = new Date(from);
      if (to) dateFilter.createdAt.$lte = new Date(to);
    }

    let salesQuery = { ...dateFilter };
    if (status) salesQuery.status = status;
    const salesOrders = await SalesOrder.find(salesQuery).populate('customer', 'name');
    const totalSalesVolume = salesOrders.reduce((acc, order) => acc + order.totalAmount, 0);

    let purchaseQuery = { ...dateFilter };
    const purchaseOrders = await PurchaseOrder.find(purchaseQuery).populate('vendor', 'name');
    const totalPurchasesVolume = purchaseOrders.reduce((acc, order) => acc + order.totalAmount, 0);

    const items = await Item.find({});
    let totalInventoryValue = 0;
    let lowStockItemsCount = 0;
    const lowStockAlerts = [];

    items.forEach(item => {
      const valuation = item.stockOnHand * item.purchaseCost;
      totalInventoryValue += valuation;
      if (item.stockOnHand <= item.reorderPoint) {
        lowStockItemsCount++;
        lowStockAlerts.push({
          name: item.name,
          sku: item.sku,
          stockOnHand: item.stockOnHand,
          reorderPoint: item.reorderPoint
        });
      }
    });

    res.status(200).json({
      summary: {
        totalSalesVolume,
        totalPurchasesVolume,
        totalInventoryValue,
        lowStockItemsCount
      },
      salesOrders,
      purchaseOrders,
      lowStockAlerts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};