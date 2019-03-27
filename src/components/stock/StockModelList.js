import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import immutableToJsComponent from '../immutableToJsComponent';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';
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
  constructor(props) {
    super(props);

    this.state = {
      sortColumn: null,
      sortDirection: 'asc'
    };
  }
  
  onHeaderClick = (columnName) => {
    this.setState((oldState) => {
      let newSortDirection = null;
      if (oldState.sortDirection === 'desc') {
        newSortDirection = 'asc';
      } else {
        newSortDirection = 'desc';
      }

      return {
        sortColumn: columnName,
        sortDirection: newSortDirection
      };
    });
  }

  sort = (models, column, direction) => {
    if (column === null || direction === null) {
      return models;
    }
    
    return models.sort((m1, m2) => {
      if (m1[column] > m2[column]) {
        return 1 * direction;
      } else if (m1[column] < m2[column]) {
        return -1 * direction;
      } else {
        return 0;
      }
    });
  }

  render() {
    // const { models, onModelClick, selected, onModelDetailsClick, order, orderBy } = this.props;
    const { models, threshold, onModelClick, selected, onModelDetailsClick } = this.props;
    const {sortColumn, sortDirection} = this.state;

    const modelsSorted = this.sort(
      JSON.parse(JSON.stringify(models)),
      sortColumn,
      (sortDirection === 'asc') ? 1 : -1
    );

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding='none' style={{ width: '10%' }}></TableCell>
            <TableCell padding='none'>
              <TableSortLabel
                active={sortColumn === 'modelName'}
                direction={sortDirection}
                onClick={() => this.onHeaderClick('modelName')}
              >
                Model
              </TableSortLabel>
            </TableCell>
            <TableCell padding='none' style={{ textAlign: 'center' }}>
              <TableSortLabel
                active={sortColumn === 'score'}
                direction={sortDirection}
                onClick={() => this.onHeaderClick('score')}
              >
                Score
              </TableSortLabel>
            </TableCell>
            <TableCell padding='none' style={{ textAlign: 'center' }}>
              <TableSortLabel
                active={sortColumn === 'percentageChange'}
                direction={sortDirection}
                onClick={() => this.onHeaderClick('percentageChange')}
              >
                Prediction
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modelsSorted.map((model, i) => (
            <TableRow key={i}>
              <TableCell padding='none' onClick={() => onModelClick(model.modelIndex)}>
                <Checkbox
                  checked={selected.indexOf(model.modelIndex) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </TableCell>
              <TableCell padding='none' component="th" scope="row" onClick={() => onModelDetailsClick(i)}>
                <u><b>{model.modelName}</b></u>
              </TableCell>
              <TableCell padding='none' style={{ textAlign: 'center' }}>{(model.score * 10).toFixed(2)}</TableCell>
              {
                model.percentageChange > 0 &&
                <TableCell padding='none' style={{ color: 'green', textAlign: 'center' }}>
                  <ArrowUpwardIcon /> {'+' + (model.percentageChange * 100).toFixed(2) + '%'}
                </TableCell>
              }
              {
                model.percentageChange < 0 &&
                <TableCell padding='none' style={{ color: 'red', textAlign: 'center' }}>
                  <ArrowDownwardIcon /> {(model.percentageChange * 100).toFixed(2) + '%'}
                </TableCell>
              }
              {
                model.percentageChange === 0 &&
                <TableCell padding='none' style={{ color: 'grey', textAlign: 'center' }}>
                  <RemoveIcon /> {(model.percentageChange * 100).toFixed(2) + '%'}
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
