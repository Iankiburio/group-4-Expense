// src/components/ExpenseForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ExpenseForm = () => {
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have user_id and category_id set appropriately
      const newExpense = {
        category,
        description,
        amount: parseFloat(amount),
        user_id: 1,
        category_id: 1,
      };

      await axios.post('http://localhost:5000/expenses', newExpense);

      // Redirect to the expense list page after successful submission
      history.push('/expenses');
    } catch (error) {
      console.error('Error submitting expense:', error);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="groceries">Food</option>
            <option value="transport">Transport</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="grooming">Grooming</option>
            <option value="health">Health</option>
            {/* Add more categories as needed */}
          </select>
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;