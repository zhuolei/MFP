import {combineReducers} from 'redux';
import SwitchMenuReducer from './switchMenu.reducer';
import AuthReducer from './auth.reducer';
import TeamAuthReducer from './teamAuth.reducer';
import ProjectsReducer from './projects.reducer';
import ProjectReducer from './project.reducer';
import PictureReducer from './picture.reducer';
import AllUsersReducer from './allusers.reducer';
import CueReducer from './cue.reducer';

const appReducer = combineReducers({
    switchMenu: SwitchMenuReducer,
    loggedIn: AuthReducer,
    teams: TeamAuthReducer,
    projects: ProjectsReducer,
    project: ProjectReducer,
    picture: PictureReducer,
    allUsers: AllUsersReducer,
    cues: CueReducer,
  });
  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
      state = undefined
    }
  
    return appReducer(state, action)
  }
  export default rootReducer;