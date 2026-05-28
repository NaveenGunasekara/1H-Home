const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, purchaseController.createPurchaseOrder)
  .get(protect, purchaseController.getPurchaseOrders);

router.route('/:id/receive')
  .post(protect, purchaseController.receivePurchaseGoods);

module.exports = router;