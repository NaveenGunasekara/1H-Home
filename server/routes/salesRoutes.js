const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { protect } = require('../middleware/authMiddleware');

// Using explicit controller reference properties prevents undefined injection errors
router.route('/')
  .post(protect, salesController.createSalesOrder)
  .get(protect, salesController.getSalesOrders);

router.route('/:id/execute')
  .post(protect, salesController.confirmAndExecuteSalesOrder);

module.exports = router;