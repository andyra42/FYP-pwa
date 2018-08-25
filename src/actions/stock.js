import firebase from 'firebase';
import {fromJS} from 'immutable';
import rp from 'request-promise';

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

export const getStockPrices = (stockCode) => {
  return async (dispatch) => {
    let apiResult;
    try {
      apiResult = await rp({
        uri: `http://localhost:5000/stockPrices/${stockCode}`,
        json: true
      });
    } catch (err) {
      return;
    }

    for (let i = 0; i < apiResult.stockPriceData.length; i++) {
      apiResult.stockPriceData[i][0] = new Date(apiResult.stockPriceData[i][0]);
    }

    dispatch({
      type: 'GET_STOCK_PRICES',
      stockCode: stockCode,
      stockPriceData: fromJS(apiResult.stockPriceData)
    });
  };
};

export const getPredictions = (stockCode) => {
  return async (dispatch) => {
    const apiResult = await rp({
      uri: `http://localhost:5000/predict/${stockCode}`,
      json: true
    });

    dispatch({
      type: 'GET_PREDICTIONS',
      stockCode: stockCode,
      predictions: fromJS(apiResult.predictions),
      models: fromJS(apiResult.models)
    });
  };
};
