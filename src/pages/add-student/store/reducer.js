import {fromJS} from "immutable";
import {message} from "antd";
import { DEAL_RESULT } from "./actionType"

const userlistState = fromJS({});

const state = (state = userlistState, action) =>{
    switch(action.type){
        case DEAL_RESULT:
            if (action.value.code === "200"){
                message.success("添加成功");
            }else {
                message.warn(action.value.message);
            }
            return state;
        default:
            return state;
    }
}

export default state;