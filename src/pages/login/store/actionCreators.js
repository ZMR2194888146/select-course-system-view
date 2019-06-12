import { SEND_USERINFO_TO_SERVER, TO_CHECK_LOGIN_RESUALT, DO_LOGIN_OUT } from "./actionTypes";

export const sendUserinf = (value) =>({
    type: SEND_USERINFO_TO_SERVER,
    value
});

export const checkLoginResualt = (value) => ({
    type: TO_CHECK_LOGIN_RESUALT,
    value
});

export const doLoginOut = () =>({
    type: DO_LOGIN_OUT
})