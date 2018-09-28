import React, {Component} from 'react';
import LineChart from '../charts/LineChart';
import immutableToJsComponent from '../immutableToJsComponent';
import StockTimeFrame from './StockTimeFrame';
import moment from 'moment';

class StockPriceChart extends Component {
  constructor(props) {
    super(props);

    this.state = {timeInterval: moment().subtract(3, 'months').toDate()};
  }

  onTimeFrameClick = (timeFrameStr) => {
    const {prices, predictions, models} = this.props;
    
    let timeInterval = moment();

    switch(timeFrameStr) {
      case "1w":
        timeInterval = timeInterval.subtract(7, 'days');
        break;
      case "1m":
        timeInterval = timeInterval.subtract(1, 'months');
        break;
      case "3m":
        timeInterval = timeInterval.subtract(3, 'months');
        break;
      case "6m":
        timeInterval = timeInterval.subtract(6, 'months');
        break;
      case "1y":
        timeInterval = timeInterval.subtract(1, 'years');
        break;
      case "2y":
        timeInterval = timeInterval.subtract(2, 'years');
        break;
      default:
        timeInterval = timeInterval.subtract(5, 'years');
    }
    this.setState({timeInterval: timeInterval.toDate()});
    console.log(this.state)
  } 

  render() {
    const {prices, predictions, models} = this.props;

    let data = prices;
    let columns = [['date', 'Date'], ['number', 'Stock Price']];

    if (predictions) {
      // Append the predictions to the data
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < predictions.length; j++) {
          data[i].push(null);
        }
      }

      data.push(
        [data[0][0], null, data[0][1], data[0][1]]
       )

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
      },
      hAxis: {
        viewWindow: {
          min: this.state.timeInterval
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
