import React, {Component} from 'react';
import LineChart from '../charts/LineChart';
import immutableToJsComponent from '../immutableToJsComponent';

class StockPriceChart extends Component {
  render() {
    const {prices} = this.props;

    let data = prices;
    const options = {
      chart: {
        title: 'Stock Price'
      },
      legend: {
        position: 'none'
      }
    };

    return <LineChart data={data} options={options} />;
  }
}

export default immutableToJsComponent(StockPriceChart);
