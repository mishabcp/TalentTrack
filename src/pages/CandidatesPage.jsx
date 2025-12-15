import React, { useState } from 'react';
import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useApp } from '../context/AppContext';
import CandidateTable from '../components/Candidates/CandidateTable';
import CandidateFormModal from '../components/Candidates/CandidateFormModal';
import KanbanBoard from '../components/Kanban/KanbanBoard';

const CandidatesPage = () => {
  const { candidates, addCandidate, editCandidate, deleteCandidate } = useApp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [viewMode, setViewMode] = useState('board');
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSave = (values) => {
    editingCandidate
      ? editCandidate({ ...editingCandidate, ...values })
      : addCandidate(values);
    setIsModalVisible(false);
  };

  const handleDeleteRequest = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteCandidate(deleteId);
    setDeleteId(null);
    setDeleteOpen(false);
  };

  const buttonStyles = (isActive) => ({
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 600,
    color: 'white',
    bgcolor: isActive ? 'primary.main' : 'grey.700',
    border: 'none', // removed border completely
    '&:hover': {
      bgcolor: isActive ? 'primary.dark' : 'grey.800',
    }
  });

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
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
            Candidates
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track all candidate applications
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            onClick={() => setViewMode('table')}
            sx={buttonStyles(viewMode === 'table')}
          >
            Table
          </Button>
          <Button 
            onClick={() => setViewMode('board')}
            sx={buttonStyles(viewMode === 'board')}
          >
            Board
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingCandidate(null);
              setIsModalVisible(true);
            }}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Add Candidate
          </Button>
        </Box>
      </Box>

      {viewMode === 'table' ? (
        <CandidateTable
          candidates={candidates}
          onEdit={setEditingCandidate}
          onDelete={handleDeleteRequest}
        />
      ) : (
        <KanbanBoard onEdit={setEditingCandidate} />
      )}

      <CandidateFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialValues={editingCandidate}
      />

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete candidate?</DialogTitle>
        <DialogContent>
            Are you sure you want to delete this candidate? This action cannot be undone.
        </DialogContent>
        <DialogActions>
            <Button 
              onClick={() => setDeleteOpen(false)} 
              variant="outlined"
              sx={{ color: 'white', borderColor: 'grey.700', '&:hover': { bgcolor: 'grey.800' } }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              variant="contained" 
              color="error"
              sx={{ color: 'white' }}
            >
              Delete
            </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CandidatesPage;
