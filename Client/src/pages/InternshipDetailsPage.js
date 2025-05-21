import React from 'react';
import { useParams } from 'react-router-dom';
import InternshipDetail from '../components/internship/InternshipDetail';

const InternshipDetailPage = () => {
  const { id } = useParams();
  return <InternshipDetail id={id} />;
};

export default InternshipDetailPage;
