import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MUIButton, Alert as MUIAlert, Box, Typography, Tabs, Tab, TextField, Paper, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useApp } from '../context/AppContext';

const sampleJSON = JSON.stringify([
    { "id": "1", "name": "Emily Chen", "role": "Frontend Developer", "status": "Applied", "skills": ["React", "TypeScript"], "source": "LinkedIn" },
    { "id": "2", "name": "Marcus Johnson", "role": "Backend Engineer", "status": "Interviewing", "skills": ["Node.js", "AWS"], "source": "Referral" },
    { "id": "3", "name": "Sophia Williams", "role": "Product Manager", "status": "Applied", "skills": ["Roadmapping", "JIRA"], "source": "Career Site" },
    { "id": "4", "name": "Alex Murphy", "role": "Security Engineer", "status": "Rejected", "skills": ["Cybersecurity", "Python"], "source": "Agency" },
    { "id": "5", "name": "Diana Lewis", "role": "UX Designer", "status": "Interviewing", "skills": ["Figma", "Sketch"], "source": "LinkedIn" },
    { "id": "6", "name": "Clara Roberts", "role": "Frontend Developer", "status": "Applied", "skills": ["CSS", "HTML"], "source": "Indeed" },
    { "id": "7", "name": "Brian Thompson", "role": "Solutions Architect", "status": "Offer", "skills": ["Cloud", "System Design"], "source": "Referral" },
    { "id": "8", "name": "Natalie Green", "role": "DevOps Engineer", "status": "Interviewing", "skills": ["Docker", "Kubernetes"], "source": "LinkedIn" },
    { "id": "9", "name": "John Miller", "role": "QA Engineer", "status": "Applied", "skills": ["Automation", "Selenium"], "source": "Indeed" },
    { "id": "10", "name": "Laura Smith", "role": "Data Analyst", "status": "Rejected", "skills": ["SQL", "Python", "Tableau"], "source": "Referral" },
    { "id": "11", "name": "Kevin Brown", "role": "Backend Engineer", "status": "Interviewing", "skills": ["Java", "Spring Boot"], "source": "LinkedIn" },
    { "id": "12", "name": "Olivia Davis", "role": "Frontend Developer", "status": "Applied", "skills": ["Vue.js", "JavaScript"], "source": "Indeed" },
    { "id": "13", "name": "Michael Thompson", "role": "Product Owner", "status": "Offer", "skills": ["Agile", "Scrum"], "source": "Referral" },
    { "id": "14", "name": "Sophia Lee", "role": "UX Researcher", "status": "Rejected", "skills": ["User Testing", "Interviews"], "source": "Agency" },
    { "id": "15", "name": "Daniel Harris", "role": "DevOps Engineer", "status": "Applied", "skills": ["Terraform", "AWS"], "source": "LinkedIn" },
    { "id": "16", "name": "Emma Robinson", "role": "Data Scientist", "status": "Interviewing", "skills": ["Python", "Pandas", "ML"], "source": "Career Site" },
    { "id": "17", "name": "James Miller", "role": "Frontend Developer", "status": "Applied", "skills": ["React", "Redux"], "source": "Referral" },
    { "id": "18", "name": "Isabella Thomas", "role": "Project Manager", "status": "Interviewing", "skills": ["JIRA", "Communication"], "source": "LinkedIn" },
    { "id": "19", "name": "William Anderson", "role": "Security Analyst", "status": "Rejected", "skills": ["Pen Testing", "Linux"], "source": "Agency" },
    { "id": "20", "name": "Mia White", "role": "QA Engineer", "status": "Applied", "skills": ["Test Automation", "Cypress"], "source": "Referral" },
    { "id": "21", "name": "Alexander King", "role": "Backend Developer", "status": "Applied", "skills": ["Node.js", "Express"], "source": "Career Site" },
    { "id": "22", "name": "Charlotte Scott", "role": "Frontend Developer", "status": "Interviewing", "skills": ["Angular", "TypeScript"], "source": "LinkedIn" },
    { "id": "23", "name": "Benjamin Adams", "role": "Solutions Architect", "status": "Offer", "skills": ["Cloud Architecture", "AWS"], "source": "Referral" },
    { "id": "24", "name": "Amelia Baker", "role": "UI Designer", "status": "Applied", "skills": ["Figma", "Sketch"], "source": "Indeed" },
    { "id": "25", "name": "Henry Nelson", "role": "Backend Engineer", "status": "Rejected", "skills": ["Java", "Spring"], "source": "Agency" },
    { "id": "26", "name": "Evelyn Carter", "role": "Data Analyst", "status": "Interviewing", "skills": ["SQL", "Power BI"], "source": "LinkedIn" },
    { "id": "27", "name": "Jacob Mitchell", "role": "QA Engineer", "status": "Applied", "skills": ["Selenium", "TestNG"], "source": "Career Site" },
    { "id": "28", "name": "Avery Perez", "role": "Product Manager", "status": "Offer", "skills": ["JIRA", "Roadmapping"], "source": "Referral" },
    { "id": "29", "name": "Logan Roberts", "role": "Frontend Developer", "status": "Interviewing", "skills": ["React", "Next.js"], "source": "LinkedIn" },
    { "id": "30", "name": "Abigail Turner", "role": "DevOps Engineer", "status": "Applied", "skills": ["Docker", "Kubernetes"], "source": "Indeed" },
    { "id": "31", "name": "Ethan Phillips", "role": "Backend Engineer", "status": "Applied", "skills": ["Python", "Django"], "source": "Referral" },
    { "id": "32", "name": "Harper Campbell", "role": "UX Designer", "status": "Interviewing", "skills": ["Figma", "User Testing"], "source": "LinkedIn" },
    { "id": "33", "name": "Lucas Parker", "role": "Data Scientist", "status": "Applied", "skills": ["Python", "ML", "SQL"], "source": "Career Site" },
    { "id": "34", "name": "Ella Evans", "role": "Frontend Developer", "status": "Interviewing", "skills": ["Vue.js", "JavaScript"], "source": "Referral" },
    { "id": "35", "name": "Nathan Edwards", "role": "Project Manager", "status": "Rejected", "skills": ["Scrum", "JIRA"], "source": "LinkedIn" }
], null, 2);

const DataImportModal = ({ visible, onCancel }) => {
    const { importData } = useApp();
    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    const parseCSV = (text) => {
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) throw new Error("CSV file seems empty or missing headers.");

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const requiredFields = ['name', 'role', 'status', 'source'];
        const missing = requiredFields.filter(f => !headers.includes(f));
        if (missing.length > 0) throw new Error(`Missing required columns: ${missing.join(', ')}`);

        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
            if (!row) continue;
            const obj = { id: `csv-${Date.now()}-${i}`, skills: [] };
            headers.forEach((header, index) => {
                if (row[index]) {
                    let val = row[index].trim().replace(/^"|"$/g, '');
                    if (header === 'skills') obj.skills = val.split(';').map(s => s.trim()).filter(s => s);
                    else obj[header] = val;
                }
            });
            if (obj.name && obj.role) result.push(obj);
        }
        return result;
    };

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const data = parseCSV(text);
                if (data.length === 0) throw new Error("No valid records found in CSV.");
                importData(data);
                onCancel();
                setError(null);
            } catch (err) {
                setError("CSV Parsing Error: " + err.message);
            }
        };
        reader.readAsText(file);
        return false;
    };

    const handleJsonImport = () => {
        try {
            const parsed = JSON.parse(jsonText);
            if (!Array.isArray(parsed)) throw new Error("JSON must be an array.");
            importData(parsed);
            onCancel();
            setJsonText('');
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const downloadTemplate = () => {
        const csvContent = "Name,Role,Status,Source,Skills\nJohn Doe,Frontend Dev,Applied,LinkedIn,React;Vue\nJane Smith,Product Manager,Interviewing,Referral,Agile;JIRA";
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'candidates_template.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const TABS = [
        { label: 'Upload CSV (Excel)', key: 0 },
        { label: 'Paste JSON (Advanced)', key: 1 }
    ];

    return (
        <Dialog open={visible} onClose={onCancel} fullWidth maxWidth="md">
            <DialogTitle>Import Candidate Data</DialogTitle>
            <DialogContent>
                {error && <MUIAlert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>{error}</MUIAlert>}
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="scrollable" allowScrollButtonsMobile sx={{ mb: 2 }}>
                    {TABS.map(tab => <Tab key={tab.key} label={tab.label} />)}
                </Tabs>

                {activeTab === 0 && (
                    <Paper variant="outlined" sx={{ p: 3, mb: 2, borderRadius: 2, textAlign: 'center', bgcolor: '#f1f7fe' }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>HR Import Mode - CSV Upload</Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>Upload a CSV/Excel file with columns: Name, Role, Status, Source, Skills.</Typography>
                        <Box
                            onDrop={handleDrop}
                            onDragOver={e => e.preventDefault()}
                            sx={{
                                border: '2px dashed #53a3f9',
                                borderRadius: 2,
                                p: 5,
                                bgcolor: '#eaf7ff',
                                mb: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <CloudUploadIcon sx={{ fontSize: 36, color: '#296ad3', mb: 2 }} />
                            <Typography>Click or drag file to this area to upload</Typography>
                            <Typography variant="caption" color="text.secondary">Support for standard .csv files</Typography>
                            <input
                                type="file"
                                accept=".csv"
                                style={{ display: 'none' }}
                                id="csv-file-input"
                                onChange={e => handleFile(e.target.files[0])}
                            />
                        </Box>
                        <MUIButton
                            startIcon={<DownloadIcon />}
                            onClick={downloadTemplate}
                            fullWidth
                            sx={{ mb: 1, borderRadius: 2, color: '#fff', borderColor: '#296ad3' }}
                        >
                            Download CSV Template
                        </MUIButton>
                    </Paper>
                )}

                {activeTab === 1 && (
                    <Paper variant="outlined" sx={{ p: 3, mb: 2, borderRadius: 2, bgcolor: '#fff' }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>Paste JSON (Advanced)</Typography>
                        <TextField
                            label="Paste JSON data here..."
                            value={jsonText}
                            onChange={e => setJsonText(e.target.value)}
                            multiline
                            rows={10}
                            fullWidth
                            sx={{ fontFamily: 'monospace', mb: 2 }}
                        />
                        <Stack direction="row" spacing={1}>
                            <MUIButton
                                variant="contained"
                                onClick={handleJsonImport}
                                startIcon={<CloudUploadIcon />}
                                sx={{ borderRadius: 2 }}
                            >
                                Import JSON
                            </MUIButton>
                            <MUIButton
                                variant="outlined"
                                onClick={() => setJsonText(sampleJSON)}
                                startIcon={<FileCopyIcon />}
                                sx={{ borderRadius: 2, color: '#fff', borderColor: '#296ad3' }}
                            >
                                Load Sample JSON
                            </MUIButton>
                        </Stack>
                    </Paper>
                )}

            </DialogContent>
            <DialogActions>
                <MUIButton 
                    onClick={onCancel} 
                    variant="outlined" 
                    sx={{ borderRadius: 2, color: '#fff', borderColor: '#296ad3' }}
                >
                    Close
                </MUIButton>
            </DialogActions>
        </Dialog>
    );
};

export default DataImportModal;
