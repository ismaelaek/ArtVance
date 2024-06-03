import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PostAddIcon from '@mui/icons-material/PostAdd';

const SummaryCards = () => {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://127.0.0.1:8000/api/users');
        const postsResponse = await axios.get('http://127.0.0.1:8000/api/posts');
        const productsResponse = await axios.get('http://127.0.0.1:8000/api/products/all');

        const usersCount = usersResponse.data.length;
        const postsCount = postsResponse.data.length;
        const productsCount = productsResponse.data.length;

        setSummaryData([
          { title: 'All Users', count: usersCount, icon: <PeopleIcon />, color: '#3f51b5' },
          { title: 'All Products', count: productsCount, icon: <ShoppingCartIcon />, color: '#e91e63' },
          { title: 'All Posts', count: postsCount, icon: <PostAddIcon />, color: '#ff9800' },
        ]);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center">
      {summaryData.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              bgcolor: data.color,
              color: '#fff',
              borderRadius: 10,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <Box marginRight={2}>{data.icon}</Box>
                <Typography variant="h5" fontWeight="bold">{data.title}</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">{data.count}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
