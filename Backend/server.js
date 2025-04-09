const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
  app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/scraperRoutes'));

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');x
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
