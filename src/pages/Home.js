import React, {Component} from 'react';
import {Map, OrderedMap} from 'immutable';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {StockList} from '../components/stock';
import {getStocks} from '../actions/stock';
import {updateUserProfile} from '../actions/auth';

const mapStateToProps = (state) => ({
  stocks: state.get('stock').get('stocks'),
  stock_access_freq: state.getIn(['auth', 'userProfile', 'stock_access_freq'], Map()),
  favourites: state.getIn(['auth', 'userProfile', 'favourites'], Map())
});

const mapDispatchToProps = (dispatch) => ({
  getStocks: () => dispatch(getStocks()),
  updateUserProfile: userProfile => dispatch(updateUserProfile(userProfile))
});

const styles = () => ({

});


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
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
    const { 
		stocks,
		filterText, 
		oriStocksList, 
		onStockClick, 
		onAddFavouriteStock,
		isFavourite
	} = this.props;

    const filteredStocks = stocks.filter((stock) => {
        return stock.get('name').includes(filterText);
    })

    return (
        <StockList 
		  isFavourite={isFavourite}
		  stocks={filteredStocks} 
		  onStockClick={this.props.onStockClick} 
		  onAddFavouriteStock={this.props.onAddFavouriteStock}
		/>
    );
  }
}


export class FilterableStockTable extends React.Component{
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
	const {
	  stocks,
	  favourites,
	  onStockClick,
	  onAddFavouriteStock,
	  favouriteOnly,
	  recent,
	  recentOnly
	} = this.props;

	console.log('favourite, ' + favouriteOnly);

	const favouriteStocks = stocks.filter((stock) => {
	  return favourites.hasIn([stock.get('code')]);
	});

	const nonFavouriteStocks = stocks.filter((stock) => {
	  return !favourites.hasIn([stock.get('code')]);
	});
	
	const otherStocks = nonFavouriteStocks.filter((stock) => {
	  return !recent.hasIn([stock.get('code')]); 
	});
	
	const recentStocks = nonFavouriteStocks.filter((stock) => {
	  return recent.hasIn([stock.get('code')]);
	});

    return (

      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        
		{
		  !recentOnly &&
		  favouriteStocks.count() > 0 &&
		  <React.Fragment>
		    <h3>Favourites</h3>
            <StockTable
			  isFavourite={true}
              stocks={favouriteStocks}
              filterText={this.state.filterText}
              onStockClick={onStockClick}
		      onAddFavouriteStock={onAddFavouriteStock(false)}
            />
		    <Divider />
		  </React.Fragment>
	    }	


		{
		  !favouriteOnly &&
		  recentStocks.count() > 0 &&
		  <React.Fragment>
		    <h3>Recent</h3>
		    <StockTable
			  isFavourite={false}
		      stocks={recentStocks}
		      filterText={this.state.filterText}
		      onStockClick={onStockClick}
		      onAddFavouriteStock={onAddFavouriteStock(true)}
		    />
			<Divider />
		  </React.Fragment>
		}

		{
		  !favouriteOnly &&
		  !recentOnly &&
		  otherStocks.count() > 0 &&
		  <React.Fragment>
		    <h3>Others</h3>
		    <StockTable
			  isFavourite={false}
		      stocks={otherStocks}
		      filterText={this.state.filterText}
		      onStockClick={onStockClick}
		      onAddFavouriteStock={onAddFavouriteStock(true)}
		    />
		  </React.Fragment>
		}

      </div>
    );
  }

}

class HomePage extends Component {
  onStockClick = (stockCode) => {
    this.props.history.push(`/stockDetails/${stockCode}`);
	
	// Discount old frequencies to favour newly clicked stocks
    const discounted = this.props.stock_access_freq.map((freq) =>
	  freq *= 0.9
	);
	this.props.updateUserProfile({
	  stock_access_freq: discounted.set(stockCode, discounted.get(stockCode, 0) + 1).toJS()
	});
  };

  onAddFavouriteStock = (isAdd) => {
	const { favourites } = this.props;
	if (isAdd) {
	  return (stockCode) => {
	    this.props.updateUserProfile({
		  favourites: favourites.set(stockCode, 1).toJS()
		});
      }
	}
	return (stockCode) => {
	  this.props.updateUserProfile({
		favourites: favourites.removeIn([stockCode]).toJS()
	  });
	}
  }

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
        <FilterableStockTable 
		  favouriteOnly={this.props.favouriteOnly}
		  favourites={this.props.favourites}
		  recentOnly={this.props.recentOnly}
		  recent={this.props.stock_access_freq.sort((a, b) => b - a).take(5)}
		  stocks={this.props.stocks} 
		  onStockClick={this.onStockClick}
		  onAddFavouriteStock={this.onAddFavouriteStock}
		/>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomePage));
