const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/Job'); // Make sure you have a Job model defined.

const scrapeRozeeJobs = async (req, res) => {
  try {
    // Define headers to simulate a real browser
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'TE': 'Trailers'
    };

    // URL for Rozee.pk Top Jobs page
    const url = 'https://www.rozee.pk/top-jobs';

    // Send GET request to Rozee.pk with custom headers
    const { data } = await axios.get(url, { headers });

    // Use Cheerio to load the HTML data
    const $ = cheerio.load(data);
    const jobs = [];

    // Extract job details from each job listing
    $('div.col-lg-4.col-md-6').each((index, element) => {
      const jobTitle = $(element).find('.h3.s-20 a').text().trim();
      const companyName = $(element).find('.h4.s-18').text().trim();
      const jobLink = 'https://www.rozee.pk' + $(element).find('.full_link').attr('href');
      const location = $(element).find('.h4.s-18').text().split('-')[1]?.trim();

      // Ensure there is enough data before pushing to jobs array
      if (jobTitle && companyName && jobLink && location) {
        jobs.push({
          title: jobTitle,
          company: companyName,
          location: location,
          link: jobLink,
        });
      }
    });

    // Store the scraped jobs into MongoDB
    for (const job of jobs) {
      await Job.updateOne({ link: job.link }, job, { upsert: true });
    }

    res.json({
      message: 'Jobs scraped and saved successfully!',
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error('Error scraping jobs:', error.message);
    res.status(500).json({ error: 'Scraping failed' });
  }
};


const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find();  // Fetch all jobs from the database
      res.status(200).json({
        data: jobs,
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({
        message: 'Failed to fetch jobs',
        error: error.message,
      });
    }
  };
  

module.exports = { scrapeRozeeJobs, getAllJobs };
