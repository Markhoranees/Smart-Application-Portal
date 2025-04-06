const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: String,
  link: { type: String, unique: true },
  image: String,
  date: String,
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
