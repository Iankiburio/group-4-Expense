import React, { Component } from 'react';
import BarChart from './BarChart';
import axios from 'axios';

// Import necessary dependencies for charting
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default class IncomeChart extends Component {
    constructor() {
        super();

        // Define months array
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // Initialize data arrays
        let budgetData = new Array(12).fill(0);
        let expenseData = new Array(12).fill(0);
        let savings = [];

        // Fetch budget data
        axios.get(`http://localhost:3000/income/user/${localStorage.getItem('currentUserId')}`)
            .then(res => {
                for (let i = 0; i < res.data.incomes.length; i++) {
                    const monthIndex = months.indexOf(res.data.incomes[i]["month"]);
                    if (monthIndex !== -1) {
                        budgetData.splice(monthIndex, 1, res.data.incomes[i]["amount"]);
                    }
                }
                localStorage.setItem('budgetData', JSON.stringify(budgetData));
            })
            .catch(error => {
                console.error("Error fetching user income data: ", error);
            });

        // Fetch expense data
        axios.get(`http://localhost:3000/expense/user/${localStorage.getItem('currentUserId')}`)
            .then(res => {
                const result = Array.from(res.data.expenses.reduce(
                    (m, { month, amount }) => m.set(month, (m.get(month) || 0) + Number(amount)), new Map()
                ), ([month, amount]) => ({ month, amount }));

                for (let i = 0; i < result.length; i++) {
                    const monthIndex = months.indexOf(result[i]["month"]);
                    if (monthIndex !== -1) {
                        expenseData.splice(monthIndex, 1, result[i]["amount"]);
                    }
                }
                localStorage.setItem('expenseData', JSON.stringify(expenseData));
            });

        // Calculate savings
        const budgetDataChart = JSON.parse(localStorage.getItem('budgetData'));
        const expenseDataChart = JSON.parse(localStorage.getItem('expenseData'));

        if (budgetDataChart != null && expenseDataChart != null) {
            for (let i = 0; i <= budgetDataChart.length - 1; i++) {
                savings.push((budgetDataChart[i]) - (expenseDataChart[i]));
            }
        }

        // Set initial state
        this.state = {
            chartData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Budget',
                        data: budgetDataChart,
                        backgroundColor: ['blue']
                    },
                    {
                        label: 'Expense',
                        data: expenseDataChart,
                        backgroundColor: ['rgb(217, 179, 255)']
                    },
                    {
                        label: 'Savings',
                        data: savings,
                        backgroundColor: ['#80bfff']
                    },
                ]
            }
        };
    }

    render() {
        return (
            <div className="IncomeChart" style={{ width: "1000px", height: "350px" }}>
                <BarChart chartData={this.state.chartData} legendPosition="bottom" />
                <p style={{ color: "purple", fontSize: "20px", fontWeight: "bold", marginLeft: "470px", marginTop: "60px" }}>Yearly Overview</p>
            </div>
        );
    }
}
