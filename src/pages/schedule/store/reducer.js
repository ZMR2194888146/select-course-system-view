import {fromJS} from "immutable";
import {message} from "antd";
import {HANDLE_STUDENT_SCHEDULE} from "./actionType";

const defaultState = fromJS({
    schedule: []
});

const newState = (state = defaultState, action) => {
    switch (action.type) {
        case HANDLE_STUDENT_SCHEDULE:
            if (action.value.code === "200") {
                return state.set("schedule", action.value.data);
            } else {
                message.info("no course was selected");
                return state;
            }
        default:
            return state;
    }
};

export default newState;