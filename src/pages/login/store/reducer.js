import { fromJS } from "immutable";
import { TO_CHECK_LOGIN_RESUALT, DO_LOGIN_OUT } from "./actionTypes";
import { message } from "antd";

const loginState = fromJS({
    logined: false,
    usertype: "",
    id: -1
});

const state = (state = loginState, action) => {
    switch (action.type) {
        case TO_CHECK_LOGIN_RESUALT:
            console.log();
            if (action.value.data.succ) {
                return state.set("logined", true)
                    .set("id", action.value.data.userinfo.id).set('usertype', action.value.data.userinfo.usertype);
            }
            message.error(action.value.message);
            return state;
        case DO_LOGIN_OUT:
            return state.set("logined", false);
        default:
            return state;
    }
}

export default state;