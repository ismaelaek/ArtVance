import React from 'react';
import { List, ListItem, ListItemText, Divider, Paper } from '@mui/material';

const Agenda = () => {
  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: '#3339' }}>Agenda</h3>
      <Paper elevation={3}>
        <List>
          <ListItem>
            <ListItemText primary="Event 1" secondary="June 10, 2024" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Event 2" secondary="June 15, 2024" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Event 3" secondary="June 20, 2024" />
          </ListItem>
          <Divider />
          {/* Add more events as needed */}
        </List>
      </Paper>
    </div>
  );
};

export default Agenda;
