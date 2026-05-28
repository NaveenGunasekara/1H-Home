const express = require('express');
const router = express.Router();
const { getComprehensiveReport } = require('../controllers/reportsController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getComprehensiveReport);

module.exports = router;