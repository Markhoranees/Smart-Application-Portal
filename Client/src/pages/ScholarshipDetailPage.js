import React from 'react';
import { useParams } from 'react-router-dom';
import ScholarshipDetail from '../components/scholarships/ScholarshipDetail';

const ScholarshipDetailPage = () => {
  const { id } = useParams(); // Extract ID from URL

  return <ScholarshipDetail id={id} />;
};

export default ScholarshipDetailPage;
