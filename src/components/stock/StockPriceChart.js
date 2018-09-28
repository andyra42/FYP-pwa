import React, {Component} from 'react';
import LineChart from '../charts/LineChart';
import immutableToJsComponent from '../immutableToJsComponent';
import StockTimeFrame from './StockTimeFrame';
import moment from 'moment';

class StockPriceChart extends Component {
  constructor(props) {
    super(props);

    this.state = {n: 0};
  }

  onTimeFrameClick = (timeFrameStr) => {
    const {prices, predictions, models} = this.props;
    
    // let latestDate = moment(prices[0][0]);

    switch(timeFrameStr) {
      case "1w":
        // var oldestDate = moment(prices[0][0]).subtract(7, 'days');

        this.setState({n: 1})
        break;
      case "1m":
        var text = "I am not a fan of orange.";
        break;
      case "3m":
        var text = "How you like them apples?";
        break;
      default:
        var text = "I have never heard of that fruit...";
    }
  } 

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
      },
      hAxis: {
        viewWindow: {
          max: new Date(),
          min: new Date('2018-08-01')
        }
      }
    };

    return <LineChart data={data} columns={columns} options={options} />;
  }
}

export default immutableToJsComponent(StockPriceChart);
