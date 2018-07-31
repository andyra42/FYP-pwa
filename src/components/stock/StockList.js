import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import immutableToJsComponent from '../immutableToJsComponent';

class StockList extends Component {
  render() {
    const {stocks, onStockClick} = this.props;

    return (
      <List>
        {stocks.map((stock) =>
          <ListItem key={stock.code} button onClick={() => onStockClick(stock.code)}>
            <ListItemText primary={stock.name} />
          </ListItem>
        )}
      </List>
    );
  }
}

export default immutableToJsComponent(StockList);
