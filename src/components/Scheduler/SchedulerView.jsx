import React, { useState } from 'react';
import { 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    Divider, 
    Box,
    Chip
} from '@mui/material';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { useApp } from '../../context/AppContext';
import dayjs from 'dayjs';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const SchedulerView = () => {
    const { candidates } = useApp();
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // Get all dates with interviews
    const getInterviewDates = () => {
        const interviewDates = new Set();
        candidates
            .filter(c => c.status === 'Interviewing' && c.interviewDate)
            .forEach(c => {
                const dateStr = dayjs(c.interviewDate).format('YYYY-MM-DD');
                interviewDates.add(dateStr);
            });
        return interviewDates;
    };

    const interviews = candidates.filter(c =>
        c.status === 'Interviewing' && c.interviewDate && dayjs(c.interviewDate).isSame(selectedDate, 'day')
    );

    const interviewDates = getInterviewDates();
    const interviewCount = interviews.length;

    // Custom Day Component
    const CustomDay = (props) => {
        const { day, outsideCurrentMonth, selected, ...other } = props;
        const dateStr = day.format('YYYY-MM-DD');
        const hasInterview = interviewDates.has(dateStr);
        
        return (
            <PickersDay
                {...other}
                day={day}
                outsideCurrentMonth={outsideCurrentMonth}
                selected={selected}
                sx={{
                    width: 32,
                    height: 32,
                    fontSize: '0.8125rem',
                    fontWeight: hasInterview ? 600 : 400,
                    backgroundColor: hasInterview && !selected ? '#e0f2fe' : 'transparent',
                    border: hasInterview && !selected ? '1px solid #0ea5e9' : 
                           selected ? '1px solid #2563eb' : '1px solid transparent',
                    color: selected ? '#ffffff' : 
                          hasInterview ? '#0369a1' : 
                          outsideCurrentMonth ? '#cbd5e1' : '#475569',
                    '&:hover': {
                        backgroundColor: selected ? '#1d4ed8' : 
                                       hasInterview ? '#bae6fd' : '#f1f5f9',
                    },
                    position: 'relative',
                    '&::after': hasInterview && !selected ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        backgroundColor: '#0ea5e9'
                    } : {}
                }}
            />
        );
    };

    return (
        <Grid container spacing={3}>
            {/* Calendar Card - Left Side */}
            <Grid item xs={12} md={4}>
                <Card sx={{ 
                    borderRadius: 3, 
                    background: '#ffffff',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.08)',
                    border: '1px solid #e2e8f0',
                    height: '100%'
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <EventAvailableIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                            <Typography variant="h6" fontWeight={600} color="#1e293b">
                                Interview Calendar
                            </Typography>
                        </Box>
                        
                        <Box sx={{ 
                            borderRadius: 2, 
                            background: '#f8fafc', 
                            border: '1px solid #e2e8f0',
                            p: 1.5,
                            mb: 2
                        }}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                slots={{ day: CustomDay }}
                                sx={{
                                    '& .MuiPickersCalendarHeader-root': {
                                        marginBottom: 1,
                                    },
                                    '& .MuiPickersCalendarHeader-label': {
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: '#334155'
                                    },
                                    '& .MuiDayCalendar-weekContainer': {
                                        marginTop: 0.5,
                                    },
                                    '& .MuiPickersDay-today': {
                                        border: '1px solid #2563eb !important',
                                        backgroundColor: 'transparent',
                                        color: '#2563eb',
                                        '&.Mui-selected': {
                                            backgroundColor: '#2563eb',
                                            color: '#ffffff',
                                            border: '1px solid #2563eb !important'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        {/* Stats */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            bgcolor: '#f8fafc',
                            p: 1.5,
                            borderRadius: 2,
                            border: '1px solid #e2e8f0'
                        }}>
                            <Box>
                                <Typography variant="caption" color="#64748b" display="block">
                                    Selected Date
                                </Typography>
                                <Typography variant="subtitle2" fontWeight={600} color="#1e293b">
                                    {selectedDate.format('MMM D, YYYY')}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="#64748b" display="block">
                                    Interviews
                                </Typography>
                                <Typography variant="subtitle2" fontWeight={600} color="#2563eb">
                                    {interviewCount}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Legend */}
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" fontWeight={500} color="#64748b" display="block" mb={1}>
                                Legend
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box sx={{ 
                                        width: 12, 
                                        height: 12, 
                                        borderRadius: '50%', 
                                        bgcolor: '#e0f2fe',
                                        border: '1px solid #0ea5e9'
                                    }} />
                                    <Typography variant="caption" color="#475569">
                                        Interview
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box sx={{ 
                                        width: 12, 
                                        height: 12, 
                                        borderRadius: '50%', 
                                        bgcolor: 'transparent',
                                        border: '1px solid #2563eb'
                                    }} />
                                    <Typography variant="caption" color="#475569">
                                        Today
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            {/* Interviews List - Right Side */}
            <Grid item xs={12} md={8}>
                <Card sx={{ 
                    borderRadius: 3, 
                    background: '#ffffff',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.08)',
                    border: '1px solid #e2e8f0',
                    height: '100%'
                }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Box>
                                <Typography variant="h6" fontWeight={600} color="#1e293b">
                                    Scheduled Interviews
                                </Typography>
                                <Typography variant="body2" color="#64748b">
                                    {selectedDate.format('dddd, MMMM D, YYYY')}
                                </Typography>
                            </Box>
                            <Chip 
                                label={`${interviewCount} interview${interviewCount !== 1 ? 's' : ''}`}
                                color="primary"
                                size="small"
                                sx={{ fontWeight: 500 }}
                            />
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {interviewCount > 0 ? (
                            <List sx={{ p: 0 }}>
                                {interviews.map((interview, index) => (
                                    <React.Fragment key={interview.id}>
                                        <ListItem 
                                            alignItems="flex-start"
                                            sx={{ 
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor: index % 2 === 0 ? '#f8fafc' : 'transparent',
                                                '&:hover': {
                                                    bgcolor: '#f1f5f9'
                                                },
                                                transition: 'background-color 0.2s'
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar 
                                                    sx={{ 
                                                        bgcolor: '#e0f2fe',
                                                        color: '#0369a1',
                                                        fontWeight: 600,
                                                        width: 40,
                                                        height: 40
                                                    }}
                                                >
                                                    {interview.name.charAt(0)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
                                                            {interview.name}
                                                        </Typography>
                                                        <Chip 
                                                            label={interview.role}
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ 
                                                                height: 20,
                                                                fontSize: '0.7rem',
                                                                fontWeight: 500,
                                                                borderColor: '#cbd5e1',
                                                                color: '#475569'
                                                            }}
                                                        />
                                                    </Box>
                                                }
                                                secondary={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <AccessTimeIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                                            <Typography variant="body2" color="#475569" fontWeight={500}>
                                                                {dayjs(interview.interviewDate).format('h:mm A')}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <PersonIcon sx={{ fontSize: 16, color: '#64748b' }} />
                                                            <Typography variant="body2" color="#475569">
                                                                {interview.source}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Typography variant="caption" color="#64748b" display="block">
                                                    Applied
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500} color="#475569">
                                                    {dayjs(interview.appliedDate).format('MMM D')}
                                                </Typography>
                                            </Box>
                                        </ListItem>
                                        {index < interviews.length - 1 && (
                                            <Divider variant="inset" component="li" sx={{ borderColor: '#e2e8f0' }} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Box sx={{ 
                                textAlign: 'center', 
                                py: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <EventAvailableIcon sx={{ fontSize: 48, color: '#cbd5e1' }} />
                                <Box>
                                    <Typography variant="body1" fontWeight={500} color="#64748b" gutterBottom>
                                        No interviews scheduled
                                    </Typography>
                                    <Typography variant="body2" color="#94a3b8">
                                        Select a date with interviews to view details
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SchedulerView;