import React, {Component} from 'react';
import LineChart from '../charts/LineChart';
import immutableToJsComponent from '../immutableToJsComponent';

class StockPriceChart extends Component {
  render() {
    const {prices, predictions, models} = this.props;

    let data = prices;
    let columns = [['date', 'Date'], ['number', 'Stock Price']];

    if (predictions) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < predictions.length; j++) {
          data[i].push(null);
        }
      }

      let lastDateTimestamp = data[0][0].getTime();
      for (let i = 0; i < predictions[0].length; i++) {
        let row = [new Date(lastDateTimestamp + (i + 1) * 86400000), null];
        for (let j = 0; j < predictions.length; j++) {
          row.push(predictions[j][i]);
        }
        data.push(row);
      }

      for (let i = 0; i < predictions.length; i++) {
        columns.push(['number', models[i].modelName]);
      }
    }

    const options = {
      chart: {
        title: 'Stock Price'
      },
      legend: {
        position: 'none'
      }
    };

    return <LineChart data={data} columns={columns} options={options} />;
  }
}

export default immutableToJsComponent(StockPriceChart);
