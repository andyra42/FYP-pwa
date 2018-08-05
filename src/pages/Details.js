import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {StockDetails, StockPriceChart} from '../components/stock';
import {getStock, getStockPrices} from '../actions/stock';

const mapStateToProps = (state, ownProps) => ({
  stock: state.get('stock').get('stockDetails'),
  stockPrices: state.get('stock').get('stockPrices').get(ownProps.match.params.stockCode, null)
});

const mapDispatchToProps = (dispatch) => ({
  getStock: (stockCode) => dispatch(getStock(stockCode)),
  getStockPrices: (stockCode) => dispatch(getStockPrices(stockCode))
});

const styles = () => ({
  stockPriceChart: {
    width: '100%'
  }
});

class DetailsPage extends Component {
  componentDidMount() {
    this.props.getStock(this.props.match.params.stockCode);
    this.props.getStockPrices(this.props.match.params.stockCode);
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <StockDetails stock={this.props.stock} />
        {this.props.stockPrices && <StockPriceChart prices={this.props.stockPrices} className={classes.stockPriceChart} />}
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
