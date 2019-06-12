import { CLICK_LINKED, SHOW_COURSE_INFO, INIT_SELECTABLE_LIST, SEND_SELECT_COURSE, HANDLE_CANCEL, HANDLE_SUCC, CHANGE_REFRESH } from "./actionTypes";

/**
 * 获取数据事件
 */
export const initSelectableList = () => ({
    type: INIT_SELECTABLE_LIST
});

export const clickLink = (value)=>({
    type: CLICK_LINKED,
    value
}) ;

/**
 * 把redux-saga中间件转发过来的数据发送给reducer进行处理
 * @param {json对象} value 
 */
export const showCourseInfo = (value) =>({
    type: SHOW_COURSE_INFO,
    value
});

export const sendSelectCourse = (value) => ({
   type: SEND_SELECT_COURSE,
   value
});

export const doCancelSelect = () => ({
    type: HANDLE_CANCEL
});

export const handleSucc = (value) => ({
    type: HANDLE_SUCC,
    value
});

export const toChangeRefresh = () => ({
    type: CHANGE_REFRESH
});