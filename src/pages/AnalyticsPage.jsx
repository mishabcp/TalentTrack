import React, { useMemo, useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Chip, 
  Button as MUIButton, 
  Stack,
  Card,
  CardContent,
  TextField
} from '@mui/material';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useApp } from '../context/AppContext';
import DataImportModal from '../components/DataImportModal';

const StatCard = ({ title, value, subtitle, icon: Icon, gradient, trend }) => (
  <Card 
    elevation={0}
    sx={{ 
      height: '100%',
      background: gradient,
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
        transform: 'translate(30%, -30%)',
      }
    }}
  >
    <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.9,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontSize: '0.75rem'
            }}
          >
            {title}
          </Typography>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              p: 1,
              display: 'flex',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Icon sx={{ fontSize: 24 }} />
          </Box>
        </Stack>
        
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}
        >
          {value}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.9,
              fontSize: '0.875rem'
            }}
          >
            {subtitle}
          </Typography>
          {trend && (
            <Chip 
              label={trend}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 20,
                backdropFilter: 'blur(10px)'
              }}
            />
          )}
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

const ChartCard = ({ title, subtitle, children, height = 400, action }) => (
  <Card 
    elevation={0}
    sx={{ 
      height: '100%',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: 'primary.main',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }
    }}
  >
    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              fontSize: '1.125rem',
              mb: 0.5,
              color: 'text.primary'
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.875rem'
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {action}
      </Stack>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {children}
      </Box>
    </CardContent>
  </Card>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={8}
        sx={{
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5}>
          {payload[0].name}
        </Typography>
        <Typography variant="h6" fontWeight={700} color="primary.main">
          {payload[0].value} candidates
        </Typography>
      </Paper>
    );
  }
  return null;
};

const StatusPieChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Paper
        elevation={8}
        sx={{
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          minWidth: 180
        }}
      >
        <Typography variant="body2" fontWeight={600} color="text.primary" mb={1}>
          {data.name}
        </Typography>
        <Typography variant="h5" fontWeight={700} sx={{ color: data.payload.fill, mb: 0.5 }}>
          {data.value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          candidates in pipeline
        </Typography>
      </Paper>
    );
  }
  return null;
};

const AnalyticsPage = () => {
  const { candidates } = useApp();
  const [isImportVisible, setIsImportVisible] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  const analyticsData = useMemo(() => {
    const counts = { Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 };
    candidates.forEach(c => {
      if (counts[c.status] !== undefined) counts[c.status]++;
    });

    const totalApplied = candidates.length;
    const totalInterviewing = counts['Interviewing'] + counts['Offer'];
    const totalOffer = counts['Offer'];

    const funnel = [
      { name: 'Applied', value: totalApplied, fill: '#3b82f6' },
      { name: 'Interviewing', value: totalInterviewing, fill: '#8b5cf6' },
      { name: 'Offer', value: totalOffer, fill: '#10b981' },
    ];

    const sourceCounts = {};
    candidates.forEach(c => {
      const src = c.source || 'Unknown';
      sourceCounts[src] = (sourceCounts[src] || 0) + 1;
    });

    const sources = Object.keys(sourceCounts)
      .map(key => ({ name: key, value: sourceCounts[key] }))
      .sort((a, b) => b.value - a.value);

    const statusDistribution = [
      { name: 'Applied', value: counts.Applied, color: '#3b82f6' },
      { name: 'Interviewing', value: counts.Interviewing, color: '#8b5cf6' },
      { name: 'Offer', value: counts.Offer, color: '#10b981' },
      { name: 'Rejected', value: counts.Rejected, color: '#ef4444' },
    ].filter(item => item.value > 0);

    const conversionRate = totalApplied > 0 ? ((totalOffer / totalApplied) * 100).toFixed(1) : 0;
    const interviewRate = totalApplied > 0 ? ((totalInterviewing / totalApplied) * 100).toFixed(1) : 0;

    return { funnel, sources, statusDistribution, counts, conversionRate, interviewRate };
  }, [candidates]);

  return (
    <Box sx={{ p: 4, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={4}
        sx={{
          pb: 3,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800,
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5
            }}
          >
            Analytics Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
            Real-time recruitment insights and performance metrics
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              slotProps={{
                textField: {
                  size: "small",
                  sx: { 
                    minWidth: 240,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: 'white'
                    }
                  }
                }
              }}
            />
          </LocalizationProvider>
          
          <MUIButton
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => setIsImportVisible(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
              }
            }}
          >
            Import Data
          </MUIButton>
        </Stack>
      </Stack>

      <DataImportModal open={isImportVisible} onClose={() => setIsImportVisible(false)} />

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Candidates"
            value={candidates.length}
            subtitle="In pipeline"
            icon={PeopleAltIcon}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            trend="+12%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Interviews"
            value={analyticsData.counts.Interviewing}
            subtitle="In progress"
            icon={AccessTimeIcon}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            trend="+8%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Offers Extended"
            value={analyticsData.counts.Offer}
            subtitle="Pending acceptance"
            icon={LocalOfferIcon}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            trend="+5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Conversion Rate"
            value={`${analyticsData.conversionRate}%`}
            subtitle="Applied to offer"
            icon={TrendingUpIcon}
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            trend="+2.3%"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Funnel Chart */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Recruitment Funnel"
            subtitle="Candidate progression through stages"
            height={400}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.funnel}>
                <defs>
                  <linearGradient id="colorFunnel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#667eea" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorFunnel)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Status Pie Chart */}
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Status Distribution"
            subtitle="Current pipeline breakdown"
            height={400}
          >
            <ResponsiveContainer width="100%" height="60%">
              <PieChart>
                <Pie
                  data={analyticsData.statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  dataKey="value"
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {analyticsData.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<StatusPieChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <Stack spacing={1.5} mt={3}>
              {analyticsData.statusDistribution.map((status) => {
                const total = analyticsData.statusDistribution.reduce((sum, item) => sum + item.value, 0);
                const percentage = total > 0 ? ((status.value / total) * 100).toFixed(1) : 0;
                return (
                  <Stack 
                    key={status.name} 
                    direction="row" 
                    alignItems="center" 
                    spacing={2}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: `${status.color}10`,
                      border: `1px solid ${status.color}20`,
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        backgroundColor: status.color,
                        flexShrink: 0
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      fontWeight={600}
                      sx={{ flex: 1, color: 'text.primary' }}
                    >
                      {status.name}
                    </Typography>
                    <Chip 
                      label={`${status.value} (${percentage}%)`}
                      size="small"
                      sx={{ 
                        fontWeight: 600,
                        backgroundColor: `${status.color}20`,
                        color: status.color,
                        border: 'none'
                      }}
                    />
                  </Stack>
                );
              })}
            </Stack>
          </ChartCard>
        </Grid>

        {/* Source Performance */}
        <Grid item xs={12}>
          <ChartCard
            title="Source Performance"
            subtitle="Candidate sources ranked by volume"
            height={400}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.sources} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis 
                  type="number" 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={120}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {analyticsData.sources.map((entry, index) => {
                    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;