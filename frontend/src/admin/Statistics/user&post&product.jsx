import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const userData = [
  { date: '2024-06-01', users: 100 },
  { date: '2024-06-02', users: 150 },
  { date: '2024-06-03', users: 120 },
  { date: '2024-06-04', users: 200 },
  { date: '2024-06-05', users: 180 },
];

const productData = [
  { date: '2024-06-01', products: 50 },
  { date: '2024-06-02', products: 60 },
  { date: '2024-06-03', products: 55 },
  { date: '2024-06-04', products: 70 },
  { date: '2024-06-05', products: 65 },
];

const postData = [
  { date: '2024-06-01', posts: 20 },
  { date: '2024-06-02', posts: 25 },
  { date: '2024-06-03', posts: 30 },
  { date: '2024-06-04', posts: 35 },
  { date: '2024-06-05', posts: 40 },
];

// Combine data while ensuring all datasets have values for the same dates
const combinedData = userData.map(user => {
  const product = productData.find(p => p.date === user.date);
  const post = postData.find(p => p.date === user.date);
  return { date: user.date, users: user.users, products: product ? product.products : 0, posts: post ? post.posts : 0 };
});

const UserProductPostAnalytics = () => {
  return (
    <div>
      <h5 style={{  marginBottom: '20px', color: '#3339' }}>User, Product, and Post Analytics</h5>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users" />
          <Line type="monotone" dataKey="products" stroke="#82ca9d" name="Products" />
          <Line type="monotone" dataKey="posts" stroke="#ffc658" name="Posts" />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default UserProductPostAnalytics;
