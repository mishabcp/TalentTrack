import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Box } from '@mui/material';
import { useApp } from '../../context/AppContext';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

const columns = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

const KANBAN_HEIGHT = 'calc(100vh - 220px)'; // FIXED HEIGHT

const KanbanBoard = ({ onEdit }) => {
  const { candidates, updateCandidateStatus } = useApp();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const onDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (columns.includes(overId)) {
      const candidate = candidates.find((c) => c.id === activeId);
      if (candidate && candidate.status !== overId) {
        updateCandidateStatus(activeId, overId);
      }
    } else {
      const activeCandidate = candidates.find((c) => c.id === activeId);
      const overCandidate = candidates.find((c) => c.id === overId);

      if (
        activeCandidate &&
        overCandidate &&
        activeCandidate.status !== overCandidate.status
      ) {
        updateCandidateStatus(activeId, overCandidate.status);
      }
    }
  };

  const activeCandidate = candidates.find((c) => c.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          height: KANBAN_HEIGHT,     
          overflowX: 'auto',         
          overflowY: 'hidden',       
          px: 0,
          py: 0,
          borderRadius: 2,
          bgcolor: 'linear-gradient(90deg, #f4f8fd 60%, #e4eefc 100%)',
          alignItems: 'stretch',
          '&::-webkit-scrollbar': {
            height: 12,
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#b3d1ff',
            borderRadius: 12,
          },
        }}
      >
        {columns.map((col) => (
          <KanbanColumn
            key={col}
            status={col}
            candidates={candidates.filter((c) => c.status === col)}
            onEdit={onEdit}
            height={KANBAN_HEIGHT} // pass height down
          />
        ))}
      </Box>

      <DragOverlay>
        {activeCandidate ? (
          <KanbanCard candidate={activeCandidate} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
