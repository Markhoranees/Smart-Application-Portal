// controllers/userController.js
import User from '../models/User.js';

// Save or Update User Details
export const updateUserDetails = async (req, res) => {
  const { firstName, lastName, email, skills, location, educationLevel, educationField, workExperience, professionalSummary } = req.body;
  const userId = req.user.id; // Clerk user ID
  
  try {
    // Check if user already exists
    let user = await User.findOne({ userId });
    
    if (!user) {
      // If the user does not exist, create a new one
      user = new User({
        userId,
        firstName,
        lastName,
        email,
        skills,
        location,
        educationLevel,
        educationField,
        workExperience,
        professionalSummary,
      });
    } else {
      // If the user exists, update their details
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.skills = skills || user.skills;
      user.location = location || user.location;
      user.educationLevel = educationLevel || user.educationLevel;
      user.educationField = educationField || user.educationField;
      user.workExperience = workExperience || user.workExperience;
      user.professionalSummary = professionalSummary || user.professionalSummary;
    }
    
    // Save or update the user
    await user.save();
    
    res.status(200).json({ message: 'User details saved/updated successfully', user });
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Upload CV for the user
export const uploadCv = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const cvFilePath = req.file.path; // Path to the uploaded CV
    
    // Update the user with the new CV URL
    user.cvUrl = cvFilePath;
    
    // Save the user with the CV URL
    await user.save();
    
    res.status(200).json({ message: 'CV uploaded successfully', cvUrl: cvFilePath });
  } catch (error) {
    console.error('Error uploading CV:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Fetch user details by Clerk's user ID
export const getUserDetails = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.status(200).json(user); // Send back the user details
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
