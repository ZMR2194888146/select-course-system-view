import { GET_CREATED_COURSE_LIST, ADD_CREATED_COURSE_LIST, TO_SHOW_COURSE_INFO,
        CHANGE_SHOW_INFO_STATUE, CONFIRM_DELETE_COURSE, HANDLE_RESULT, DO_NOT_FRESH } from "./actionTypes";

export const getCreatedCourseList = (value) =>({
    type: GET_CREATED_COURSE_LIST,
    value
});

export const toAddCreatedCourseList = (value) => ({
    type: ADD_CREATED_COURSE_LIST,
    value
});

export const gotoShowCoure = (value) => ({
    type: TO_SHOW_COURSE_INFO,
    value
});

export const doNotShowCourse = () => ({
    type: CHANGE_SHOW_INFO_STATUE
});

export const doDeleteCourse = (value) => ({
    type: CONFIRM_DELETE_COURSE,
    value
});

export const doHandleResult = (value) => ({
   type: HANDLE_RESULT,
   value
});

export const changeFreshStatus = () => ({
    type: DO_NOT_FRESH
});