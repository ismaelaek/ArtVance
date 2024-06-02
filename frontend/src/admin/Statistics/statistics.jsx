import React from 'react';
import { Grid, Paper } from '@mui/material';
import SummaryCards from './summarCards.jsx';
import UserProductPostAnalytics from './user&post&product.jsx';
import UserProductPostPercentage from './pieChart.jsx';
import HighReportedUsers from './highReportedUsers.jsx';
import HighRepostedPosts from './highReportedPost.jsx';

const Statistics = () => {
    // Retrieve logged admin information from local storage
    const admin = JSON.parse(localStorage.getItem('admin'));
    
    return (
        <main className="px-4 py-8">
            <div className="statistics-header" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', borderRadius: '10px', padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', textAlign: 'center', marginBottom: '20px', color: 'white' }}>
                <h2>Statistics</h2>
            </div>
            {/* Grid layout */}
            <Grid container spacing={2}>
                {/* SummaryCards */}
                <Grid item xs={12}>
                    <SummaryCards />
                </Grid>
                
                {/* Analytics and Percentage */}
                <Grid container item spacing={2}>
                    {/* Analytics */}
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} className="p-4">
                            <UserProductPostAnalytics />
                        </Paper>
                    </Grid>
                    
                    {/* Percentage */}
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} className="p-4">
                            <UserProductPostPercentage />
                        </Paper>
                    </Grid>
                </Grid>
                
                {/* High reported users and posts */}
                <Grid container item spacing={2}>
                    {/* High reported users */}
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} className="p-4">
                            <HighReportedUsers />
                        </Paper>
                    </Grid>
                    
                    {/* High reposted posts */}
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} className="p-4">
                            <HighRepostedPosts />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </main>
    );
}

export default Statistics;
