import {GET_PROJECT} from '../action/project.action';

export default function (state = null, action) {
    switch (action.type) {
        case GET_PROJECT: 
            console.log(action.payload.data);
            if(action.payload.data == null) {
                console.log(state);
                return state;
            } else  {
                return action.payload.data;
            }
        default:
            return state;
    }
}