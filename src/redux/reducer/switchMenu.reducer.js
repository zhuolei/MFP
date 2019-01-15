
import { type } from '../action/switchMenu.action'
const initialState = {
    menuName:'Profile',
    navCol: 5,
    mainCol: 19
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            }
        case type.COLLAPSE_MENU:
            return {
                ...state,
                navCol: action.navCol,
                mainCol: action.mainCol,
            }
        default:
            return {
                ...state
            }
            
    }
}