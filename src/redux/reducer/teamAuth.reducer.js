import {
    CREATE_TEAM,
    GET_TEAMS, 
    INVITE_USER, 
    DELETE_TEAM, 
    GET_ALL_USERS_IN_ONE_TEAM,
} from '../action/teamAuth.action';

export default function (state = null, action) {
    switch (action.type) {
        case CREATE_TEAM:
            // console.log(action.payload)
            if(action.payload.data.success){
                console.log(action.payload)
                return [...state,action.payload.data.team];
            } else {
                return state;
            }
        case GET_TEAMS:
            if(action.payload.data == null) {
                return state;
            } else {
                return action.payload.data;
            }
        
        case GET_ALL_USERS_IN_ONE_TEAM:
            if(action.payload.data == null) {
                return state;
            } else {
                return action.payload.data;
            }
        case INVITE_USER:
            if(action.payload.data.success){
                console.log(action.payload)
                // data.teamList 和 后端return来的值(必须要有对应get()方法 json库才会帮你对应)对应 
                return action.payload.data.teamList;
            } else {
                return state;
            }
        case DELETE_TEAM:
            console.log(action.payload)
            if(action.payload.data.success){
                console.log(action.payload)
                const team = action.payload.data.team;
                const index = state.findIndex(t => t.id === team.id);
                const newTeamState = [...state];
                newTeamState.splice(index, 1);
                console.log(newTeamState)
                return newTeamState;
            } else {
                return state;
            }
        default :
            return state;
    }
}