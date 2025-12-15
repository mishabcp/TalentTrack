import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Box } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useApp } from '../../context/AppContext';
import dayjs from 'dayjs';

const SchedulerView = () => {
    const { candidates } = useApp();
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const interviews = candidates.filter(c =>
        c.status === 'Interviewing' && c.interviewDate && dayjs(c.interviewDate).isSame(selectedDate, 'day')
    );

    return (
        <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
                <Card elevation={7} sx={{ borderRadius: 4, background: 'linear-gradient(120deg,#f7fafc 65%,#e1eeff 200%)', boxShadow: '0 8px 40px -15px #2563eb21', border: '1.5px solid #e7f0fe' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight:800, fontSize:22, letterSpacing:0.09, background:'linear-gradient(90deg,#1679ef 40%,#65ffe1 140%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Select Date</Typography>
                        <DateCalendar
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            sx={{ borderRadius:2.7, boxShadow:'0 2px 12px #f1f9ff;', background:'#fff', border:'1px solid #e5ecfa', mt: 2, p:1 }}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={8}>
                <Card elevation={7} sx={{ height: '100%', borderRadius: 4, background: 'linear-gradient(120deg,#f7fafc 60%,#eaf5fe 170%)', boxShadow: '0 8px 40px -15px #2563eb21', border: '1.5px solid #e7f0fe' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight:900, fontSize:23, letterSpacing:0.09, background:'linear-gradient(90deg,#1679ef 20%,#65ffe1 140%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                            Interviews for {selectedDate.format('MMMM D, YYYY')}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {interviews.length > 0 ? (
                            <List>
                                {interviews.map((interview) => (
                                    <ListItem key={interview.id} alignItems="flex-start" sx={{borderBottom:'1.5px solid #f0f6fa'}}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ background:'#caf0ff', color:'#0859aa', fontWeight:700 }}>{interview.name.charAt(0)}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={interview.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline', fontWeight:600, color:'#3778ff' }}
                                                        component="span"
                                                        variant="body2"
                                                    >
                                                        {dayjs(interview.interviewDate).format('h:mm A')}
                                                    </Typography>
                                                    {" — " + interview.role}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                                <Typography color="textSecondary">No interviews scheduled for this day.</Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SchedulerView;
