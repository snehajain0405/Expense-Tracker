import React, {useContext} from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@mui/material';
import { ExpenseTrackerContext } from '../../context/context';
import './Main.css';
import Form from './Form/Form';
import List from './List/list';
// import InfoCard from '../InfoCard';

const ExpenseTracker = () => {
  const { balance } = useContext(ExpenseTrackerContext);

  return (
    <Card className="root"> 
      <CardHeader title="Expense Tracker" />
      <CardContent>
        <Typography align="center" variant="h5">Total Balance ${balance} </Typography>
        <Typography variant="subtitle2" align="center" style={{ marginTop: 2, fontStyle: 'italic', color: '#888' }}>
          Try saying: "Add income of 500 for salary on August 5"
        </Typography>
        <Typography variant="subtitle1" style={{ lineHeight: '1.5em', marginTop: '10px' }}>
          {/* <InfoCard /> */}
        </Typography>
        <Form />
      </CardContent>
      <CardContent className="cartContent"> 
        <Grid container spacing={1}>
          <Grid gridColumn="span 12">
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
