
import { type } from '../action/switchMenu.action'
const initialState = {
    menuName:'Profile'
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            }
            
        default:
            return {
                ...state
            }
            
    }
}