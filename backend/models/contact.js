const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contactSchema = new mongoose.Schema({
  id:         { type: String, default: () => uuidv4() },
  ticketId:   { type: String, default: () => 'TKT-' + Date.now().toString().slice(-6) },
  firstName:  { type: String, default: '' },
  lastName:   { type: String, default: '' },
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, default: '' },
  package:    { type: String, default: '' },
  travelDate: { type: String, default: null },
  travelers:  { type: Number, default: 1 },
  message:    { type: String, required: true },
  status:     { type: String, default: 'New' },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);