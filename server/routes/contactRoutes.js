const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit message from contact page
router.post('/', async (req, res) => {
  try {
    const newSubmission = await Contact.create(req.body);
    res.status(201).json({ message: 'Submission successful', newSubmission });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;