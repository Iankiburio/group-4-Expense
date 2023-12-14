import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class ManageBudget extends Component {
    constructor() {
        super();
        this.state = {
            budgets: [],
            budgetId: 0,
            clicked: false,
            successfulDelete: false,
        };
    }

    componentDidMount() {
        this.getIncomes();
    }

    componentDidUpdate() {
        this.getIncomes();
    }

    // Fetch all income data for the current user
    getIncomes = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/income/user/${localStorage.getItem('currentUserId')}`);
            this.setState({ budgets: response.data.incomes }, () => console.log("Fetched all budgets"), console.log(response.data));
        } catch (error) {
            console.error('Error fetching incomes:', error.message);
        }
    };

    // Set state to navigate to the edit budget page
    editItem = (budgetId) => {
        this.setState({ clicked: true, budgetId });
    };

    // Delete a budget item
    deleteBudget = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/income/${id}`);
            this.setState({ successfulDelete: true }, () => console.log("Deleted budget"));
        } catch (error) {
            console.error('Error deleting budget:', error.message);
        }
    };

    render() {
        return (
            <div>
                {this.state.clicked ? (
                    <Redirect to={{ pathname: `/editbudget/${this.state.budgetId}` }} />
                ) : (
                    ""
                )}

                {this.state.successfulDelete ? (
                    <p style={{ color: "#FB4807", marginLeft: "30px", fontSize: "15px" }}>Budget deleted!!</p>
                ) : (
                    ""
                )}

                {this.state.budgets.length > 0 ? (
                    <Table bordered hover size="md" style={{ marginTop: "30px", marginLeft: "30px" }}>
                        <thead style={{ backgroundColor: "#a300cc", color: "white", fontSize: "14px" }}>
                            <tr>
                                <th>Month</th>
                                <th>Amount</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.budgets.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.month || "No Month"}</td>
                                    <td>${item.amount?.toFixed(2) || "No Amount"}</td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: '#00b359' }}
                                            onClick={() => this.editItem(item.id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            style={{ backgroundColor: "#FB4807" }}
                                            onClick={() => this.deleteBudget(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p style={{ marginLeft: "30px" }}>No budget. Please add a budget.</p>
                )}
            </div>
        );
    }
}
