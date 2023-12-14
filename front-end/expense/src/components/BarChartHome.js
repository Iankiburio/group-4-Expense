import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChartHome extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // Chart data for the Bar chart
      chartData: this.props.chartData
    };
  }

  render() {
    return (
      <div className="chart">
        {/* Bar chart component */}
        <Bar
          data={this.state.chartData}
          options={{
            // Uncomment the line below if you want to disable maintaining aspect ratio
            // maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default BarChartHome;
