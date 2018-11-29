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


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    // this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    // this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  
  handleFilterTextChange = (e) => {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange = (e) => {
    this.props.onInStockChange(e.target.checked);
  }
  
  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}


class StockTable extends React.Component {
  
  render() {
    const filterText = this.props.filterText;
    const oriStocksList = this.props.stocks;
    //const filteredStocks=[];
    const onStockClick = this.props.onStockClick;

    oriStocksList.map((stock, index) => {
      console.log("NEW The current iteration is: " + index);
      console.log("NEW The current element is: " + stock.get('name'));
      console.log("\n");
      return 'X';
    });
    console.log("NEW filterText: " + filterText)

    const filteredStocks = oriStocksList.filter((stock) => {
        return stock.get('name').includes(filterText);
    })

    console.log(filteredStocks)

    console.log("NEW onStockClick: "+ this.props.onStockClick)
    
    return (
        <StockList stocks={filteredStocks} onStockClick={this.props.onStockClick} />
    );
  }
}


class FilterableStockTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''

    };
  }

  handleFilterTextChange = (filterText) => {
    this.setState({
      filterText: filterText
    });
  }



  render() {
    const oriStocksList = this.props.stocks;
    const onStockClick = this.props.onStockClick;
    
    console.table(oriStocksList);

    oriStocksList.map((stock, index) => {
      console.log("The current iteration is: " + index);
      console.log("The current element is: " + stock.get('name'));
      console.log("\n");
      return 'X';
    });

    console.log("onStockClick: " + onStockClick);

    return (

      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        
        <StockTable
          stocks = {this.props.stocks}
          filterText={this.state.filterText}
          onStockClick={this.props.onStockClick}
        />
      </div>
    );
  }

}

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
    return (
        <div>
            <FilterableStockTable stocks={this.props.stocks} onStockClick={this.onStockClick}/>
        </div>
        
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomePage));
