import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MUIButton, TextField, Select as MUISelect, MenuItem, InputLabel, FormControl } from '@mui/material';

const JobFormModal = ({ visible, onCancel, onSave, initialValues }) => {
    const [formState, setFormState] = React.useState(initialValues || {
        title: '',
        department: '',
        status: 'Open',
        description: '',
        applicants: 0,
    });

    React.useEffect(() => {
        if (visible) {
            setFormState(initialValues || {
                title: '',
                department: '',
                status: 'Open',
                description: '',
                applicants: 0,
            });
        }
    }, [visible, initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Basic validation
        if (!formState.title || !formState.department || !formState.status) return;
        onSave(formState);
        setFormState({ title: '', department: '', status: 'Open', description: '', applicants: 0 });
    };

    return (
        <Dialog open={visible} onClose={onCancel} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, px:2 } }}>
            <DialogTitle>
                <span style={{fontWeight:900, fontSize:22, background:'linear-gradient(90deg,#2a63dd,#65ffe1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                    {initialValues ? 'Edit Job' : 'Create New Job'}
                </span>
            </DialogTitle>
            <DialogContent sx={{ pt: 1, background:'#fbfcfe' }}>
                <TextField
                    label="Job Title"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    fullWidth
                    size="large"
                    sx={{ mb: 3, borderRadius: 1 }}
                    InputProps={{ sx: { borderRadius: 2, fontWeight: 700, padding: '7.5px 13px' } }}
                    required
                />
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Department</InputLabel>
                    <MUISelect
                        label="Department"
                        name="department"
                        value={formState.department}
                        onChange={handleChange}
                        size="large"
                        sx={{ borderRadius: 1 }}
                        required
                    >
                        <MenuItem value="Engineering">Engineering</MenuItem>
                        <MenuItem value="Design">Design</MenuItem>
                        <MenuItem value="Product">Product</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                    </MUISelect>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Status</InputLabel>
                    <MUISelect
                        label="Status"
                        name="status"
                        value={formState.status}
                        onChange={handleChange}
                        size="large"
                        sx={{ borderRadius: 1 }}
                        required
                    >
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                        <MenuItem value="Draft">Draft</MenuItem>
                    </MUISelect>
                </FormControl>
                <TextField
                    label="Description (Optional)"
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    multiline
                    minRows={3}
                    fullWidth
                    sx={{ borderRadius: 1, mb: 2 }}
                    InputProps={{ sx: { borderRadius: 2 } }}
                />
            </DialogContent>
            <DialogActions sx={{ pb: 2, gap: 2, borderTop: '1px solid #f4f7fb' }}>
                <MUIButton
                    onClick={onCancel}
                    variant="outlined"
                    sx={{ fontWeight: 600, borderRadius: 2, minWidth: 92 }}
                >
                    Cancel
                </MUIButton>
                <MUIButton
                    onClick={handleSave}
                    variant="contained"
                    sx={{ fontWeight: 800, borderRadius: 2, minWidth: 92,
                    background:'linear-gradient(110deg,#318cff,#19e0c4 100%)', boxShadow:'0 2px 9px #3bcfff11' }}
                >
                    Save
                </MUIButton>
            </DialogActions>
        </Dialog>
    );
};

export default JobFormModal;
