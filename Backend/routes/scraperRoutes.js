const express = require('express');
const router = express.Router();
const { scrapeScholarships, getAllScholarships} = require('../controllers/scraperController');
const { scrapeRozeeJobs, getAllJobs } = require('../controllers/jobController');
const { scrapeInternships, getAllInternships } = require('../controllers/internshipController');


router.get('/scrape', scrapeScholarships);
router.get('/getscholarships', getAllScholarships);
router.get('/jobscrape', scrapeRozeeJobs);
router.get('/jobs', getAllJobs);

router.get('/scrape-internships', scrapeInternships);
router.get('/internships', getAllInternships);

module.exports = router;
