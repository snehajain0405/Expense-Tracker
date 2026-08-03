import React, { useContext } from 'react';
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Slide
} from '@mui/material';
import { Delete, MoneyOff } from '@mui/icons-material';
import { ExpenseTrackerContext } from '../../../context/context';

const List = () => {
  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);

  return (
    <div className="w-full px-4">
<MUIList className="w-full max-h-[200px] overflow-y-auto space-y-2" disablePadding>
        {transactions.map((transaction) => (
          <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
            <ListItem className="w-full bg-white shadow-sm rounded-lg flex justify-between items-center">

              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: transaction.type === 'Income' ? '#00897b' : '#d32f2f',
                    color: '#fff'
                  }}
                >
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={transaction.category}
                secondary={`$${transaction.amount} - ${transaction.date}`}
              />

              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTransaction(transaction.id)}
              >
                <Delete className="text-gray-500 hover:text-red-600" />
              </IconButton>
            </ListItem>
          </Slide>
        ))}
      </MUIList>
    </div>
  );
};

export default List;
