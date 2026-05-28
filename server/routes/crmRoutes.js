const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST: Save a submission from the public client contact form
router.post('/submit-contact', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Validation Failed: Name, email, and message are required.');
    }
    const newLead = await Contact.create({ name, email, message });
    return res.status(201).json({ message: 'Submission logged successfully', newLead });
  } catch (err) {
    next(err);
  }
});

module.exports = router;