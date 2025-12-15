import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useApp } from '../context/AppContext';
import JobList from '../components/Jobs/JobList';
import JobFormModal from '../components/Jobs/JobFormModal';

const JobsPage = () => {
  const { jobs, addJob } = useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddJob = () => {
    setIsModalVisible(true);
  };

  const handleSaveJob = (values) => {
    addJob(values);
    setIsModalVisible(false);
  };

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Box>
          <Typography 
            variant="h4" 
            fontWeight={800} 
            sx={{ 
              mb: 1, 
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}
          >
            Jobs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage job postings and openings
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddJob}
          sx={{ 
            textTransform: 'none',
            borderRadius: 2,
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
        >
          Post Job
        </Button>
      </Box>
      <JobList jobs={jobs} />
      <JobFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSaveJob}
      />
    </Box>
  );
};

export default JobsPage;
