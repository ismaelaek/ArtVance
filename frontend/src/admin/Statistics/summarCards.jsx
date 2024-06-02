import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PostAddIcon from '@mui/icons-material/PostAdd';

const summaryData = [
  { title: 'All Users', count: 256, icon: <PeopleIcon />, color: '#3f51b5' },
  { title: 'All Products', count: 10983, icon: <ShoppingCartIcon />, color: '#e91e63' },
  { title: 'All Posts', count: 4578, icon: <PostAddIcon />, color: '#ff9800' },
];

const SummaryCards = () => {
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
