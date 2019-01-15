import {combineReducers} from 'redux';
import SwitchMenuReducer from './switchMenu.reducer';
import AuthReducer from './auth.reducer';
const rootReducer = combineReducers({
    switchMenu: SwitchMenuReducer,
    loggedIn: AuthReducer,
  });
  export default rootReducer;