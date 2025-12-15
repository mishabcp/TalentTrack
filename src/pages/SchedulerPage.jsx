import React from 'react';
import { Typography, Box } from '@mui/material';
import SchedulerView from '../components/Scheduler/SchedulerView';

const SchedulerPage = () => {
    return (
        <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ mb: 4 }}>
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
                    Interview Availability
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Schedule and manage interview sessions
                </Typography>
            </Box>
            <SchedulerView />
        </Box>
    );
};

export default SchedulerPage;
