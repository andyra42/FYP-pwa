import React, {Component} from 'react';
import LineChart from '../charts/LineChart';
import immutableToJsComponent from '../immutableToJsComponent';

class StockPriceChart extends Component {

  render() {
    const {prices, predictions, models, timeInterval, upper, lower} = this.props;

    let data = prices;
    let columns = [['date', 'Date'], ['number', 'Stock Price']];

    // Append the predictions to the data
    if (predictions && predictions[0]) {
      // Append the nulls
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < predictions.length; j++) {
          data[i].push(null, null, null);
        }
      }

      let row = [data[0][0], null];
      for (let i = 0; i < predictions.length; i++) {
        row.push(data[0][1], data[0][1], data[0][1]);
      }

      // initial point for the predictions
      data.push(row);

      let lastDateTimestamp = data[0][0].getTime();
      for (let i = 0; i < predictions[0].length; i++) {
        let row = [new Date(lastDateTimestamp + (i + 1) * 86400000), null];
        for (let j = 0; j < predictions.length; j++) {
          row.push(predictions[j][i], upper[j][i], lower[j][i]);
        }
        data.push(row);
      }

      for (let i = 0; i < predictions.length; i++) {
        columns.push(
          ['number', models[i].modelName],
          ['number', models[i].modelName + ' Upper Bound'],
          ['number', models[i].modelName + ' Lower Bound']
        );
      }
    }

    const options = {
      chart: {
        title: 'Stock Price'
      },
      legend: {
        position: 'none'
      },
      hAxis: {
        viewWindow: {
          min: timeInterval
        },
        gridlines: {
          color: 'transparent'
        }
      }
    };

    return (
      <LineChart data={data} columns={columns} options={options} />
    )
  }
}

export default immutableToJsComponent(StockPriceChart);
