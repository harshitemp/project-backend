const Contact = require('../models/Contact');
exports.getAllContactForm = async (req, res) => {
  try {
      const contact = await Contact.find();
      res.status(200).json(contact);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving message', error });
  }
};
