import { fromJS } from "immutable";
import { SEND_PASSWORD_INFO, CHECK_MODIFY_RESUALT } from "./actionTypes";
import { message } from "antd";

const passwordState = fromJS({
    password: "",
    isChaged: false
});

const state = (state = passwordState, action) => {
    switch(action.type){
        case SEND_PASSWORD_INFO:
            return state.set('password', action.value);
        case CHECK_MODIFY_RESUALT:
            if (action.value.code === "200") {
                message.success(action.value.message);
            }else{
                message.error(action.value.message);
            }
            return state;
        default:
            return state;
    }
};

export default state;