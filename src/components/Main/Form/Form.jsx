import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import SpeechComponent from "../../../speech/SpeechComponent";

  


const initialState = {
  amount: '',
  category: '',
  date: new Date(),
  type: 'Income'

}

const Form = () => {
  const [FormData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const handleVoiceInput = ({ type, amount, category, date }) => {
  setFormData(prev => ({
    ...prev,
    type: type || prev.type,
    amount: amount || prev.amount,
    category: category || prev.category,
    date: date || prev.date,
  }));
};


  const CreateTransaciton = () => {
    const transaction = { ...FormData, amount: Number(FormData.amount), id: uuidv4() }

    addTransaction(transaction)
    setFormData(initialState)
  }
  
const selectedCategories = FormData.type ==='Income'?incomeCategories:expenseCategories;

  return (
    <div className="form-card">
      <SpeechComponent onVoiceInput={handleVoiceInput} />
      <Typography align="center" variant="subtitle1" gutterBottom>
        Expense Tracker
      </Typography>
      <div className="form-row">
        <div className="form-group">
          <div>
             {/* <SpeechComponent onVoiceInput={handleVoiceInput} /> */}
          </div>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select value={FormData.type} onChange={(e) => setFormData({ ...FormData, type: e.target.value })}>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="form-group">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={FormData.category} onChange={(e) => setFormData({ ...FormData, category: e.target.value })}>
              {selectedCategories.map((c)=><MenuItem key={c.type} value ={c.type}> {c.type} </MenuItem>)}
            </Select>
          </FormControl>
        </div>

        <div className="form-group">
          <TextField type="number" label="Amount" fullWidth value={FormData.amount} onChange={(e) => setFormData({ ...FormData, amount: e.target.value })} />
        </div>

        <div className="form-group">
          <TextField type="date" label="Date" inputlabel={{ shrink: true }} fullWidth value={FormData.date} onChange={(e) => setFormData({ ...FormData, date: e.target.value })} />
        </div>

        <div className="form-group full-width create-button">
          <Button variant="outlined" color="primary" onClick={CreateTransaciton} >Create</Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
