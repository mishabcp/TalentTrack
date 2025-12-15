import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/SpaceDashboardRounded';
import PeopleIcon from '@mui/icons-material/PeopleAltRounded';
import WorkIcon from '@mui/icons-material/WorkOutlineRounded';
import ScheduleIcon from '@mui/icons-material/ScheduleRounded';
import AnalyticsIcon from '@mui/icons-material/AnalyticsRounded';
import ForumIcon from '@mui/icons-material/ForumRounded';
import SchoolIcon from '@mui/icons-material/SchoolRounded';
import TableChartIcon from '@mui/icons-material/TableChartRounded';
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const navItems = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Candidates", path: "/candidates", icon: <PeopleIcon /> },
  { label: "Jobs", path: "/jobs", icon: <WorkIcon /> },
  { label: "Scheduler", path: "/scheduler", icon: <ScheduleIcon /> },
  { label: "Analytics", path: "/analytics", icon: <AnalyticsIcon /> },
  { label: "Communications", path: "/communications", icon: <ForumIcon /> },
  { label: "Assessment", path: "/assessments", icon: <SchoolIcon /> },
  { label: "Database", path: "/database", icon: <TableChartIcon /> }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(140deg,#f7fafc 60%,#e2f1ff 150%)',
          borderRight: '2px solid #e2eaf5',
        },
      }}
    >
      <Toolbar sx={{ minHeight: 74, px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          NAVIGATION
        </Typography>
      </Toolbar>

      <Divider />

      <List>
        {navItems.map(({ label, path, icon }) => (
          <ListItem disablePadding key={path}>
            <ListItemButton
              component={Link}
              to={path}
              selected={location.pathname === path}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
