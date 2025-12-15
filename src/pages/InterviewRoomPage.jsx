import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Paper, Divider, Checkbox, FormControlLabel, TextField, Button, Chip, Rating } from '@mui/material';
import { useApp } from '../context/AppContext';
import { questionBank } from '../data/questionBank';

const InterviewRoomPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { candidates, addActivity, updateCandidateStatus } = useApp();
    const [candidate, setCandidate] = useState(null);
    const [notes, setNotes] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        const found = candidates.find(c => c.id.toString() === id);
        if (found) {
            setCandidate(found);
        }
    }, [id, candidates]);

    if (!candidate) return <Typography>Loading candidate...</Typography>;

    const roleQuestions = questionBank[candidate.role] || questionBank['default'];
    const generalQuestions = questionBank['default'];

    // Merge general questions if not already included (simple check)
    const allQuestions = roleQuestions === generalQuestions ? roleQuestions : [...generalQuestions, ...roleQuestions];

    const handleFinish = () => {
        // Here we would save the interview data
        addActivity('Interviewer', 'completed interview with', candidate.name);

        // Auto-suggest next step based on score (mock logic)
        if (score >= 4) {
            updateCandidateStatus(candidate.id, 'Offer');
        } else {
            updateCandidateStatus(candidate.id, 'Rejected');
        }

        navigate('/candidates');
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold">
                    Interview Room
                </Typography>
                <Button variant="contained" color="error" onClick={handleFinish}>
                    End Interview
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                {/* Left Panel: Candidate Profile */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: '100%', bgcolor: 'background.paper' }}>
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Typography variant="h5" fontWeight="bold">{candidate.name}</Typography>
                            <Typography color="text.secondary" gutterBottom>{candidate.role}</Typography>
                            <Chip label={candidate.status} color="primary" size="small" />
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Skills</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                            {candidate.skills?.map(skill => (
                                <Chip key={skill} label={skill} size="small" variant="outlined" />
                            ))}
                        </Box>

                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Overall Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={score}
                            onChange={(event, newValue) => {
                                setScore(newValue);
                            }}
                            size="large"
                        />
                    </Paper>
                </Grid>

                {/* Right Panel: Active Interview */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
                        <Typography variant="h6" gutterBottom>Question Bank</Typography>
                        <Box sx={{ mb: 4 }}>
                            {allQuestions.map(q => (
                                <Box key={q.id} sx={{ mb: 2, p: 2, border: '1px solid #f0f0f0', borderRadius: 2 }}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={<Typography fontWeight={500}>{q.question}</Typography>}
                                    />
                                    <TextField
                                        fullWidth
                                        placeholder="Candidate's answer / notes..."
                                        variant="standard"
                                        size="small"
                                        sx={{ mt: 1, ml: 4 }}
                                    />
                                </Box>
                            ))}
                        </Box>

                        <Typography variant="h6" gutterBottom>General Notes</Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Type overall impressions here..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            variant="outlined"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InterviewRoomPage;
