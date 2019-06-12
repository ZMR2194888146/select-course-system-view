import { fromJS } from "immutable";
import { message } from "antd";
import { ADD_SELECTED_LIST } from "./actionTypes";

const selectedState = fromJS({
    //学生已选课程
   selectedlist: []
});

const state = (state = selectedState, action) => {
    if (action.type === ADD_SELECTED_LIST) {
        if (action.value.code === "200"){
            const newState = action.value.data;
            return newState;
        }
        message.warn(action.value.message);
        return state;
    }
    return state;
}

export default state;