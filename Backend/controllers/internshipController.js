const axios = require('axios');
const cheerio = require('cheerio');
const Internship = require('../models/Internship');  // Define a Mongoose model for internships

// Scrape internship data
const scrapeInternships = async (req, res) => {
  try {
    // Fetch the data from the website
    const { data } = await axios.get('https://opportunitiescorners.com/category/internships/');
    const $ = cheerio.load(data);

    // Create an empty array to store the scraped internship data
    const internships = [];

    // Loop through each internship listing on the page
    $('.td_module_6').each((_, el) => {
      const title = $(el).find('.entry-title').text().trim();
      const link = $(el).find('.entry-title a').attr('href');
      const image = $(el).find('.entry-thumb').attr('src') || '';
      const date = $(el).find('.entry-date').text().trim();

      if (title && link) {
        internships.push({ title, link, image, date });
      }
    });

    // Save each internship to the database (upsert ensures no duplicates)
    for (const item of internships) {
      await Internship.updateOne({ link: item.link }, item, { upsert: true });
    }

    // Send response back
    res.json({
      message: 'Internships scraped and saved successfully!',
      count: internships.length,
      data: internships,
    });
  } catch (error) {
    console.error('Scrape Error:', error.message);
    res.status(500).json({ error: 'Scraping failed' });
  }
};

// Get all internships from the database
const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json({
      data: internships,
    });
  } catch (error) {
    console.error('Error fetching internships:', error.message);
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
};

module.exports = { scrapeInternships, getAllInternships };
