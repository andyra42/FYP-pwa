import React, {Component} from 'react';
import immutableToJsComponent from '../immutableToJsComponent';

class StockDetails extends Component {
  render() {
    const {stock} = this.props;

    return (
      <div>
        <h1>{stock.name} ({stock.code})</h1>
        <h2>{stock.sector}</h2>
        <h3>{stock.description}</h3>
      </div>
    );
  }
}

export default immutableToJsComponent(StockDetails);
