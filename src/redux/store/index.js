
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer/root.reducer'
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default () => createStoreWithMiddleware(reducer, composeWithDevTools())