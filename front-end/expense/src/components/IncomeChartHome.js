import React, { Component } from 'react';
import BarChartHome from './BarChartHome';
import axios from 'axios';

// Import necessary dependencies for charting
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export default class IncomeChartHome extends Component {
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
            });

        // Fetch expense data
        axios.get(`http://localhost:3000/expense/user/${localStorage.getItem('currentUserId')}`)
            .then(res => {
                // Sum of amount for a specific month
                const result = Array.from(res.data.expenses.reduce(
                    (m, { month, amount }) => m.set(month, (m.get(month) || 0) + Number(amount)), new Map()
                ), ([month, amount]) => ({ month, amount }));

                for (let i = 0; i < result.length; i++) {
                    const monthIndex = months.indexOf(result[i]["month"]);
                    if (monthIndex !== -1) {
                        expenseData.splice(monthIndex, 1, result[i]["amount"]);
                    }
                }
            });

        // Fetch data from localStorage
        const budgetDataChart = JSON.parse(localStorage.getItem('budgetdata')) || [];
        const expenseDataChart = JSON.parse(localStorage.getItem('expensedata')) || [];

        // Calculate savings
        if (budgetDataChart.length !== 0 && expenseDataChart.length !== 0) {
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
                        data: budgetData.length !== 0 ? budgetData : budgetDataChart,
                        backgroundColor: ['blue'],
                        barPercentage: 0.8
                    },
                    {
                        label: 'Expense',
                        data: expenseData.length !== 0 ? expenseData : expenseDataChart,
                        backgroundColor: ['rgb(217, 179, 255)'],
                        barPercentage: 0.8
                    },
                    // {
                    //     label: 'Savings',
                    //     data: savings.length !== 0 ? savings : JSON.parse(localStorage.getItem('savingsdata')) || [],
                    //     backgroundColor: ['#80bfff']
                    // },
                ]
            }
        };
    }

    render() {
        return (
            <div className="chart" style={{ width: "670px", height: "150px" }}>
                <BarChartHome chartData={this.state.chartData} />
            </div>
        );
    }
}
