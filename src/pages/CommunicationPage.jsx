import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, Divider, Paper, Tab, Tabs, Grid, Autocomplete, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import { useApp } from '../context/AppContext';

const mockInbox = [
    { id: 1, from: 'Alice Johnson', subject: 'Re: Interview Availability', time: '10:30 AM', preview: 'I am available on Tuesday and Wednesday...' },
    { id: 2, from: 'Bob Smith', subject: 'Question about the coding challenge', time: 'Yesterday', preview: 'Could you clarify the requirements for...' },
];

const CommunicationPage = () => {
    const { candidates, addActivity } = useApp();
    const [tab, setTab] = useState(0);

    const [templates, setTemplates] = useState([
        { id: 1, name: 'Interview Invite', subject: 'Invitation to Interview at TechCorp', body: 'Hi [Name],\n\nWe would love to invite you to an interview for the [Role] position.\n\nPlease let us know your availability.\n\nBest,\nRecruiting Team' },
        { id: 2, name: 'Offer Letter', subject: 'Job Offer: [Role]', body: 'Dear [Name],\n\nWe are pleased to offer you the position of [Role]!\n\nAttached are the details.\n\nCongrats,\nHR' },
        { id: 3, name: 'Rejection', subject: 'Update on your application', body: 'Hi [Name],\n\nThank you for your interest. Unfortunately we have decided to move forward with other candidates.\n\nBest of luck,\nTeam' },
    ]);

    const [editorVisible, setEditorVisible] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [tempSubject, setTempSubject] = useState('');
    const [tempBody, setTempBody] = useState('');

    const [composeCandidateId, setComposeCandidateId] = useState(null);
    const [composeSubject, setComposeSubject] = useState('');
    const [composeBody, setComposeBody] = useState('');
    const [toast, setToast] = useState({ open: false, msg: '' });

    const handleOpenTemplateEditor = (t = null) => {
        setEditingTemplate(t);
        setTempSubject(t ? t.subject : '');
        setTempBody(t ? t.body : '');
        setEditorVisible(true);
    };

    const handleSaveTemplate = () => {
        if (editingTemplate) {
            setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? { ...t, subject: tempSubject, body: tempBody } : t));
        } else {
            setTemplates(prev => [...prev, { id: Date.now(), name: 'New Template', subject: tempSubject, body: tempBody }]);
        }
        setEditorVisible(false);
    };

    const handleApplyTemplate = (templateId) => {
        const template = templates.find(t => t.id === templateId);
        if (!template) return;

        let subject = template.subject;
        let body = template.body;

        if (composeCandidateId) {
            const candidate = candidates.find(c => c.id === composeCandidateId);
            if (candidate) {
                subject = subject.replace(/\[Name\]/g, candidate.name).replace(/\[Role\]/g, candidate.role);
                body = body.replace(/\[Name\]/g, candidate.name).replace(/\[Role\]/g, candidate.role);
            }
        }
        setComposeSubject(subject);
        setComposeBody(body);
    };

    const handleSend = () => {
        const candidate = candidates.find(c => c.id === composeCandidateId);
        if (candidate) {
            addActivity(`Sent email to ${candidate.name}: "${composeSubject}"`);
            setToast({ open: true, msg: `Email sent to ${candidate.name}` });
            setComposeSubject('');
            setComposeBody('');
            setComposeCandidateId(null);
        }
    };

    const handleCandidateChange = (candidateId) => {
        setComposeCandidateId(candidateId);
        const candidate = candidates.find(c => c.id === candidateId);
        if (candidate) {
            setComposeSubject(prev => prev.replace(/\[Name\]/g, candidate.name).replace(/\[Role\]/g, candidate.role));
            setComposeBody(prev => prev.replace(/\[Name\]/g, candidate.name).replace(/\[Role\]/g, candidate.role));
        }
    };

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
                    Communications Hub
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Manage emails, templates, and candidate communications
                </Typography>
            </Box>

            <Tabs 
                value={tab} 
                onChange={(e, v) => setTab(v)} 
                sx={{ 
                    mb: 4,
                    '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' }
                }}
            >
                <Tab label="Inbox" />
                <Tab label="Compose" />
                <Tab label="Templates" />
            </Tabs>

            {/* INBOX TAB */}
            {tab === 0 && (
                <Paper sx={{ display: 'flex', height: '600px', borderRadius: 3, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <Box sx={{ width: 350, borderRight: '1px solid rgba(0,0,0,0.08)', bgcolor: '#fafbfc' }}>
                        <List sx={{ py: 0 }}>
                            {mockInbox.map(mail => (
                                <React.Fragment key={mail.id}>
                                    <ListItem alignItems="flex-start" disablePadding>
                                        <ListItemButton sx={{ py: 2, '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.08)' } }}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 600 }}>{mail.from[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography variant="subtitle2" fontWeight={600}>{mail.from}</Typography>}
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="text.primary" fontWeight={500}>
                                                            {mail.subject}
                                                        </Typography>
                                                        <Typography component="span" variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                                            {mail.preview}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                                            {mail.time}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8fafc' }}>
                        <EmailIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                        <Typography color="text.secondary" variant="body1">Select an email to view conversation</Typography>
                    </Box>
                </Paper>
            )}

            {/* COMPOSE TAB */}
            {tab === 1 && (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 3 }}>Compose Message</Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="caption" color="text.secondary">To Candidate</Typography>
                                <Autocomplete
                                    options={candidates.map(c => ({ label: `${c.name} (${c.role})`, value: c.id }))}
                                    value={candidates.find(c => c.id === composeCandidateId) ? { label: `${candidates.find(c => c.id === composeCandidateId).name} (${candidates.find(c => c.id === composeCandidateId).role})`, value: composeCandidateId } : null}
                                    onChange={(_, newValue) => handleCandidateChange(newValue ? newValue.value : null)}
                                    renderInput={(params) => <TextField {...params} placeholder="Select Recipient..." variant="outlined" />}
                                    isOptionEqualToValue={(option, value) => option.value === value.value}
                                    sx={{ mb: 1, width: '100%' }}
                                />
                            </Box>

                            <TextField fullWidth label="Subject" variant="outlined" sx={{ mb: 3 }} value={composeSubject} onChange={e => setComposeSubject(e.target.value)} />
                            <TextField fullWidth multiline rows={10} label="Message Body" variant="outlined" sx={{ mb: 3 }} value={composeBody} onChange={e => setComposeBody(e.target.value)} />

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<SendIcon />}
                                disabled={!composeCandidateId}
                                onClick={handleSend}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                    color: 'white',       // fixed text color
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                            >
                                Send Email
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#f8fafc', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)' }}>
                            <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ mb: 1 }}>Quick Templates</Typography>
                            <Typography variant="caption" color="text.secondary" paragraph>
                                Select a template to auto-fill the subject and body. Tags like [Name] will be replaced if a candidate is selected.
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {templates.map(t => (
                                    <Button
                                        key={t.id}
                                        variant="contained"
                                        onClick={() => handleApplyTemplate(t.id)}
                                        sx={{ 
                                            justifyContent: 'flex-start',
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            mb: 1,
                                            '&:hover': { bgcolor: 'primary.dark' }
                                        }}
                                    >
                                        {t.name}
                                    </Button>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* TEMPLATES TAB */}
            {tab === 2 && (
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenTemplateEditor()}
                        sx={{ 
                            mb: 3,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                            color: 'white'
                        }}
                    >
                        Create New Template
                    </Button>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        {templates.map(t => (
                            <Paper 
                                key={t.id} 
                                sx={{ 
                                    p: 3, width: 300, borderRadius: 3, cursor: 'pointer',
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' } 
                                }} 
                                onClick={() => handleOpenTemplateEditor(t)}
                            >
                                <Typography variant="h6" fontWeight={700} gutterBottom>{t.name}</Typography>
                                <Typography variant="body2" color="text.secondary" noWrap gutterBottom sx={{ mb: 1 }}>{t.subject}</Typography>
                                <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 2 }}>Click to edit</Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>
            )}

            <Dialog open={editorVisible} onClose={() => setEditorVisible(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingTemplate ? "Edit Template" : "New Template"}</DialogTitle>
                <DialogContent>
                    <TextField placeholder="Subject Line" value={tempSubject} onChange={e => setTempSubject(e.target.value)} fullWidth sx={{ mb: 2 }} />
                    <TextField placeholder="Email Body..." value={tempBody} onChange={e => setTempBody(e.target.value)} fullWidth multiline rows={8} sx={{ mb: 2 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Tip: Use [Name] and [Role] as placeholders.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setEditorVisible(false)}
                        variant="outlined"
                        sx={{
                            color: 'white',
                            border: 'none',
                            '&:hover': { bgcolor: 'grey.800', border: 'none' }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveTemplate}
                        variant="contained"
                        sx={{ color: 'white' }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" variant="filled">{toast.msg}</Alert>
            </Snackbar>
        </Box>
    );
};

export default CommunicationPage;
