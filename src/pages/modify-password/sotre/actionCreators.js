import { SEND_PASSWORD_INFO, CHECK_MODIFY_RESUALT } from "./actionTypes";

export const sendPasswordInfo = (value) =>({
    type: SEND_PASSWORD_INFO,
    value
});

export const toCheckModifyResult = (value) => ({
    type: CHECK_MODIFY_RESUALT,
    value
})