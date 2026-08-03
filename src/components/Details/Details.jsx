import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import './Details.css'
import useTransactions from '../../useTransactions';



const Details = ({ title }) => {
  const { total, chartData } = useTransactions(title);

  return (
    <div className="box ">
      <Card className={title === 'Income' ? 'income' : 'expense'} >
        <CardHeader className="card-heading" title={title} />
        <CardContent className="card-content !p-4 w-full" >
          <Typography className='amount text-lg font-semibold mb-4' variant="h5">${total}</Typography>
<div className="chart-wrapper w-[320px] h-[280px]">
    <Doughnut data={chartData} />
  </div>
          </CardContent>
      </Card>
    </div>
  )
}

export default Details
