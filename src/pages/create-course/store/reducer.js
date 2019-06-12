import { message } from "antd";
import { fromJS } from "immutable";
import { ADD_COURSE_FINISH } from "./actionType";

const defaultState = fromJS({

});

const newState = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_COURSE_FINISH:
            if (action.value.code === "200"){
                message.success(action.value.message);
            } else {
                message.warn(action.value.message);
            }
            return state;
        default:
            return state;
    }
};

export default newState;