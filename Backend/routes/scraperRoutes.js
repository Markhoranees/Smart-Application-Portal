const express = require('express');
const router = express.Router();
const { scrapeScholarships, getAllScholarships} = require('../controllers/scraperController');
const { scrapeRozeeJobs, getAllJobs } = require('../controllers/jobController');


router.get('/scrape', scrapeScholarships);
router.get('/getscholarships', getAllScholarships);
router.get('/jobscrape', scrapeRozeeJobs);
router.get('/jobs', getAllJobs);

module.exports = router;
