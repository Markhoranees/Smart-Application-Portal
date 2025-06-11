import React, { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import "../assets/styles/UserDashboard.css"; // Import your custom CSS for styling

const UserDashboard = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    skills: "",
    location: "",
    educationLevel: "",
    educationField: "",
    workExperience: "",
    professionalSummary: "",
    cvUrl: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [cvUploaded, setCvUploaded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);  // To toggle between view and edit mode

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoaded && user) {
        try {
          const token = await getToken();
          const response = await axios.get("http://localhost:5000/api/userinfo/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserDetails(response.data);
          setCvUploaded(!!response.data.cvUrl);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  }, [isLoaded, user, getToken]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change for CV upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  // Handle profile update submission
  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    try {
      userDetails.email = user.emailAddresses[0].emailAddress;
      const token = await getToken();
      const response = await axios.put(
        "http://localhost:5000/api/userinfo/update-profile",
        userDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle CV upload
  const handleSubmitCV = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("cvFile", cvFile);

    try {
      const token = await getToken();
      const response = await axios.post(
        "http://localhost:5000/api/userinfo/upload-cv",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setCvUploaded(true);
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="profile-section">
        <h2>User Profile</h2>
        
        {/* Display form if editing */}
        {isEditMode ? (
          <form onSubmit={handleSubmitProfile}>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Skills:</label>
              <input
                type="text"
                name="skills"
                value={userDetails.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={userDetails.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Education Level:</label>
              <input
                type="text"
                name="educationLevel"
                value={userDetails.educationLevel}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Education Field:</label>
              <input
                type="text"
                name="educationField"
                value={userDetails.educationField}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Work Experience:</label>
              <textarea
                name="workExperience"
                value={userDetails.workExperience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Professional Summary:</label>
              <textarea
                name="professionalSummary"
                value={userDetails.professionalSummary}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Submit Details</button>
          </form>
        ) : (
          <div>
            <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Skills:</strong> {userDetails.skills}</p>
            <p><strong>Location:</strong> {userDetails.location}</p>
            <p><strong>Education Level:</strong> {userDetails.educationLevel}</p>
            <p><strong>Education Field:</strong> {userDetails.educationField}</p>
            <p><strong>Work Experience:</strong> {userDetails.workExperience}</p>
            <p><strong>Professional Summary:</strong> {userDetails.professionalSummary}</p>
            <button onClick={() => setIsEditMode(true)}>Edit</button>
          </div>
        )}

        {/* CV Upload Section */}
        <div className="cv-upload-section">
          <h2>Upload CV</h2>

          {!cvUploaded ? (
            <form onSubmit={handleSubmitCV}>
              <div className="form-group">
                <label>Choose CV File (PDF, DOC, DOCX):</label>
                <input
                  type="file"
                  name="cvFile"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <button type="submit">Upload CV</button>
            </form>
          ) : (
            <p>CV uploaded successfully! <span>Done</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
