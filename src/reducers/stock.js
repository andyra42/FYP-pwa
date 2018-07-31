import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({stocks: [], stockCodeIndexMap: {}, stockDetails: {}});

const stock = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_STOCKS':
      return state.set('stocks', action.stocks).set('stockCodeIndexMap', action.stockCodeIndexMap);
    case 'GET_STOCK':
      return state.set('stockDetails', action.stock);
    default:
      return state;
  }
};

export default stock;
