import React, {Component} from 'react';
import immutableToJsComponent from '../immutableToJsComponent';

class StockGrade extends Component {
  render() {
    return (
      <div>{this.props.grade}</div>
    );
  }
}

export default immutableToJsComponent(StockGrade);
