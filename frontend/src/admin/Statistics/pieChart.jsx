import React from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const userData = 2000; // Example number of users
const postData = 500; // Example number of posts
const productData = 300; // Example number of products

const total = userData + postData + productData;

const UserProductPostPercentage = () => {
  const data = [
    { name: 'Users', value: userData },
    { name: 'Posts', value: postData },
    { name: 'Products', value: productData },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div>
      <h5 style={{  marginBottom: '20px', color: '#3339' }}>User, Product, and Post Count</h5>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {/* <p style={{ textAlign: 'center', marginTop: '10px' }}>Key: Users (blue), Posts (green), Products (yellow)</p> */}
    </div>
  );
};

export default UserProductPostPercentage;
