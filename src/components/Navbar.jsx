import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 260;

const Navbar = ({ handleDrawerToggle }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                background: 'linear-gradient(90deg, #fff 60%, #f3f6fc 100%)',
                color: 'text.primary',
                boxShadow: '0 4px 24px -4px rgba(36, 57, 88, 0.10)',
                borderBottom: '1.5px solid #e5e7eb',
                minHeight: 72,
                zIndex: 1202,
            }}
            elevation={2}
        >
            <Toolbar sx={{ minHeight: 72 }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' }, transition: 'background 0.2s', '&:hover': { background: '#e0e7ef' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 800, letterSpacing: 0.5, background: 'linear-gradient(90deg,#288aff 10%, #6a9bf8 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    TalentTrack
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ mr: 2, display: { xs: 'none', sm: 'block' }, color: 'text.secondary' }}>
                        Hiring Manager
                    </Typography>
                    <Avatar sx={{ bgcolor: 'secondary.main', border: '2px solid #dbeafe', transition: 'box-shadow 0.2s', boxShadow: '0 2px 8px -3px #2563eb45', cursor: 'pointer', '&:hover': { boxShadow: '0 5px 14px 0 #1e293b27' } }}>HM</Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
