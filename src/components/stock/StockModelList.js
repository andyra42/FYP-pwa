import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import immutableToJsComponent from '../immutableToJsComponent';

class StockModelList extends Component {
  render() {
    const {models, onModelClick} = this.props;

    return (
      <List>
        {models.map((model, i) =>
          <ListItem key={model.modelName} button onClick={() => onModelClick(i)}>
            <ListItemText primary={model.modelName}></ListItemText>
          </ListItem>
        )}
      </List>
    );
  }
}

export default immutableToJsComponent(StockModelList);
