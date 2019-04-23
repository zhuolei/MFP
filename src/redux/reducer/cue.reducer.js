import {GET_CUE, CREATE_CUE} from '../action/cue.action';

export default function (state = null , action) {
    switch (action.type) {
        case CREATE_CUE: 
            console.log(action.payload)
            if(action.payload.data && action.payload.data.success){
                return [...state, action.payload.data.cue];
            } else {
                return state;
            }
        case GET_CUE:
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