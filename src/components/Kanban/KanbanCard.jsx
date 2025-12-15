import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Avatar, CircularProgress, Tooltip, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore, getScoreColor } from '../../utils/smartMatch';

const KanbanCard = ({ candidate, isOverlay, onEdit }) => {
    const navigate = useNavigate();
    const { jobs } = useApp();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: candidate.id,
    });

    // Find the job this candidate applied for to calculate score
    // In a real app we'd likely store jobId on candidate. For now matching by role name ~ job title
    const job = jobs.find(j => j.title === candidate.role);
    const { score } = calculateMatchScore(candidate, job);
    const scoreColor = getScoreColor(score);

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        opacity: isOverlay ? 1 : 0.5, // Dim original when dragging
    } : undefined;

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            sx={{
                cursor: 'grab',
                position: 'relative',
                boxShadow: isOverlay ? 8 : 2,
                userSelect: 'none',
                flexShrink: 0,
                borderRadius: 2,
                border: isOverlay ? '2.5px solid #38e1a8' : '1.5px solid #e2effa',
                background: isOverlay ? 'linear-gradient(110deg,#dffdfa,#beedff 100%)' : 'linear-gradient(105deg,#ffffff 60%,#f5fafd 180%)',
                transition: 'box-shadow 0.18s, border 0.16s, background 0.18s',
                '&:hover': { boxShadow: 5, background:'#f6fafc' },
            }}
            onClick={() => {
                if (!isOverlay && onEdit) onEdit(candidate);
            }}
        >
            <CardContent sx={{ p:2.2, '&:last-child':{pb:2.2} }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '1.12rem' }}>
                        {candidate.name}
                    </Typography>
                    {job && (
                        <Tooltip title={`Smart Match: ${score}%`}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                {/* Background circle for contrast */}
                                <CircularProgress
                                    variant="determinate"
                                    value={100}
                                    size={32}
                                    thickness={4.5}
                                    sx={{
                                        color: 'rgba(0, 0, 0, 0.06)',
                                        position: 'absolute',
                                        left: 0,
                                        '& .MuiCircularProgress-circle': {
                                            strokeLinecap: 'round',
                                        }
                                    }}
                                />
                                {/* Foreground progress circle */}
                                <CircularProgress
                                    variant="determinate"
                                    value={score}
                                    size={32}
                                    thickness={4.5}
                                    sx={{ 
                                        color: scoreColor,
                                        filter: 'drop-shadow(0 2px 8px rgba(55, 237, 255, 0.35))',
                                        transition: 'all 0.3s ease',
                                        '& .MuiCircularProgress-circle': {
                                            strokeLinecap: 'round',
                                        }
                                    }}
                                />
                                {/* Score number */}
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography 
                                        variant="caption" 
                                        component="div" 
                                        sx={{ 
                                            fontSize: '0.72rem', 
                                            color: scoreColor,
                                            fontWeight: 700,
                                            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                            letterSpacing: '-0.02em'
                                        }}
                                    >
                                        {score}
                                    </Typography>
                                </Box>
                            </Box>
                        </Tooltip>
                    )}
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {candidate.role}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 0.7, flexWrap: 'wrap' }}>
                        {candidate.skills && candidate.skills.slice(0, 3).map(skill => (
                            <Typography key={skill} variant="caption" sx={{ bgcolor: '#caf0ff', px: 0.9, py:0.4, borderRadius: 1, fontWeight:700, color:'#1576a8', fontSize:13 }}>
                                {skill}
                            </Typography>
                        ))}
                    </Box>
                    <Tooltip title="Start Interview Mode">
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/interview/${candidate.id}`);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            sx={{ background:'#eafaff', borderRadius:1.7, ml:1, boxShadow:'0 2px 8px #56daf533', '&:hover': { background:'#d5fafd' } }}
                        >
                            <MicIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>
        </Card>
    );
};

export default KanbanCard;