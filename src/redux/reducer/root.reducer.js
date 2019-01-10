import {combineReducers} from 'redux';
import SwitchMenuReducer from './switchMenu.reducer'
const rootReducer = combineReducers({
    switchMenu: SwitchMenuReducer,
  });
  export default rootReducer;