import React, { Component } from 'react';
import PieChart from './PieChart';
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

export default class ExpenseChart extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      categories: []
    };
  }

  // Lifecycle method to fetch data before rendering
  componentWillMount() {
    this.getAllCats();
    this.getChartData();
  }

  // Fetch all categories from the server
  getAllCats = async () => {
    await axios.get(`http://localhost:3000/category`)
      .then(response => {
        this.setState({ categories: response.data.category }, () => console.log("Fetched all categories"), console.log(response.data));
      });
  }

  // Returns category name given cat id
  getCatName(id) {
    for (let i = 0; i < this.state.categories.length; i++) {
      if (this.state.categories[i].id === id)
        return this.state.categories[i].name;
    }
    return "No category";
  }

  // Fetch chart data from the server and update the state
  getChartData = () => {
    axios.get(`http://localhost:3000/expense/user/${localStorage.getItem('currentUserId')}`)
      .then(res => {
        const result = Array.from(res.data.expenses.reduce(
          (m, { category_id, amount }) => m.set(category_id, (m.get(category_id) || 0) + Number(amount)), new Map
        ), ([category_id, amount]) => ({ category_id, amount }));

        let category = [];
        let catamount = [];
        let total = 0;

        for (let i = 0; i < result.length; i++) {
          category.push(this.getCatName(result[i]["category_id"]));
          catamount.push(result[i]["amount"]);
        }

        total = catamount.reduce((a, b) => a + b, 0);
        catamount = catamount.map((x) => ((x / total) * 100).toFixed(2));

        localStorage.setItem('catamount', JSON.stringify(catamount));
        localStorage.setItem('category', JSON.stringify(category));
      });

    this.setState({
      chartData: {
        labels: JSON.parse(localStorage.getItem('category')),
        datasets: [
          {
            label: 'Expenses by Category',
            data: JSON.parse(localStorage.getItem('catamount')),
            backgroundColor: [
              'blue',
              'rgb(255, 209, 26)',
              '#d966ff',
              '#00b359',
              'red',
              '#D83F87',
              '#104CD5',
              '#009879'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="chart" style={{ width: "400px", height: "400px", marginLeft: "290px" }}>
        {/* Display PieChart component */}
        <PieChart chartData={this.state.chartData} />

        {/* Additional information */}
        <p style={{ fontSize: "12px", marginLeft: "130px", marginTop: "20px" }}>**All values are in percentage</p>
        <div style={{ color: "purple", width: "300px", fontSize: "20px", fontWeight: "bold", marginLeft: "130px", marginTop: "30px" }}>Expense Overview</div>
      </div>
    );
  }
}
