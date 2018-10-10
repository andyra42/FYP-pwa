import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import immutableToJsComponent from '../immutableToJsComponent';
import Checkbox from '@material-ui/core/Checkbox';

class StockModelList extends Component {
  render() {
    const {models, onModelClick, selected} = this.props;

    return (
      <List>
        {models.map((model, i) => (
          <ListItem
            key={model.modelName}
            dense
            button
            onClick={() => onModelClick(i)}
          >
            <Checkbox
              checked={selected.indexOf(i) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={model.modelName}></ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
}



export default immutableToJsComponent(StockModelList);
