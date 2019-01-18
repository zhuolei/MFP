import {CREATE_TEAM, GET_TEAMS} from '../action/teamAuth.action';
const initialState = {

}
export default function (oldTeamsState = null, action) {
    let res;
    switch (action.type) {
        case GET_TEAMS:
            return action.payload.data;
        default :
            return oldTeamsState;
    }
}