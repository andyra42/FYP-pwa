import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {StockList} from '../components/stock';
import {getStocks} from '../actions/stock';

const mapStateToProps = (state) => ({
  stocks: state.get('stock').get('stocks')
});

const mapDispatchToProps = (dispatch) => ({
  getStocks: () => dispatch(getStocks())
});

const styles = () => ({

});

class HomePage extends Component {
  onStockClick = (stockCode) => {
    this.props.history.push(`/stockDetails/${stockCode}`);
  };

  componentDidMount() {
    this.props.setLoading(true);
    this.props.getStocks()
        .then(() => {
          this.props.setLoading(false);
        });
  }

  render() {
    return <StockList stocks={this.props.stocks} onStockClick={this.onStockClick} />;
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomePage));
