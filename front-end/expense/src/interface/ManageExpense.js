import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class ManageExpense extends Component {
    constructor() {
        super();
        this.state = {
            expenses: [],
            categories: [],
            expId: 0,
            clicked: false,
            successfulDelete: false,
        };
    }

    componentDidMount() {
        this.getAllCats();
        this.getExpenses();
    }

    componentDidUpdate() {
        this.getExpenses();
    }

    // Fetch all categories
    getAllCats = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/category`);
            this.setState({ categories: response.data.category }, () => console.log("Fetched all categories"), console.log(response.data));
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    // Fetch all expenses
    getExpenses = async () => {
        try {
            const userId = localStorage.getItem('currentUserId');
            const response = await axios.get(`http://localhost:3000/expense/user/${userId}`);
            this.setState({ expenses: response.data.expenses }, () => console.log("Fetched all expenses"), console.log(response.data));
        } catch (error) {
            console.error('Error fetching expenses:', error.message);
        }
    };

    // Get category name by category id
    getCatName(id) {
        const category = this.state.categories.find((cat) => cat.id === id);
        return category ? category.name : "No category";
    }

    // Set state to navigate to the edit expense page
    editItem = (expId) => {
        this.setState({ clicked: true, expId });
    };

    // Delete expense
    deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/expense/${id}`);
            this.setState({ successfulDelete: true }, () => console.log("Deleted expense"));
        } catch (error) {
            console.error('Error deleting expense:', error.message);
        }
    };

    render() {
        return (
            <div>
                {this.state.clicked ? (
                    <Redirect to={{ pathname: `/editexpenses/${this.state.expId}` }} id={this.state.expId} />
                ) : (
                    ""
                )}

                {this.state.successfulDelete ? (
                    <p style={{ color: "#FB4807", marginLeft: "30px", fontSize: "15px" }}>Expense deleted!!</p>
                ) : (
                    ""
                )}
                {this.state.expenses.length > 0 ? (
                    <Table bordered hover size="md" style={{ marginTop: "30px", marginLeft: "30px" }}>
                        <thead style={{ backgroundColor: "#A300CC", color: "white", fontSize: "14px" }}>
                            <tr>
                                <th>Month</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.expenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.month ?? "No Month"}</td>
                                    <td>{expense.description ?? "No Description"}</td>
                                    <td>${expense.amount ?? "No Amount"}</td>
                                    <td>{this.getCatName(expense.category_id) ?? "No Category"}</td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: "#00b359" }}
                                            onClick={() => this.editItem(expense.id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: "#FB4807" }}
                                            onClick={() => this.deleteExpense(expense.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p style={{ marginLeft: "30px" }}>No expenses noted. Please add expenses.</p>
                )}
            </div>
        );
    }
}
