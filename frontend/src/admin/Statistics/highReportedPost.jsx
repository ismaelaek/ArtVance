import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { range: '15+', post: 25 },
  { range: '10-14', post: 20 },
  { range: '5-9', post: 15 },
  { range: '4-2', post: 10 },
  { range: '0-1', post: 5 },
];

const COLORS = ['#ff0000', '#ff69b4', '#ffa500', '#ffff00', '#00bfff'];

const HighRepostedPosts = () => {
  return (
    <div>
      <h5 style={{  marginBottom: '20px', color: '#3339' }}>Highly Reposted Posts</h5>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="post" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HighRepostedPosts;
