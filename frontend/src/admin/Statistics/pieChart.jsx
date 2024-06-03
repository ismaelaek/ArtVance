import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';

const UserProductPostPercentage = () => {
  const [userData, setUserData] = useState(0);
  const [postData, setPostData] = useState(0);
  const [productData, setProductData] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://127.0.0.1:8000/api/users');
        const postsResponse = await axios.get('http://127.0.0.1:8000/api/posts');
        const productsResponse = await axios.get('http://127.0.0.1:8000/api/products/all');

        setUserData(usersResponse.data.length);
        setPostData(postsResponse.data.length);
        setProductData(productsResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const total = userData + postData + productData;

  const data = [
    { name: 'Users', value: userData },
    { name: 'Posts', value: postData },
    { name: 'Products', value: productData },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div>
      <h5 style={{ marginBottom: '20px', color: '#3339' }}>User, Product, and Post Count</h5>
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
    </div>
  );
};

export default UserProductPostPercentage;
