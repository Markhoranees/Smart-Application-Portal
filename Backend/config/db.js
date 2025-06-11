import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    // Use the connection URI from the environment variable or default to the local one
    const apiKey =  "mongodb+srv://fawadeqbal:fawadeqbal@cluster0.kznbk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    
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
