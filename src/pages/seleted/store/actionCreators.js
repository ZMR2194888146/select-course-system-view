import { INIT_SELECTED_LIST, ADD_SELECTED_LIST } from "./actionTypes";

export const intiSeletedList = (value) => ({
    type: INIT_SELECTED_LIST,
    value
});

export const addSelectedList = (value) => ({
    type: ADD_SELECTED_LIST,
    value
});