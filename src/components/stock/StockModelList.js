import React, {Component} from 'react';

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
    marginTop: theme.spacing.unit * 4,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class StockModelList extends Component {
  render() {
    const {models, onModelClick, selected, onModelDetailsClick} = this.props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding='none' style={{ width: '10%' }}></TableCell>
            <TableCell padding='none'>Model</TableCell>
            <TableCell padding='none' style={{textAlign: 'center'}}>Score</TableCell>
            <TableCell padding='none' style={{textAlign: 'center'}}>Prediction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {models.map((model, i) => (
            <TableRow key={i}>
              <TableCell padding='none' onClick={() => onModelClick(i)}>
                <Checkbox
                  checked={selected.indexOf(i) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </TableCell>
              <TableCell padding='none' component="th" scope="row" onClick={() => onModelDetailsClick(i)}>
                <u><b>{model.modelName}</b></u>
              </TableCell>
              <TableCell padding='none' style={{textAlign: 'center'}}>{(model.score * 10).toFixed(2)}</TableCell>
              {
                model.direction === 1 &&
                <TableCell padding='none' style={{ color: 'green', textAlign: 'center' }}>
                  <ArrowUpwardIcon />
                </TableCell>
              }
              {
                model.direction === -1 &&
                <TableCell padding='none' style={{ color: 'red', textAlign: 'center' }}>
                  <ArrowDownwardIcon />
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}



export default immutableToJsComponent(StockModelList);
