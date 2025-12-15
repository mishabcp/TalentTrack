import React from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ActivityFeed = ({ activities }) => {
    return (
        <Card elevation={7} sx={{ borderRadius: 2, background: 'linear-gradient(115deg,#f7fafc 80%,#e8f3fe 140%)', boxShadow: '0 8px 44px -14px #1877ee30', border: '1.5px solid #e2eaf4' }}>
            <CardHeader
                title={<span style={{fontWeight:800,fontSize:20,letterSpacing:0.05,background:'linear-gradient(92deg,#2563eb,#86f3cf 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Recent Activity</span>}
                avatar={<NotificationsIcon color="action" />}
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {activities.length > 0 ? activities.map((activity, index) => (
                        <React.Fragment key={activity.id}>
                            <ListItem alignItems="flex-start" sx={{'&:hover':{backgroundColor:'#f5faffa9'}, transition:'background 0.20s'}}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'secondary.light', boxShadow: '0 2px 8px #94a3b810', fontWeight:700 }}>{activity.user.charAt(0)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" component="span" sx={{fontWeight:800,letterSpacing:0.06}}>
                                            {activity.user} - {activity.action}
                                        </Typography>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {activity.target}
                                            </Typography>
                                            {" — " + activity.time}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {index < activities.length - 1 && <Divider variant="inset" component="li" sx={{my:0.6}}/>}
                        </React.Fragment>
                    )) : (
                        <ListItem>
                            <ListItemText primary="No recent activity" />
                        </ListItem>
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export default ActivityFeed;
