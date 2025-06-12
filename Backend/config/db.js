import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Use the connection URI from the environment variable or default to the local one
    const apiKey =  "mongodb://localhost:27017";
    
    // Connect to MongoDB
    await mongoose.connect(apiKey, {
      dbName: "jobportal",
    });

    console.log('MongoDB Connected Successfully 🚀');
  } catch (error) {
    console.error(`Error connecting MongoDB: ${error.message}`);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
