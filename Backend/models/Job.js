const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  summary: String,
  link: { type: String, unique: true },
  date: String,
});

module.exports = mongoose.model('Job', jobSchema);
