import { ALLUSERS} from '../action/allusers.action';

export default function (state = null, action) {
    switch (action.type) {
        case ALLUSERS:
            if(action.payload.data == null) {
                return state;
            } else {
                return action.payload.data;
            }
        default: 
            return state;
    }    
}