export const type = {
    SWITCH_MENU: 'SWITCH_MENU',
    COLLAPSE_MENU: 'COLLAPSE_MENU',
}

export function switchMenu(menuName){
    return {
        type: type.SWITCH_MENU,
        menuName,
    }
}
export function collapseMenu(navCol, mainCol){
    return {
        type: type.COLLAPSE_MENU,
        navCol,
        mainCol,
    }
}