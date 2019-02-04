import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import immutableToJsComponent from '../immutableToJsComponent';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
// import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

class StockModelList extends Component {
  render() {
    const {models, onModelClick, selected} = this.props;
    
    return (
      <List>
        {models.map((model, i) => [
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
            <ListItemText primary={model.score.toFixed(2)}></ListItemText>
            {
              model.direction == 1 && 
              <ListItemIcon style={{ color: 'green' }}>
                <ArrowUpwardIcon />
              </ListItemIcon>
            }
            {
              model.direction == 0 &&
              <ListItemIcon style={{ color: 'red' }}>
                <ArrowDownwardIcon />
              </ListItemIcon>
            }
          </ListItem>,
          <Divider key={i}/>
        ])}
      </List>
    );
  }
}



export default immutableToJsComponent(StockModelList);
