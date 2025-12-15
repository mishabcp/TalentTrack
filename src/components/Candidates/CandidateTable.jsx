import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip, Typography, TextField, Box, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const CandidateTable = ({ candidates, onEdit, onDelete }) => {
    const [searchText, setSearchText] = React.useState('');

    const filteredCandidates = candidates.filter(candidate =>
        candidate.name.toLowerCase().includes(searchText.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 180,
            sortable: true,
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Applied Role',
            width: 170,
            sortable: true,
            flex: 1,
            filterable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            flex: 0.7,
            renderCell: (params) => {
                let color = 'default';
                if (params.value === 'Rejected') color = 'error';
                if (params.value === 'Offer') color = 'success';
                if (params.value === 'Interviewing') color = 'warning';
                if (params.value === 'Applied') color = 'primary';
                return (
                    <Chip label={params.value.toUpperCase()} color={color} size="small" sx={{ fontWeight: 700, borderRadius: 1.4, px: 2 }} />
                );
            },
        },
        {
            field: 'appliedDate',
            headerName: 'Applied Date',
            width: 140,
            flex: 0.8,
            sortable: true,
            valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '',
        },
        {
            field: 'actions',
            headerName: 'Action',
            width: 130,
            flex: 0.8,
            type: 'actions',
            getActions: (params) => [
                <IconButton color="primary" onClick={() => onEdit(params.row)} key="edit">
                    <EditIcon />
                </IconButton>,
                <IconButton color="error" onClick={() => onDelete(params.row.id)} key="delete">
                    <DeleteIcon />
                </IconButton>,
            ],
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <IconButton color="primary" onClick={() => onEdit(params.row)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => onDelete(params.row.id)}><DeleteIcon /></IconButton>
                </Stack>
            )
        },
    ];

    return (
        <Box sx={{ boxShadow: '0 2px 24px 0 #8ec6ff18', borderRadius: 3, background: '#fff', p: 3, mt: 1, mb: 3, width: '100%' }}>
            <Box sx={{ mb: 2, display:'flex', alignItems:'center', gap: 2 }}>
                <TextField
                    placeholder="Search candidates..."
                    variant="outlined"
                    size="small"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    InputProps={{
                        sx: { borderRadius: 2, width: 220, boxShadow: '0 1px 4px #d1e5fb15' },
                        startAdornment: <SearchIcon fontSize="small" sx={{ mr: 0.7 }} />,
                    }}
                />
            </Box>
            <DataGrid
                rows={filteredCandidates}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                autoHeight
                getRowId={row => row.id}
                sx={{
                    borderRadius: 2.5,
                    background: 'transparent',
                    boxShadow: 'none',
                    fontSize: 15,
                    '& .MuiDataGrid-columnHeaders': {
                        background: 'linear-gradient(to right, #f0f4fc 60%, #f7fafc 100%)',
                        fontWeight: 800,
                        fontSize: 15,
                    },
                    '& .MuiDataGrid-row': {
                        transition: 'background .19s',
                        '&:hover': { background: '#f6faff' }
                    },
                    '& .MuiDataGrid-cell': {
                        fontWeight: 500, color: '#355', letterSpacing: 0,
                    }
                }}
                disableSelectionOnClick
            />
        </Box>
    );
};

export default CandidateTable;
