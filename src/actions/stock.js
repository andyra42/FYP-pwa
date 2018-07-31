import firebase from 'firebase';
import {fromJS} from 'immutable';

export const getStocks = () => {
  return (dispatch) => {
    return firebase.functions().httpsCallable('getStock')({})
        .then((result) => {
          dispatch({
            type: 'GET_STOCKS',
            stocks: fromJS(result.data.stocks),
            stockCodeIndexMap: fromJS(result.data.stockCodeIndexMap)
          });
        });
  };
};

export const getStock = (stockCode) => {
  return (dispatch, getState) => {
    let state = getState();

    if (state.get('stock').get('stockCodeIndexMap').has(stockCode)) {
      dispatch({
        type: 'GET_STOCK',
        stock: state.get('stock').get('stocks').get(state.get('stock').get('stockCodeIndexMap').get(stockCode))
      });
    } else {
      return firebase.functions().httpsCallable('getStock')({stockCode: stockCode})
          .then((result) => {
            dispatch({
              type: 'GET_STOCK',
              stock: fromJS(result.data.stock)
            });
          });
    }
  };
};
