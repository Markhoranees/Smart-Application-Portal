import React from 'react';
import { useParams } from 'react-router-dom';
import JobDetail from '../components/jobs/JobDetail';

const JobDetailPage = () => {
  const { id } = useParams();
  return <JobDetail id={id} />;
};

export default JobDetailPage;
