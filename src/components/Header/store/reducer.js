import { fromJS } from "immutable";
import { ADD_USER_INFO } from "./actionType";

const headerState = fromJS({
    menulist: [],
    userinfo: {} 
});

const state = (state = headerState, action) => {
    if (action.type === ADD_USER_INFO) {
        const userinfo = action.value.userinfo;
        const menulist = action.value.menulist;
        return headerState.set('userinfo', userinfo).set('menulist', menulist);
    }
    return state;
}

export default state;