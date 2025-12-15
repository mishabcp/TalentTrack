import React, { useMemo, useState } from 'react';
import { Box, Typography, Grid, Paper, useTheme, Chip, Avatar, Button as MUIButton, Stack, TextField } from '@mui/material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useApp } from '../context/AppContext';
import DataImportModal from '../components/DataImportModal';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CancelIcon from '@mui/icons-material/Cancel';

const StatCard = ({ title, value, subtitle, icon: Icon, color, gradient }) => (
    <Paper 
        sx={{ 
            p: 4, 
            height: '100%',
            borderRadius: 3,
            background: gradient || `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `1px solid ${color}20`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 24px ${color}25`,
                border: `1px solid ${color}40`,
            },
            '&::before': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
                borderRadius: '50%',
            }
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
                <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 1, fontSize: '0.875rem' }}>
                    {title}
                </Typography>
                <Typography variant="h3" fontWeight={800} sx={{ color: color, mb: 0.5 }}>
                    {value}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {subtitle}
                </Typography>
            </Box>
            <Avatar 
                sx={{ 
                    bgcolor: `${color}20`,
                    color: color,
                    width: 56,
                    height: 56,
                    boxShadow: `0 4px 12px ${color}30`
                }}
            >
                <Icon sx={{ fontSize: 28 }} />
            </Avatar>
        </Box>
    </Paper>
);

const ChartCard = ({ title, subtitle, children }) => (
    <Paper 
        sx={{ 
            p: 5, 
            height: 520, 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 3, 
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }
        }}
    >
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: '1.125rem', mb: 0.5 }}>
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            {children}
        </Box>
    </Paper>
);

const AnalyticsPage = () => {
    const theme = useTheme();
    const { candidates } = useApp();
    const [isImportVisible, setIsImportVisible] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);

    const analyticsData = useMemo(() => {
        // 1. Status counts
        const counts = { Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 };
        candidates.forEach(c => {
            if (counts[c.status] !== undefined) counts[c.status]++;
        });

        // 2. Funnel Data
        const totalApplied = candidates.length;
        const totalInterviewing = counts['Interviewing'] + counts['Offer'];
        const totalOffer = counts['Offer'];

        const funnel = [
            { name: 'Applied', value: totalApplied, fill: '#3b82f6' },
            { name: 'Interviewing', value: totalInterviewing, fill: '#8b5cf6' },
            { name: 'Offer', value: totalOffer, fill: '#10b981' },
        ];

        // 3. Sources Data
        const sourceCounts = {};
        candidates.forEach(c => {
            const src = c.source || 'Unknown';
            sourceCounts[src] = (sourceCounts[src] || 0) + 1;
        });
        const sources = Object.keys(sourceCounts)
            .map(key => ({ name: key, value: sourceCounts[key] }))
            .sort((a, b) => b.value - a.value);

        // 4. Status Distribution (for pie chart)
        const statusDistribution = [
            { name: 'Applied', value: counts.Applied, color: '#3b82f6' },
            { name: 'Interviewing', value: counts.Interviewing, color: '#8b5cf6' },
            { name: 'Offer', value: counts.Offer, color: '#10b981' },
            { name: 'Rejected', value: counts.Rejected, color: '#ef4444' },
        ].filter(item => item.value > 0);

        // 5. Conversion rates
        const conversionRate = totalApplied > 0 ? ((totalOffer / totalApplied) * 100).toFixed(1) : 0;
        const interviewRate = totalApplied > 0 ? ((totalInterviewing / totalApplied) * 100).toFixed(1) : 0;

        return { 
            funnel, 
            sources, 
            statusDistribution, 
            counts, 
            conversionRate, 
            interviewRate 
        };
    }, [candidates]);

    const SOURCE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <Box
                    sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.98)',
                        p: 2,
                        borderRadius: 2,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        border: '1px solid rgba(0,0,0,0.08)',
                    }}
                >
                    <Typography variant="body2" fontWeight={700} sx={{ mb: 0.5 }}>
                        {payload[0].name}
                    </Typography>
                    <Typography variant="h6" fontWeight={800} color="primary">
                        {payload[0].value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        candidates
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box sx={{ 
            width: '100%', 
            maxWidth: '100%', 
            px: { xs: 2, sm: 2, md: 3 }, 
            mx: 0,
            margin: 0,
            display: 'block',
            boxSizing: 'border-box',
            minWidth: 0,
        }}>
            {/* Header Section */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 5,
                flexWrap: 'wrap',
                gap: 2
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
                        Analytics Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                            label={`${candidates.length} Active Candidates`} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                        />
                        Real-time recruitment insights
                    </Typography>
                </Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} alignItems="center">
                    <MUIButton
                        size="large"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => setIsImportVisible(true)}
                        sx={{ 
                            borderRadius: 2,
                            height: 44,
                            fontWeight: 600,
                            background: 'linear-gradient(110deg,#318cff,#19e0c4 100%)',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        Import Data
                    </MUIButton>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            startText="Start Date"
                            endText="End Date"
                            value={dateRange}
                            onChange={setDateRange}
                            renderInput={(startProps, endProps) => (
                                <Stack direction="row" spacing={2}>
                                    <TextField {...startProps} size="small" sx={{ borderRadius: 2, width: 140 }} />
                                    <TextField {...endProps} size="small" sx={{ borderRadius: 2, width: 140 }} />
                                </Stack>
                            )}
                            sx={{ borderRadius: 2, height: 44 }}
                        />
                    </LocalizationProvider>
                </Stack>
            </Box>

            <DataImportModal visible={isImportVisible} onCancel={() => setIsImportVisible(false)} />

            {/* Stats Cards */}
            <Grid container spacing={4} sx={{ mb: 5, maxWidth: '100%', width: '100%' }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Applicants"
                        value={candidates.length}
                        subtitle={`+${analyticsData.counts.Applied} new`}
                        icon={PeopleAltIcon}
                        color="#3b82f6"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="In Progress"
                        value={analyticsData.counts.Interviewing}
                        subtitle={`${analyticsData.interviewRate}% of total`}
                        icon={TrendingUpIcon}
                        color="#8b5cf6"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Offers Sent"
                        value={analyticsData.counts.Offer}
                        subtitle={`${analyticsData.conversionRate}% conversion`}
                        icon={LocalOfferIcon}
                        color="#10b981"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Rejected"
                        value={analyticsData.counts.Rejected}
                        subtitle="Not a fit"
                        icon={CancelIcon}
                        color="#ef4444"
                    />
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={4} sx={{ maxWidth: '100%', width: '100%' }}>
                {/* Conversion Funnel */}
                <Grid item xs={12} lg={8}>
                    <ChartCard 
                        title="Pipeline Conversion Funnel" 
                        subtitle="Track candidate progression through hiring stages"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData.funnel} margin={{ top: 20, right: 40, left: 10, bottom: 30 }}>
                                <defs>
                                    <linearGradient id="colorFunnel" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 13, fontWeight: 600, fill: '#64748b' }} 
                                    dy={10} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                />
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorFunnel)"
                                    animationDuration={1200}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </Grid>

                {/* Status Distribution Pie Chart */}
                <Grid item xs={12} lg={4}>
                    <ChartCard 
                        title="Status Distribution" 
                        subtitle="Current pipeline breakdown"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analyticsData.statusDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationDuration={1200}
                                >
                                    {analyticsData.statusDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </Grid>

                {/* Source Efficiency Bar Chart */}
                <Grid item xs={12}>
                    <ChartCard 
                        title="Top Candidate Sources" 
                        subtitle="Performance by recruitment channel"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                                data={analyticsData.sources} 
                                layout="vertical" 
                                margin={{ top: 20, right: 40, left: 120, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#e5e7eb" />
                                <XAxis 
                                    type="number" 
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={90}
                                    tick={{ fontSize: 13, fontWeight: 600, fill: '#64748b' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Bar 
                                    dataKey="value" 
                                    radius={[0, 8, 8, 0]} 
                                    barSize={42} 
                                    animationDuration={1200}
                                >
                                    {analyticsData.sources.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} 
                                        />
                                    ))}
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