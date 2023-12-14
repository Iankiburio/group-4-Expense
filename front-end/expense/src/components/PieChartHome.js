import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PieChartHome extends Component {
  constructor(props) {
    super(props);

    // Set the initial state with chart data from props
    this.state = {
      chartData: this.props.chartData
    };
  }

  render() {
    return (
      <div className="chart">
        {/* Pie chart component */}
        <Pie
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default PieChartHome;
