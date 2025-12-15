import React, { useState } from 'react';
import {
  Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Chip, Box, Paper, Snackbar, Alert, IconButton, Stack
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useApp } from '../context/AppContext';

const CandidateDatabasePage = () => {
    const { candidates, addCandidate, updateCandidateStatus, deleteCandidate } = useApp();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCandidate, setEditingCandidate] = useState(null);
    const [formState, setFormState] = useState({
        name: '',
        role: '',
        status: 'Applied',
        source: 'Direct',
        skills: [],
    });
    const [searchText, setSearchText] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [deleteId, setDeleteId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const openAddDialog = () => {
        setEditingCandidate(null);
        setFormState({ name: '', role: '', status: 'Applied', source: 'Direct', skills: [] });
        setIsDialogOpen(true);
    };
    const openEditDialog = (candidate) => {
        setEditingCandidate(candidate);
        setFormState({ ...candidate });
        setIsDialogOpen(true);
    };
    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setEditingCandidate(null);
        setFormState({ name: '', role: '', status: 'Applied', source: 'Direct', skills: [] });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };
    const handleSkillsChange = (e) => {
        setFormState(prev => ({ ...prev, skills: e.target.value }));
    };
    const handleSave = () => {
        // Some basic validation for demo
        if (!formState.name || !formState.role) {
            setSnackbar({ open: true, message: 'Name and role are required.', severity: 'error' });
            return;
        }
        const newCandidate = {
            ...formState,
            id: editingCandidate?.id || Date.now().toString(),
            appliedDate: editingCandidate?.appliedDate || new Date().toISOString().split('T')[0],
        };
        if (editingCandidate) {
            if (deleteCandidate) deleteCandidate(editingCandidate.id); // Replace by update if you have it
            addCandidate(newCandidate);
            setSnackbar({ open: true, message: 'Candidate updated', severity: 'success' });
        } else {
            addCandidate(newCandidate);
            setSnackbar({ open: true, message: 'Candidate added', severity: 'success' });
        }
        handleDialogClose();
    };
    const handleDeleteRequest = (id) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };
    const handleDeleteConfirm = () => {
        if (deleteCandidate) {
            deleteCandidate(deleteId);
            setSnackbar({ open: true, message: 'Candidate deleted', severity: 'success' });
        } else {
            setSnackbar({ open: true, message: 'Delete logic pending in context.', severity: 'warning' });
        }
        setDeleteDialogOpen(false);
        setDeleteId(null);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 180, flex: 1 },
        { field: 'role', headerName: 'Role', width: 170, flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            flex: 0.7,
            renderCell: params => (
                <Chip label={params.value} color={params.value === 'Applied' ? 'primary' : params.value === 'Interviewing' ? 'warning' : params.value === 'Offer' ? 'success' : params.value === 'Rejected' ? 'error' : 'default'} sx={{ borderRadius: 1.2 }} />
            )
        },
        { field: 'source', headerName: 'Source', width: 150, flex: 0.7 },
        {
            field: 'skills',
            headerName: 'Skills',
            width: 240, flex: 2,
            renderCell: params => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7 }}>
                    {(params.value || []).map(skill => <Chip label={skill} key={skill} color="info" size="small" sx={{ mr: .5, mb: .5 }} />)}
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 140,
            type: 'actions',
            getActions: (params) => [
                <IconButton color="primary" onClick={() => openEditDialog(params.row)} key="edit">
                    <EditIcon />
                </IconButton>,
                <IconButton color="error" onClick={() => handleDeleteRequest(params.row.id)} key="delete">
                    <DeleteIcon />
                </IconButton>,
            ],
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton color="primary" size="small" onClick={() => openEditDialog(params.row)}><EditIcon /></IconButton>
                    <IconButton color="error" size="small" onClick={() => handleDeleteRequest(params.row.id)}><DeleteIcon /></IconButton>
                </Stack>
            )
        },
    ];

    return (
        <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    gap: 2
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight={700} mb={.5}>
                        Candidate Database
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Chip label={`${candidates.length} active records`} color="success" size="small" sx={{ ml: 1 }} />
                    </Typography>
                </Box>
                <Stack direction={{ xs: 'column', md: 'row' }} gap={2} alignItems="center">
                    <TextField
                        variant="outlined"
                        placeholder="Search candidates..."
                        size="small"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: '#bfbfbf' }} />,
                            sx: { borderRadius: 2, width: 240 },
                        }}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<PersonAddIcon />}
                        onClick={openAddDialog}
                        sx={{ borderRadius: 2, fontWeight: 600, boxShadow: '0 2px 14px 0 rgba(24, 144, 255, 0.09)' }}
                    >
                        Add Candidate
                    </Button>
                </Stack>
            </Paper>

            <Paper sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <DataGrid
                    columns={columns}
                    rows={candidates.filter(c =>
                        c.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        c.role.toLowerCase().includes(searchText.toLowerCase())
                    )}
                    getRowId={row => row.id}
                    pageSize={10}
                    autoHeight
                    sx={{ borderRadius: 3, fontSize: 15, background: '#fff' }}
                />
            </Paper>

            <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>{editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Full Name" name="name" value={formState.name} onChange={handleFormChange} required size="large" fullWidth />
                        <TextField label="Role" name="role" value={formState.role} onChange={handleFormChange} required size="large" fullWidth />
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Select label="Status" name="status" value={formState.status} onChange={handleFormChange} fullWidth>
                                <MenuItem value="Applied">Applied</MenuItem>
                                <MenuItem value="Interviewing">Interviewing</MenuItem>
                                <MenuItem value="Offer">Offer</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </Select>
                            <Select label="Source" name="source" value={formState.source} onChange={handleFormChange} fullWidth>
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
                            placeholder="Type and press enter..."
                            fullWidth
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: .5 }}>
                                    {selected.map(skill => <Chip key={skill} label={skill} size="small" sx={{ mr: .5 }} />)}
                                </Box>
                            )}
                        >
                            {[...new Set([...(typeof formState.skills === 'string' ? formState.skills.split(',') : formState.skills)])]
                                .filter(skill => skill)
                                .map(skill => (
                                    <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                                ))}
                        </Select>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} variant="outlined">Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save Record</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete candidate?</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this candidate? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CandidateDatabasePage;
