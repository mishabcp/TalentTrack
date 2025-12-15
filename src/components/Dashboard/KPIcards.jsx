import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const KPIcards = ({ stats }) => {
    const cards = [
        { title: 'Total Applications', value: stats.total, icon: <PeopleIcon fontSize="large" color="primary" />, color: 'primary.main' },
        { title: 'Interviewing', value: stats.interviewing, icon: <ScheduleIcon fontSize="large" color="warning" />, color: 'warning.main' },
        { title: 'Offers Accepted', value: stats.offered, icon: <CheckCircleIcon fontSize="large" color="success" />, color: 'success.main' },
        { title: 'Rejected', value: stats.rejected, icon: <CancelIcon fontSize="large" color="error" />, color: 'error.main' },
    ];

    return (
        <Grid container spacing={4} sx={{mx:0}}>
            {cards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                        elevation={6}
                        sx={{
                            height: '100%',
                            borderRadius: 2,
                            background: 'linear-gradient(120deg, #f7fafc 60%, #e7f3fe 140%)',
                            boxShadow: '0 8px 40px -15px #2563eb15',
                            border: '1.5px solid #e5eaf5',
                            p:0,
                            position: 'relative',
                            my:1
                        }}
                    >
                        <CardContent sx={{p:3.2}}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="textSecondary" gutterBottom variant="subtitle2" sx={{ fontWeight:700, fontSize:18, letterSpacing:0.1 }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h2" component="div" sx={{ color: card.color, fontWeight:'900', fontSize:'2.7rem', mt:0.3, mb:0.1, letterSpacing:0.6, textShadow:'0 2px 16px #c5d3f8', background:'linear-gradient(92deg,#1679ef,#47e086 80%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                                        {card.value}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    background:'linear-gradient(120deg,#dfeafe 40%,#b7dbfd 120%)',
                                    borderRadius:'50%',
                                    p:1.2,
                                    display:'flex',alignItems:'center',justifyContent:'center',
                                    boxShadow:'0 4px 18px #1679ef28',
                                    mr:0
                                }}>
                                    {card.icon}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default KPIcards;
