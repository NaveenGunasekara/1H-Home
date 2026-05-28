const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, company, type } = req.body;
    const contact = await Contact.create({ name, email, phone, company, type });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { type } : {};
    const contacts = await Contact.find(filter).sort({ name: 1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};