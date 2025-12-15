import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Divider, TextField, Select, MenuItem, Snackbar, Alert, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const DataEntryPage = () => {
    const { addCandidate } = useApp();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '',
        role: '',
        status: 'Applied',
        source: 'Direct',
        skills: [],
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleFormChange = e => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };
    const handleSkillsChange = (e) => {
        setFormState(prev => ({ ...prev, skills: e.target.value }));
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (!formState.name || !formState.role) {
            setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
            return;
        }
        const newCandidate = {
            ...formState,
            appliedDate: new Date().toISOString().split('T')[0],
        };
        addCandidate(newCandidate);
        setSnackbar({ open: true, message: `Added ${formState.name} to database`, severity: 'success' });
        setFormState({ name: '', role: '', status: 'Applied', source: 'Direct', skills: [] });
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/analytics')} sx={{ mb: 2 }}>
                Back to Analytics
            </Button>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Manual Candidate Entry
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Rapidly add candidates to the system one by one.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3} mb={2}>
                        <TextField
                            name="name"
                            label="Full Name"
                            value={formState.name}
                            onChange={handleFormChange}
                            required
                        />
                        <TextField
                            name="role"
                            label="Applied Role"
                            value={formState.role}
                            onChange={handleFormChange}
                            required
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Select
                                name="status"
                                value={formState.status}
                                onChange={handleFormChange}
                                label="Status"
                                required
                                sx={{ minWidth: 180 }}
                            >
                                <MenuItem value="Applied">Applied</MenuItem>
                                <MenuItem value="Interviewing">Interviewing</MenuItem>
                                <MenuItem value="Offer">Offer</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                            <Select
                                name="source"
                                value={formState.source}
                                onChange={handleFormChange}
                                label="Source"
                                required
                                sx={{ minWidth: 180 }}
                            >
                                <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                                <MenuItem value="Referral">Referral</MenuItem>
                                <MenuItem value="Agency">Agency</MenuItem>
                                <MenuItem value="Career Site">Career Site</MenuItem>
                                <MenuItem value="Direct">Direct</MenuItem>
                            </Select>
                        </Stack>
                        <Select
                            multiple
                            label="Skills"
                            value={formState.skills}
                            name="skills"
                            onChange={handleSkillsChange}
                            fullWidth
                            displayEmpty
                            renderValue={selected => selected.length ? selected.join(', ') : 'Type and press enter...'}
                        >
                            {(formState.skills && Array.isArray(formState.skills) ? formState.skills : []).map(skill => (
                                <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                    <Divider sx={{ my: 3 }} />
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            startIcon={<SaveIcon />}
                        >
                            Save & Add Next
                        </Button>
                        <Button onClick={() => setFormState({ name: '', role: '', status: 'Applied', source: 'Direct', skills: [] })}>
                            Clear Form
                        </Button>
                    </Stack>
                </form>
            </Paper>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default DataEntryPage;
