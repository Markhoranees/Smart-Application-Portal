const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  image: { type: String, default: '' },
  date: { type: String, required: true },
});

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship;
