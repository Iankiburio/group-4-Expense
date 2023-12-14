// Import necessary dependencies
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Chart data for the Bar chart
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Budget',
            data: [
              12000, 18000, 24000, 8000, 9000, 11000, 20000, 5000, 21000, 20000, 15000, 11000
            ],
            backgroundColor: ['rgb(153, 51, 255)']
          },
          {
            label: 'Expenses',
            data: [
              10000, 9000, 30000, 6000, 10000, 22000, 1900, 9000, 12000, 8000, 10000, 20000
            ],
            backgroundColor: ['rgb(217, 179, 255)']
          },
          {
            label: 'Savings',
            data: [
              2000, 6000, -6000, 900, 10000, 500, -5000, -100, 2000, 13000, 1500, -8000
            ],
            backgroundColor: ['rgb(255, 209, 26)']
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className="chart" style={{ height: "250px" }}>
        {/* Bar chart component */}
        <Bar
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}
