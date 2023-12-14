import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData
    };
  }

  render() {
    return (
      <div className="chart">
        {/* Bar chart component */}
        <Bar
          data={this.state.chartData}
          width="1100px"
          height="400px"
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default BarChart;
