import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 260;

const Navbar = ({ handleDrawerToggle }) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                background: 'linear-gradient(90deg, #ffffff 60%, #f3f6fc 100%)',
                color: 'text.primary',
                boxShadow: '0 4px 24px -4px rgba(36, 57, 88, 0.10)',
                borderBottom: '1.5px solid #e5e7eb',
                minHeight: 72,
                zIndex: 1202,
            }}
        >
            <Toolbar sx={{ minHeight: 72 }}>
                <IconButton
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        mr: 2,
                        display: { sm: 'none' },
                        '&:hover': { background: '#e0e7ef' },
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    noWrap
                    sx={{
                        flexGrow: 1,
                        fontWeight: 900,
                        fontSize: '1.8rem',
                        letterSpacing: 0.6,
                        background: 'linear-gradient(90deg, #288aff 10%, #6a9bf8 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    TalentTrack
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
