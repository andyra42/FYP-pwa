import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import immutableToJsComponent from '../immutableToJsComponent';

class StockTimeFrame extends Component {
  render() {
    const {onTimeFrameClick} = this.props;

    return (
      <div>
        <Button onClick={() => onTimeFrameClick('1w')}>1 Week</Button>
        <Button onClick={() => onTimeFrameClick('1m')}>1 Month</Button>
        <Button onClick={() => onTimeFrameClick('3m')}>3 Months</Button>
        <Button onClick={() => onTimeFrameClick('6m')}>6 Months</Button>
        <Button onClick={() => onTimeFrameClick('1y')}>1 Year</Button>
        <Button onClick={() => onTimeFrameClick('2y')}>2 Years</Button>
      </div>
    );
  }
}

export default immutableToJsComponent(StockTimeFrame);
