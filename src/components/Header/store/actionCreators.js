import { INIT_INFO, ADD_USER_INFO } from "./actionType";

export const initInfo = (value) => ({
    type: INIT_INFO,
    value
});

export const addInfo = (value) => ({
    type: ADD_USER_INFO,
    value
});