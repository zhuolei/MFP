import {combineReducers} from 'redux';
import SwitchMenuReducer from './switchMenu.reducer';
import AuthReducer from './auth.reducer';
import TeamAuthReducer from './teamAuth.reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';



const rootReducer = combineReducers({
    switchMenu: SwitchMenuReducer,
    loggedIn: AuthReducer,
    teams: TeamAuthReducer,
  });
  export default rootReducer;