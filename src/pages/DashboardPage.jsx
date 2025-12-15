import React, { useMemo } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useApp } from '../context/AppContext';
import KPIcards from '../components/Dashboard/KPIcards';
import StatusChart from '../components/Dashboard/StatusChart';
import ActivityFeed from '../components/Dashboard/ActivityFeed';

const DashboardPage = () => {
  const { candidates, activity } = useApp();

  const stats = useMemo(() => {
    return {
      total: candidates.length,
      interviewing: candidates.filter((c) => c.status === 'Interviewing').length,
      offered: candidates.filter((c) => c.status === 'Offer').length,
      rejected: candidates.filter((c) => c.status === 'Rejected').length,
    };
  }, [candidates]);

  const chartData = useMemo(() => {
    const statusCounts = candidates.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));
  }, [candidates]);

  return (
    <Box sx={{ pt: 3, px: { xs: 0, md: 2 } }}>
      <Typography 
        variant="h2"
        gutterBottom 
        sx={{ 
          fontWeight: 900, mb: 4, fontSize: { xs: '2.3rem', sm: '2.9rem' },
          background:'linear-gradient(110deg,#1679ef 10%,#65ffe1 120%)',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor:'transparent',
          letterSpacing: 0.09,
          textShadow:'0 2px 18px #2679e126',
        }}>
        Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <KPIcards stats={stats} />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <StatusChart data={chartData} />
        </Grid>
        <Grid item xs={12} md={4}>
          <ActivityFeed activities={activity} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
