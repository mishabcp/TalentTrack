import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button, Chip, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';

const JobList = ({ jobs }) => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={4} sx={{ mt:1, mb: 3 }}>
            {jobs.map((job) => (
                <Grid item xs={12} md={6} lg={4} key={job.id}>
                    <Card
                        elevation={4}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2,
                            boxShadow: '0 8px 36px -12px #3c5da933',
                            border: '1.5px solid #e3f0ff',
                            transition: 'box-shadow 0.25s, border 0.15s',
                            '&:hover': {
                                border: '2px solid #85c7ff',
                                boxShadow: '0 12px 38px -6px #68d0ffaa',
                            },
                            background: 'linear-gradient(133deg,#f9fbfe 80%,#e3f0ff 180%)',
                            pb: 1
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                                <Typography variant="h6" component="div" sx={{fontWeight:800, background:'linear-gradient(90deg,#3781ff,#22e0cc 80%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
                                    {job.title}
                                </Typography>
                                {job.status === 'Open' ? (
                                    <Chip label="Open" color="success" size="small" sx={{ fontWeight:700, boxShadow:'0 4px 14px -4px #2efba926', letterSpacing:'.1em', borderRadius:2, px:2 }} />
                                ) : (
                                    <Chip label="Closed" color="default" size="small" sx={{ fontWeight:700, boxShadow:'0 1.5px 7px -2px #385f8232', borderRadius:2, px:2 }} />
                                )}
                            </Box>
                            <Typography color="textSecondary" gutterBottom display="flex" alignItems="center">
                                <WorkIcon fontSize="small" sx={{ mr: 1, color: '#376bb5', opacity: 0.85 }} /> {job.department}
                            </Typography>
                            <Typography variant="body2" sx={{color:'#0b2137', fontWeight:600, mt:1, mb:1}}>
                                Applicants: {job.applicants}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                size="medium" 
                                onClick={() => navigate('/candidates')} 
                                sx={{ 
                                    textTransform: 'none',
                                    borderRadius:2,
                                    px:3,
                                    background:'linear-gradient(90deg,#3778ff,#65ffe1 160%)',
                                    color: '#fff', fontWeight:700,
                                    boxShadow:'0 2px 9px #3bcfff11',
                                    '&:hover': { background:'linear-gradient(90deg,#65ffe1,#3778ff 160%)' },
                                }}
                            >
                                View Details
                            </Button>
                            <Button 
                                size="medium" 
                                color="primary" 
                                onClick={() => navigate('/candidates')} 
                                sx={{ 
                                    textTransform: 'none',
                                    borderRadius:2,
                                    px:3,
                                    background:'linear-gradient(90deg,#4eefdf 30%,#3778ff 100%)',
                                    color: '#fff', fontWeight:700,
                                    boxShadow:'0 2px 9px #3bcfff11',
                                    ml:1,
                                    '&:hover': { background:'linear-gradient(90deg,#3778ff 10%,#4eefdf 90%)' },
                                }}
                            >
                                Manage Candidates
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default JobList;
