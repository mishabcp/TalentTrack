
import React, { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select as MUISelect, MenuItem, FormControl, InputLabel, Button as MUIButton
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useApp } from '../../context/AppContext';

const CandidateFormModal = ({ visible, onCancel, onSave, initialValues }) => {
    const { jobs } = useApp();
    const [formState, setFormState] = React.useState({
        name: '',
        role: '',
        status: 'Applied',
        interviewDate: null,
    });

    React.useEffect(() => {
        if (visible) {
            setFormState({
                name: initialValues?.name || '',
                role: initialValues?.role || '',
                status: initialValues?.status || 'Applied',
                interviewDate: initialValues?.interviewDate ? dayjs(initialValues.interviewDate) : null,
            });
        }
    }, [visible, initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (val) => {
        setFormState((prev) => ({ ...prev, interviewDate: val }));
    };

    const handleSave = () => {
        if (!formState.name || !formState.role || !formState.status) return;
        const values = {
            ...formState,
            interviewDate: formState.interviewDate ? formState.interviewDate.toISOString() : null,
        };
        onSave(values);
    };

    return (
        <Dialog open={visible} onClose={onCancel} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
            <DialogTitle>
                <span style={{ fontWeight:800,fontSize:22,letterSpacing:0.3,background:'linear-gradient(97deg,#2baaff,#8aeaed 80%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>
                    {initialValues ? "Edit Candidate" : "Add Candidate"}
                </span>
            </DialogTitle>
            <DialogContent sx={{ pt: 2, background:'#fbfcfe' }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 3 }}
                    required
                />
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Role</InputLabel>
                    <MUISelect
                        label="Role"
                        name="role"
                        value={formState.role}
                        onChange={handleChange}
                        required
                    >
                        {jobs.map(job => <MenuItem key={job.id} value={job.title}>{job.title}</MenuItem>)}
                    </MUISelect>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Status</InputLabel>
                    <MUISelect
                        label="Status"
                        name="status"
                        value={formState.status}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Applied">Applied</MenuItem>
                        <MenuItem value="Interviewing">Interviewing</MenuItem>
                        <MenuItem value="Offer">Offer</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                    </MUISelect>
                </FormControl>
                {formState.status === 'Interviewing' && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Interview Date"
                            value={formState.interviewDate}
                            onChange={handleDateChange}
                            renderInput={(props) => <TextField {...props} fullWidth sx={{ mb: 2 }} />}
                        />
                    </LocalizationProvider>
                )}
            </DialogContent>
            <DialogActions sx={{ pb: 2, gap: 2, borderTop: '1.5px solid #f2f6fa' }}>
                <MUIButton onClick={onCancel} variant="outlined" sx={{ fontWeight:600, borderRadius: 2, minWidth: 92 }}>Cancel</MUIButton>
                <MUIButton onClick={handleSave} variant="contained" sx={{ fontWeight:800,borderRadius:2,minWidth:92,background:'linear-gradient(110deg,#318cff,#19e0c4 100%)',boxShadow:'0 2px 9px #3bcfff11' }}>Save</MUIButton>
            </DialogActions>
        </Dialog>
    );
};

export default CandidateFormModal;
