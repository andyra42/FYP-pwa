import React, {Component} from 'react';
import LineChart from '../charts/LineChart';
import immutableToJsComponent from '../immutableToJsComponent';

class StockPriceChart extends Component {

  render() {
    const {prices, predictions, models, timeInterval, upper, lower, snakes} = this.props;

    let data = prices;
    let columns = [['date', 'Date'], ['number', 'Stock Price']];

    // Append the predictions to the data
    if (predictions && predictions[0]) {
      // Append the nulls
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < predictions.length; j++) {
          for (let k=0; k < (3 + snakes[0].length); k++) //prepare how many series of data to be plotted  
          {
            data[i].push(null);
          }
        }
      }

      let row = [data[0][0], null];
      for (let i = 0; i < predictions.length; i++) {
        for (let j = 0; j < (3 + snakes[0].length); j++) //prepare how many series of data to be plotted 
        {
          row.push(data[0][1]);
        } 
      }

      // initial point for the predictions
      data.push(row);

      let lastDateTimestamp = data[0][0].getTime();
      for (let i = 0; i < predictions[0].length; i++) {
        let row = [new Date(lastDateTimestamp + (i + 1) * 86400000), null];
        for (let j = 0; j < predictions.length; j++) {
          row.push(predictions[j][i], upper[j][i], lower[j][i]);
          for (let k = 0; k < snakes[0].length; k++)
          {
            row.push(null);
          }
        }
        data.push(row);
      }

      for (let i = 0; i < predictions.length; i++) {
        columns.push(
          ['number', models[i].modelName],
          ['number', models[i].modelName + ' Upper Bound'],
          ['number', models[i].modelName + ' Lower Bound'],

        );
        for (let j = 0; j < snakes[0].length; j++)
        {
          columns.push(['number', models[i].modelName + ' snake no. '+ (1+j)]);
        }
      }
    }

    //Put snakes values into 'snakes' columns in chart
    for (let modelIdx = 0; modelIdx < predictions.length; modelIdx++){
      let totalNumOfSnakesVal = snakes[modelIdx].length * snakes[modelIdx][0].length
      for (let snakeIdx = 0; snakeIdx < snakes[modelIdx].length; snakeIdx++)
      {
        for (let valueIdx = 0; valueIdx < snakes[modelIdx][0].length; valueIdx++)
        {
          data[(0 + totalNumOfSnakesVal) - (snakeIdx*snakes[modelIdx].length) -valueIdx][5+modelIdx*13+snakeIdx] = snakes[modelIdx][snakeIdx][valueIdx];
        }
      }
    }

    //Push options for dashed lines and color mod
    let series = [
      // {},
      {color: 'blue'}
    ];

    let colorOptions = ['#0B66B2', '#FFA10E', '#14E84E', '#E614E8', '#FFE62D', '#3EBCE8', '#E8623D', '#FFE045', '#77FF5A', '#AC34FF']
    for (let modelIdx = 0; modelIdx < predictions.length; modelIdx++){
      let modelColor = colorOptions[modelIdx%colorOptions.length];
      series.push({color: modelColor});
      series.push({color: modelColor, lineDashStyle: [4,1]});
      series.push({color: modelColor, lineDashStyle: [4,1]});
      for (let snakeIdx = 0; snakeIdx < snakes[modelIdx].length; snakeIdx++)
      {
        series.push({color: modelColor, lineDashStyle: [4,4]});
      }
    }

    console.log(data)

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
      },
      series: series
    };

    return (
      <LineChart data={data} columns={columns} options={options} />
    )
  }
}

export default immutableToJsComponent(StockPriceChart);
