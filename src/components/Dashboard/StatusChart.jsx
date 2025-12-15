import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, Divider } from '@mui/material';

const StatusChart = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Card elevation={8} sx={{ height: '100%', borderRadius: 2, background: 'linear-gradient(120deg,#f7fafc 70%,#e1eeff 180%)', boxShadow: '0 12px 52px -18px #68b8fe28', border: '1.5px solid #e6f0fc', px:2 }}>
            <CardHeader
                title={<span style={{fontWeight:800,letterSpacing:0.1,fontSize:22,color:'#2152b4'}}>Candidate Status Distribution</span>}
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="49%"
                            innerRadius={63}
                            outerRadius={84}
                            fill="#8884d8"
                            paddingAngle={7}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default StatusChart;
