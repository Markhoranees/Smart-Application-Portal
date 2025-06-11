// controllers/userController.js
import User from '../models/User.js';

// Save or Update User Details
export const updateUserDetails = async (req, res) => {
  console.log(req.body);
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      skills, 
      location, 
      educationLevel, 
      educationField, 
      workExperience, 
      professionalSummary 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          firstName: !firstName ? 'First name is required' : null,
          lastName: !lastName ? 'Last name is required' : null,
          email: !email ? 'Email is required' : null
        }
      });
    }

    // Get userId from Clerk session
    const userId = req.auth.userId;
    
    // Check if user already exists
    let user = await User.findOne({ userId });
    
    if (!user) {
      // If the user does not exist, create a new one
      user = new User({
        userId,
        firstName,
        lastName,
        email,
        skills: skills || '',
        location: location || '',
        educationLevel: educationLevel || '',
        educationField: educationField || '',
        workExperience: workExperience || '',
        professionalSummary: professionalSummary || '',
      });
    } else {
      // If the user exists, update their details
      // Only update fields that are provided and not empty
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (skills !== undefined) user.skills = skills;
      if (location !== undefined) user.location = location;
      if (educationLevel !== undefined) user.educationLevel = educationLevel;
      if (educationField !== undefined) user.educationField = educationField;
      if (workExperience !== undefined) user.workExperience = workExperience;
      if (professionalSummary !== undefined) user.professionalSummary = professionalSummary;
    }
    
    // Save or update the user
    await user.save();
    
    res.status(200).json({ 
      message: 'User details saved/updated successfully', 
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        skills: user.skills,
        location: user.location,
        educationLevel: user.educationLevel,
        educationField: user.educationField,
        workExperience: user.workExperience,
        professionalSummary: user.professionalSummary,
        cvUrl: user.cvUrl
      }
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    // Send more specific error messages
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {})
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// Upload CV for the user
export const uploadCv = async (req, res) => {
  try {
    console.log('Starting CV upload process');
    console.log('Request file:', req.file);
    
    // Check if file was uploaded
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No CV file uploaded' });
    }

    const userId = req.auth.userId;
    console.log('User ID:', userId);

    // Use findOneAndUpdate to update only the cvUrl field
    const result = await User.findOneAndUpdate(
      { userId },
      { $set: { cvUrl: req.file.path } },
      { new: true, runValidators: true }
    );

    if (!result) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('CV URL updated successfully:', result.cvUrl);
    res.status(200).json({ 
      message: 'CV uploaded successfully', 
      cvUrl: result.cvUrl 
    });

  } catch (error) {
    console.error('Error in CV upload:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message 
    });
  }
};

// Fetch user details by Clerk's user ID
export const getUserDetails = async (req, res) => {
  try {
    const userId = req.auth.userId;
    
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
