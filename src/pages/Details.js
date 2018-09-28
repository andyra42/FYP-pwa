import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {StockDetails, StockPriceChart, StockModelList, StockGrade} from '../components/stock';
import {getStock, getStockPrices, getPredictions} from '../actions/stock';

const mapStateToProps = (state, ownProps) => ({
  stock: state.get('stock').get('stockDetails'),
  stockPrices: state.get('stock').get('stockPrices').get(ownProps.match.params.stockCode, null),
  predictions: state.getIn(['stock', 'predictions', ownProps.match.params.stockCode], null),
  models: state.getIn(['stock', 'models', ownProps.match.params.stockCode], null),
  grade: state.getIn(['stock', 'grade', ownProps.match.params.stockCode], null)
});

const mapDispatchToProps = (dispatch) => ({
  getStock: (stockCode) => dispatch(getStock(stockCode)),
  getStockPrices: (stockCode) => dispatch(getStockPrices(stockCode)),
  getPredictions: (stockCode) => dispatch(getPredictions(stockCode))
});

const styles = () => ({
  stockPriceChart: {
    width: '100%'
  },
  stockModelList: {
    width: '100%'
  },
  stockGrade: {
    width: '100%'
  }
});

class DetailsPage extends Component {
  componentDidMount() {
    this.props.setLoading(true);
    Promise.all([
      this.props.getStock(this.props.match.params.stockCode),
      this.props.getStockPrices(this.props.match.params.stockCode),
      this.props.getPredictions(this.props.match.params.stockCode)
    ])
    .then(() => {
      this.props.setLoading(false);
    });
  }

  render() {
    const {stock, stockPrices, predictions, models, grade, classes} = this.props;

    return (
      <div>
        <StockDetails stock={stock} />
        {
          stockPrices &&
          <StockPriceChart
            prices={stockPrices}
            predictions={predictions}
            models={models}
            className={classes.stockPriceChart} />
        }
        {
          grade &&
          <StockGrade
            grade={grade}
            className={classes.stockGrade} />
        }
        {
          models &&
          <StockModelList
            models={models}
            className={classes.stockModelList} />
        }
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
