import React, { Component } from 'react';
import axios from 'axios';
import { Col, Row, Button } from 'react-bootstrap';
import ExpenseCard from '../components/ExpenseCard';
import { Bar } from 'react-chartjs-2';

export default class ViewExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            categories: [],
            itemStart: 0,
            itemEnd: 15,
            token: this.props.token
        };
    }

    // Fetch categories and user expenses on component mount
    componentDidMount() {
        this.getAllCategories();
        this.getExpensesByUser(this.props.currentUserId);
    }

    // Fetch all categories
    getAllCategories = async () => {
        await axios.get(`http://localhost:3000/category`)
            .then(response => {
                this.setState({ categories: response.data.category }, () => console.log("Fetched all categories"), console.log(response.data));
            });
    }

    // Fetch expenses by user
    getExpensesByUser = async (id) => {
        await axios.get(`http://localhost:3000/expense/user/` + id)
            .then(response => {
                this.setState({ expenses: response.data.expenses }, () => console.log("Fetched all expenses for the user"));
            });
    }

    // Fetch expenses by category
    getExpensesByCategory = async (id) => {
        await axios.get(`http://localhost:3000/expense/category/${id}/user/${this.props.currentUserId}`)
            .then(response => {
                this.setState({ expenses: response.data.expenses }, () => console.log("Fetched all expenses for category."));
            });
    }

    // Get category name given category id
    getCategoryName(id) {
        let list = this.state.categories;
        return (list[id - 1].name);
    }

    // Reset item counts for pagination
    resetItemCounts = () => {
        this.setState({ itemStart: 0, itemEnd: 15 });
    }

    // Handle previous button click
    handlePrev = () => {
        const oldStart = this.state.itemStart;
        const oldEnd = this.state.itemEnd;
        this.setState({ itemStart: oldStart - 15, itemEnd: oldEnd - 15 });
    }

    // Handle next button click
    handleNext = () => {
        const oldStart = this.state.itemStart;
        const oldEnd = this.state.itemEnd;
        this.setState({ itemStart: oldStart + 15, itemEnd: oldEnd + 15 });
    }

    // Handle category selection
    handleCategory = async (id) => {
        this.resetItemCounts();
        if (id === 0) {
            return await this.getExpensesByUser(this.props.currentUserId);
        }
        return await this.getExpensesByCategory(id);
    }

    render() {
        const styles = {
            catButton: {
                backgroundColor: "white",
                color: "#D83F87",
                width: '100%',
                border: '1px solid #D83F87',
                borderRadius: '15px',
                marginBottom: '8px',
                fontSize: '15px'
            },
            pageStyles: {
                backgroundColor: "white",
                padding: "20px"
            },
            headerStyles: {
                color: "black",
                fontSize: '20px'
            }
        };

        return (
            <div style={styles.pageStyles}>
                <Row>
                    <Col md={3}>
                        {/* Category section */}
                        <center><h3 style={styles.headerStyles}>EXPENSE BY CATEGORY</h3></center>
                        <hr />
                        <ul style={{ listStyleType: 'none' }}>
                            <li>
                                <button style={styles.catButton} onClick={() => this.handleCategory(0)}>EXPENSES</button>
                            </li>
                            {this.state.categories.map(
                                (c) => <li key={c.id}>
                                    <button style={styles.catButton} onClick={() => this.handleCategory(c.id)}>{c.name}</button>
                                </li>
                            )}
                        </ul>
                    </Col>
                    <Col md={9}>
                        {/* Expense section */}
                        <Row>
                            {this.state.expenses.slice(this.state.itemStart, this.state.itemEnd)
                                .map((e) => <ExpenseCard expenseitem={e} key={e.id} categories={this.state.categories} />)}
                        </Row>
                        <div className="d-flex justify-content-center">
                            {/* Pagination buttons */}
                            <Button className={"me-2 " + (this.state.itemStart === 0 ? "disabled" : '')} style={{ backgroundColor: "#FB4807" }} onClick={() => this.handlePrev()}>{"<< Prev"}</Button>
                            <Button className={" " + (this.state.expenses?.length <= this.state.itemEnd ? "disabled" : '')} style={{ backgroundColor: "#4380C3" }} onClick={() => this.handleNext()}>{"Next >>"}</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
