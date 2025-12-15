import React from 'react';
import { 
    Typography,  // 📝 Material-UI: For styled text with gradient
    Box          // 📦 Material-UI: Layout container for responsive design
} from '@mui/material';
import SchedulerView from '../components/Scheduler/SchedulerView';

const SchedulerPage = () => {
    return (
        // 📦 Material-UI Box: Main page container with responsive padding
        <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
            {/* 🎯 Page header section */}
            <Box sx={{ mb: 4 }}>
                {/* 📝 Material-UI Typography: Gradient headline */}
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
                {/* 📝 Material-UI Typography: Secondary description text */}
                <Typography variant="body2" color="text.secondary">
                    Schedule and manage interview sessions
                </Typography>
            </Box>
            
            {/* 🗓️ Main scheduler component */}
            <SchedulerView />
        </Box>
    );
};

export default SchedulerPage;