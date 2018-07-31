import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {StockDetails} from '../components/stock';
import {getStock} from '../actions/stock';

const mapStateToProps = (state) => ({
  stock: state.get('stock').get('stockDetails')
});

const mapDispatchToProps = (dispatch) => ({
  getStock: (stockCode) => dispatch(getStock(stockCode))
});

const styles = () => {

};

class DetailsPage extends Component {
  componentDidMount() {
    this.props.getStock(this.props.match.params.stockCode);
  }

  render() {
    return (
      <StockDetails stock={this.props.stock} />
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
