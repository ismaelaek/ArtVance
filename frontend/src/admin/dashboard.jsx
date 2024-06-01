// hna aykoun main dashbord fin atjibi dik componanest lkhrin (stats, users, posts)

import React from 'react'

const Dashboard = () => {
    // ! f admin bach tjibi logged adiri :
    const admin = JSON.parse(localStorage.getItem('admin'));
    return (
        <main className=''>
            <h1>Dashboard</h1>
            {admin && <h2>Welcome {admin.nickname}</h2>}
        </main>
    )
}

export default Dashboard;
