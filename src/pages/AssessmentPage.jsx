import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, Slider, TextField, Chip, Divider, Select, MenuItem, Rating, FormControl, InputLabel } from '@mui/material';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { useApp } from '../context/AppContext';

const AssessmentPage = () => {
    const { candidates } = useApp();
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [evaluations, setEvaluations] = useState({
        technical: 3,
        communication: 4,
        culture: 4,
        problemSolving: 3,
        experience: 2
    });

    // Mock data for the chart based on selected candidate could go here
    const radarData = [
        { subject: 'Technical', A: evaluations.technical * 20, fullMark: 100 },
        { subject: 'Communication', A: evaluations.communication * 20, fullMark: 100 },
        { subject: 'Culture Fit', A: evaluations.culture * 20, fullMark: 100 },
        { subject: 'Problem Solving', A: evaluations.problemSolving * 20, fullMark: 100 },
        { subject: 'Experience', A: evaluations.experience * 20, fullMark: 100 },
    ];

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
                    Assessment Center
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Evaluate candidates using standardized 360° scorecards
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>Select Candidate</Typography>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Candidate</InputLabel>
                            <Select
                                label="Candidate"
                                value={selectedCandidate ? selectedCandidate.id : ''}
                                onChange={e => {
                                    const val = e.target.value;
                                    setSelectedCandidate(candidates.find(c => c.id === val) || null);
                                }}
                            >
                                {candidates.map(c => (
                                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedCandidate && (
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">{selectedCandidate.name}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>{selectedCandidate.role}</Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1, mb: 3 }}>
                                    {selectedCandidate.skills?.map(s => <Chip key={s} label={s} size="small" />)}
                                </Box>
                                <Divider />
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" gutterBottom>Notes</Typography>
                                    <TextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        placeholder="Enter private evaluation notes..."
                                        variant="filled"
                                        size="small"
                                    />
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 3 }}>Scorecard</Typography>
                            {[
                                { key: 'technical', label: 'Technical Proficiency' },
                                { key: 'communication', label: 'Communication Skills' },
                                { key: 'culture', label: 'Culture Fit & Values' },
                                { key: 'problemSolving', label: 'Problem Solving' },
                                { key: 'experience', label: 'Relevant Experience' },
                            ].map(criterion => (
                                <Box key={criterion.key} sx={{ mb: 3 }}>
                                    <Typography component="legend" variant="body2" color="text.secondary">{criterion.label}</Typography>
                                    <Rating
                                        value={evaluations[criterion.key]}
                                        onChange={(_, val) => setEvaluations(prev => ({ ...prev, [criterion.key]: val }))}
                                        size="large"
                                        max={5}
                                        sx={{ color: '#2563eb' }}
                                    />
                                </Box>
                            ))}
                            <Button 
                                variant="contained" 
                                size="large" 
                                fullWidth
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                    mt: 2,
                                }}
                            >
                                Submit Evaluation
                            </Button>
                        </Box>
                        <Box sx={{ flex: 1, height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ mb: 2 }}>Talent Radar</Typography>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                    <Radar name="Candidate Score" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AssessmentPage;
