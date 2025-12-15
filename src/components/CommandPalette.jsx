import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, Box, Typography, Slide, Autocomplete, TextField, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useApp } from '../context/AppContext';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const CommandPalette = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { candidates, jobs } = useApp();
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const flatOptions = [
        ...[
            { label: 'Dashboard', value: '/', type: 'page', group: 'Pages' },
            { label: 'Candidates Board', value: '/candidates', type: 'page', group: 'Pages' },
            { label: 'Job Listings', value: '/jobs', type: 'page', group: 'Pages' },
            { label: 'Interview Scheduler', value: '/scheduler', type: 'page', group: 'Pages' },
        ],
        ...candidates.map(c => ({ label: c.name, value: c.id, type: 'candidate', group: 'Candidates' })),
        ...jobs.map(j => ({ label: j.title, value: j.id, type: 'job', group: 'Jobs' })),
    ];

    const handleSelect = (e, option) => {
        setOpen(false);
        if (!option) return;
        if (option.type === 'page') navigate(option.value);
        else if (option.type === 'candidate') navigate('/candidates');
        else if (option.type === 'job') navigate('/jobs');
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    position: 'fixed',
                    top: 50,
                    borderRadius: 3,
                    bgcolor: 'background.paper/80',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 24,
                    backgroundImage: 'none',
                }
            }}
        >
            <DialogContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                    <SearchIcon color="action" />
                    <Typography variant="subtitle1" color="text.secondary">Command Palette</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="caption" sx={{ border: '1px solid #ccc', borderRadius: 1, px: 0.5 }}>
                        Esc
                    </Typography>
                </Box>
                <Autocomplete
                    blurOnSelect
                    autoHighlight
                    clearOnEscape
                    fullWidth
                    openOnFocus
                    autoSelect
                    groupBy={option => option.group}
                    options={flatOptions}
                    getOptionLabel={option => option.label}
                    value={null}
                    onChange={handleSelect}
                    inputValue={searchTerm}
                    onInputChange={(_, val) => setSearchTerm(val)}
                    renderInput={params => (
                        <TextField {...params} placeholder="Type a command or search..." variant="outlined" autoFocus />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" {...props} sx={{ px: 2, py: 1, fontWeight: 600 }}>
                            {option.label}
                        </Box>
                    )}
                    ListboxProps={{ style: { maxHeight: 300 } }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CommandPalette;
