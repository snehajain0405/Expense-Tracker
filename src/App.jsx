import { useState } from 'react'
import './App.css'
import Details from './components/Details/Details.jsx';
import { Grid } from '@mui/material';
import './index.css'
import Main from './components/Main/Main.jsx'

function App() {

  return (
    <>
      <div>

        <Grid container spacing={0} alignItems="center" justifyContent="space-around" style={{ height: '100vh', width: '100vw' }}>
          <div className='ml-8'>
            <Grid style={{ flexBasis: '20%' }}>
            <Details title="Income" />
          </Grid>
          </div>
          <Grid style={{ flexBasis: '50%' }}>
            <Main />
          </Grid>
         <div className='mr-8'>
           <Grid style={{ flexBasis: '20%' }}>
            <Details title="Expense" />
          </Grid>
         </div>
        </Grid>

      </div>

    </>
  )
}

export default App
