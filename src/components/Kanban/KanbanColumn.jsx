import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Paper, Typography, Box, Chip } from '@mui/material';
import KanbanCard from './KanbanCard';

const getStatusColor = (status) => {
    switch (status) {
        case 'Applied': return 'primary';
        case 'Interviewing': return 'warning';
        case 'Offer': return 'success';
        case 'Rejected': return 'error';
        default: return 'default';
    }
};

const KanbanColumn = ({ status, candidates, onEdit }) => {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <Paper
            ref={setNodeRef}
            sx={{
                minWidth: 316,
                width: 316,
                height: '100%',
                maxHeight: '100%',
                bgcolor: 'white',
                p: 2.1,
                borderRadius: 2,
                boxShadow: '0 6px 30px -8px #1877ee22',
                border: '1.5px solid #deecfa',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                mb:2.5,
                transition:'box-shadow 0.14s',
            }}
            elevation={0}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'text.secondary', fontSize:19, letterSpacing:0.04 }}>
                    {status}
                </Typography>
                <Chip label={candidates.length} size="small" color={getStatusColor(status)} variant="filled" sx={{ fontWeight: 800, bgcolor: 'rgba(37,99,235,.11)', borderRadius:2, fontSize:13, px:1.7, boxShadow:'0 2px 8px #2563eb22' }}/>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.1,
                flexGrow: 1,
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': { width: '7px', background:'#e7eefc', borderRadius:10 },
                '&::-webkit-scrollbar-thumb': { background:'#b3d3ff', borderRadius:10 },
            }}>
                {candidates.map(candidate => (
                    <KanbanCard key={candidate.id} candidate={candidate} onEdit={onEdit} />
                ))}
            </Box>
        </Paper>
    );
};

export default KanbanColumn;
