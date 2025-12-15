import React, { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CommandPalette from './CommandPalette';

const drawerWidth = 260;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: 'block',
        minHeight: '100vh',
        bgcolor: '#f8fafc',
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <CommandPalette />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          position: { xs: 'relative', sm: 'absolute' },
          left: { xs: 0, sm: `${drawerWidth}px` },
          right: 0,
          top: 0,
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
          margin: 0,
          padding: 0,
          px: 0,
          py: { xs: 2, sm: 4 },
          pt: { xs: 10, sm: 13 },
          minHeight: '100vh',
          bgcolor: '#f8fafc',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ 
          width: '100%', 
          flex: 1, 
          margin: 0, 
          padding: 0, 
          minWidth: 0,
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;