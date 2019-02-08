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
    let stockPrices;
    try {
      if (process.env.REACT_APP_STOCK_PRICE_SOURCE === 'cloud') {
        const stockPricesRef = firebase.storage().ref(`stock_prices/${stockCode}.json`);

        const downloadUrl = await stockPricesRef.getDownloadURL();

        const stockPricesJsonStr = await rp(downloadUrl);

        stockPrices = JSON.parse(stockPricesJsonStr);
      } else if (process.env.REACT_APP_STOCK_PRICE_SOURCE === 'local') {
        stockPrices = await rp({
          uri: `http://localhost:5000/stockPrices/${stockCode}`,
          json: true
        });
      }
    } catch (err) {
      return;
    }

    for (let i = 0; i < stockPrices.stockPrices.length; i++) {
      stockPrices.stockPrices[i][0] = new Date(stockPrices.stockPrices[i][0]);
    }

    dispatch({
      type: 'GET_STOCK_PRICES',
      stockCode: stockCode,
      stockPriceData: fromJS(stockPrices.stockPrices)
    });
  };
};

export const getPredictions = (stockCode) => {
  return async (dispatch) => {
    let predictions;

    try {
      if (process.env.REACT_APP_PREDICTION_SOURCE === 'cloud') {
        const predictionsRef = firebase.storage().ref(`predictions/${stockCode}/predictions.json`);

        const downloadUrl = await predictionsRef.getDownloadURL();

        const predictionsJsonStr = await rp(downloadUrl);

        predictions = JSON.parse(predictionsJsonStr);
      } else if (process.env.REACT_APP_PREDICTION_SOURCE === 'local') {
        predictions = await rp({
          uri: `http://localhost:5000/predict/${stockCode}`,
          json: true
        });
      }
    } catch (error) {
      console.log(error);

      return;
    }

    dispatch({
      type: 'GET_PREDICTIONS',
      stockCode: stockCode,
      predictions: fromJS(predictions.predictions),
      models: fromJS(predictions.models),
      grade: fromJS(4),
      upper: fromJS(predictions.upper),
      lower: fromJS(predictions.lower)
    });
  };
};
