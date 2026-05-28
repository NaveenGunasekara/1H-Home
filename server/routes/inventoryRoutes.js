const express = require('express');
const router = express.Router();
const { createItem, getItems, adjustStockManually } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createItem).get(protect, getItems);
router.route('/:id/adjust').put(protect, adjustStockManually);

module.exports = router;