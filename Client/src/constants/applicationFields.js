// Basic fields that will appear in all applications
export const baseFields = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "address", label: "Address", type: "text" },
];

// Education-related fields with flat names, which match backend structure
export const educationFields = [
  { name: "educationLevel", label: "Education Level", type: "text", required: true },
  { name: "educationField", label: "Field of Study", type: "text", required: true },
  { name: "educationInstitution", label: "Institution", type: "text", required: true },
  { name: "educationGraduationYear", label: "Graduation Year", type: "number", required: true },
];

// Category-specific fields for each type of application
export const categorySpecificFields = {
  job: [
    { name: "motivation", label: "Why this Job?", type: "textarea" },
    { name: "workExperience", label: "Work Experience", type: "textarea", required: true },
  ],
  scholarship: [
    { name: "motivation", label: "Why this Scholarship?", type: "textarea", required: true },
    { name: "financialStatus", label: "Financial Status", type: "textarea", required: true },
  ],
  internship: [
    { name: "motivation", label: "Why this Internship?", type: "textarea", required: true },
    { name: "workExperience", label: "Work Experience", type: "textarea" },
  ],
};
