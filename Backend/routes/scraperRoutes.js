const express = require('express');
const router = express.Router();
const { scrapeScholarships, getAllScholarships} = require('../controllers/scraperController');

router.get('/scrape', scrapeScholarships);
router.get('/getscholarships', getAllScholarships);

module.exports = router;
