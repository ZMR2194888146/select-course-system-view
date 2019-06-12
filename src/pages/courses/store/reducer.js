import {
    fromJS
} from "immutable";
import { message } from "antd";
import { ADD_CREATED_COURSE_LIST, TO_SHOW_COURSE_INFO, CHANGE_SHOW_INFO_STATUE, HANDLE_RESULT, DO_NOT_FRESH } from "./actionTypes";

const courseState = fromJS({
    courses: [],
    wantShowInfo: false,
    courseInfo: { },
    fresh: false
});

const state = (state = courseState, action) => {
    switch (action.type) {
        case ADD_CREATED_COURSE_LIST:
            if (action.value.code === "200"){
                const courselist = action.value.data;
                return courseState.set("courses", courselist);
            }
            message.warn("获取课程列表失败");
            return state;
        case TO_SHOW_COURSE_INFO:
            let courseInfo = {};
            state.get("courses").forEach(element => {
                if (element.code === action.value) {
                    courseInfo = element;
                }
            });
            return state.set("wantShowInfo", true).set("courseInfo", courseInfo);
        case CHANGE_SHOW_INFO_STATUE:
            return state.set("wantShowInfo", false);
        case HANDLE_RESULT:
            if (action.value.code === "200") {
                message.success(action.value.message);
            }else {
                message.warn(action.value.message);
            }
            return state.set("fresh", true);
        case DO_NOT_FRESH:
            return state.set("fresh", false);
        default:
            return state;
    }
}

export default state;