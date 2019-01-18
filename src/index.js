import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom';
import './style';
import './index.less';
import Router from './router';
// import configStore from './redux/store'
import {store} from './redux/store'
import {persistor} from './redux/store/index'
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router />
        </PersistGate> 
    </Provider>
, document.getElementById('root'));
