const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/crmController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createContact).get(protect, getContacts);

module.exports = router;