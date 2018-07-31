import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import './index.css';
import App from './App';
import app from './reducers/app';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(app, applyMiddleware(thunk));

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAroB8dxo0yMVTmd7Ie3pAUJ1Bn-R3Ynz0",
  authDomain: "cmms-fyp.firebaseapp.com",
  databaseURL: "https://cmms-fyp.firebaseio.com",
  projectId: "cmms-fyp",
  storageBucket: "cmms-fyp.appspot.com",
  messagingSenderId: "916436638790"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
