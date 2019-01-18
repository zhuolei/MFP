
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducer/root.reducer'
import ReduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension'
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
    whitelist: ['loggedIn'],
    blacklist: ['switchMenu', 'teams']
  };

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const persistedReducer = persistReducer(persistConfig, reducer);  // 包装rootReducer
export const store = createStoreWithMiddleware(persistedReducer, composeWithDevTools());     // 传递给createStore函数 这个export
export const persistor = persistStore(store);  // 包装store 这个也export

// export default () => {
//     let store = createStoreWithMiddleware(persistedReducer, composeWithDevTools())
//     let persistor = persistStore(store)
//     return {store, persistor}
// }
// export default () => createStoreWithMiddleware(reducer, composeWithDevTools())