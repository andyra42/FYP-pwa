import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import immutableToJsComponent from '../immutableToJsComponent';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
// import LinearGradient from 'react-native-linear-gradient'; // Only if no expo

const classes = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class StockModelList extends Component {
  render() {
    let id = 0;
    function createData(name, calories, fat, carbs, protein) {
      id += 1;
      return { id, name, calories, fat, carbs, protein };
    }

    const rows = [
      createData('Frozen yoghurt', 159, 6.0, 24),
      createData('Ice cream sandwich', 237, 9.0, 37),
      createData('Eclair', 262, 16.0, 24),
      createData('Cupcake', 305, 3.7, 67),
      createData('Gingerbread', 356, 16.0, 49),
    ];
    
    // function onAllModelClick() {
    //   models
    // }

    const {models, onModelClick, selected} = this.props;
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Model</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Prediction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model, i) => (
            <TableRow key={model.modelName}>
              <TableCell onClick={() => onModelClick(i)}>
                <Checkbox
                  checked={selected.indexOf(i) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {model.modelName}
              </TableCell>
              <TableCell align="right">{model.score.toFixed(2)}</TableCell>
              {
                model.direction == 1 &&
                <TableCell style={{ color: 'green' }}>
                  <ArrowUpwardIcon />
                </TableCell>
              }
              {
                model.direction == 0 &&
                <TableCell style={{ color: 'red' }}>
                  <ArrowDownwardIcon />
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
    // return (
    //   <List>
    //     {models.map((model, i) => [
    //       <ListItem
    //         key={model.modelName}
    //         dense
    //         button
    //         onClick={() => onModelClick(i)}
    //       >
    //         <Checkbox
    //           checked={selected.indexOf(i) !== -1}
    //           tabIndex={-1}
    //           disableRipple
    //         />
    //         <ListItemText primary={model.modelName}></ListItemText>
    //         <ListItemText primary={model.score.toFixed(2)}></ListItemText>
    //         {
    //           model.direction == 1 && 
    //           <ListItemIcon style={{ color: 'green' }}>
    //             <ArrowUpwardIcon />
    //           </ListItemIcon>
    //         }
    //         {
    //           model.direction == 0 &&
    //           <ListItemIcon style={{ color: 'red' }}>
    //             <ArrowDownwardIcon />
    //           </ListItemIcon>
    //         }
    //       </ListItem>,
    //       <Divider key={i}/>
    //     ])}
    //   </List>
    // );
  }
}



export default immutableToJsComponent(StockModelList);
