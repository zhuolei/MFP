import {GET_PROJECTS, CREATE_PROJECT} from '../action/projects.action';

export default function (state = null, action) {
    switch (action.type) {
        case GET_PROJECTS:
            console.log(action.payload.data)
            if(action.payload.data == null) {
                console.log(state);
                return state;
            } else  {
                return action.payload.data;
            }
        case CREATE_PROJECT:
            if(action.payload.data.success){
                console.log(action.payload)
                console.log(state)
                return [...state,action.payload.data.project];
            } else {
                return state;
            }
        default:
        return state;
    }
}