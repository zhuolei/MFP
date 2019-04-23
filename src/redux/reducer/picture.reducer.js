import {CREATE_PICTURE, GET_PICTURE} from '../action/picture.action';

export default function (state = null , action) {
    switch (action.type) {
        case CREATE_PICTURE: 
            if(action.payload.data && action.payload.data.success){
                console.log(action.payload)
                console.log(state)
                return action.payload.data.picture;
            } else {
                return state;
            }
        case GET_PICTURE:
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