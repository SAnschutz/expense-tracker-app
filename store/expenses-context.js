import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      const inverted = action.payload.reverse(); //this has to do with the order firebase returns the data -- this puts it back in order by the date, not the time the record was added
      return inverted;
    case 'ADD':
      return [action.payload, ...state]; //spread into a new object, in a new array in order to maintain immutability
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []); //second param to useReducer is the initial state

  function setExpenses(expenses) {
    dispatch({
      type: 'SET',
      payload: expenses,
    });
  }

  function addExpense(expenseData) {
    dispatch({
      type: 'ADD',
      payload: expenseData,
    });
  }

  function deleteExpense(id) {
    dispatch({
      type: 'DELETE',
      payload: id,
    });
  }

  function updateExpense(id, data) {
    dispatch({
      type: 'UPDATE',
      payload: {
        id,
        data,
      },
    });
  }

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
