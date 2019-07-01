import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './asset/css/main.css'
import './asset/css/util.css'
import './grid.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore,compose, applyMiddleware} from 'redux';
import rootReducer from './store/reducers/rootReducer';
import  {Provider} from 'react-redux';
import thunk from 'redux-thunk'
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));
 
 
 
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
