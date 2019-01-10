import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './style';
import './index.less';
import Router from './router';
import configStore from './redux/store'
const store = configStore()
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
, document.getElementById('root'));
