import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { range: '15+', users: 250 },
  { range: '10-14', users: 20 },
  { range: '5-9', users: 150},
  { range: '4-2', users: 10 },
  { range: '0-1', users: 5000 },
];

// Define the color with varying degrees of saturation
const COLOR = '#ff0000';

const HighUsersReports = () => {
  return (
    <div>
      <h5 style={{  marginBottom: '20px', color: '#3339' }}>High Users Reports</h5>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill={COLOR}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(${index * 30}, 70%, 50%)`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HighUsersReports;
