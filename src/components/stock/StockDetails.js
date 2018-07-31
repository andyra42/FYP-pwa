import React, {Component} from 'react';
import immutableToJsComponent from '../immutableToJsComponent';

class StockDetails extends Component {
  render() {
    const {stock} = this.props;

    return (
      <div>
        <h1>{stock.name} ({stock.code})</h1>
      </div>
    );
  }
}

export default immutableToJsComponent(StockDetails);
