const axios = require('axios');
const cheerio = require('cheerio');
const Scholarship = require('../models/Scholarship');

const scrapeScholarships = async (req, res) => {
  try {
    const { data } = await axios.get('https://opportunitiescorners.com/category/bachelor-master-phd-scholarships/');
    const $ = cheerio.load(data);
    const scholarships = [];

    $('.td-block-span6').each((_, el) => {
      const title = $(el).find('.entry-title a').text().trim();
      const link = $(el).find('.entry-title a').attr('href');
      const image = $(el).find('.td-module-thumb img').attr('src') || '';
      const date = $(el).find('.td-post-date time').text().trim();

      if (title && link) {
        scholarships.push({ title, link, image, date });
      }
    });

    for (const item of scholarships) {
      await Scholarship.updateOne({ link: item.link }, item, { upsert: true });
    }

    res.json({
      message: 'Data scraped and saved successfully!',
      count: scholarships.length,
      data: scholarships,
    });
  } catch (error) {
    console.error('Scrape Error:', error.message);
    res.status(500).json({ error: 'Scraping failed' });
  }
};


const getAllScholarships = async (req, res) => {
    try {
      const scholarships = await Scholarship.find();
      res.json({
        data: scholarships,
      });
    } catch (error) {
      console.error('Error fetching scholarships:', error.message);
      res.status(500).json({ error: 'Failed to fetch scholarships' });
    }
  };


module.exports = { scrapeScholarships, getAllScholarships };
