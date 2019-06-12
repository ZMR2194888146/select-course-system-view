import {
    fromJS
} from "immutable";
import {
    SHOW_COURSE_INFO, CLICK_LINKED, HANDLE_CANCEL, HANDLE_SUCC, CHANGE_REFRESH
} from "./actionTypes";

import {message} from "antd";

const defaultState = fromJS({
    //学生可选课程
    selectable: [],
    showCourseInfo: false,
    course: {},
    refresh: false
});

const newState = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_REFRESH:
            return state.set("refresh", !state.get('refesh'));
        case SHOW_COURSE_INFO:
            if (action.value.code === "200") {
                return state.set("selectable", action.value.data);
            }
            message.warn(action.value.message);
            return state;
        case HANDLE_CANCEL:
            return state.set("showCourseInfo", false);
        case HANDLE_SUCC:
            if (action.value.code === "200") {
                message.success(action.value.message);
            } else {
                message.warn(action.value.message);
            }
            return state.set("showCourseInfo", false);
        case CLICK_LINKED:
            let course = {};
            state.get("selectable").forEach(v => {
                if (v.cid === action.value) {
                    course = v;
                }
            });
            return state.set("course", course).set("showCourseInfo", true);
        default:
            return state;
    }

};

export default newState;