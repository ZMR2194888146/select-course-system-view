import { GET_USER_LIST, ADD_USER_LIST, DO_CONFIRM_SHOW, DO_CONFIRM_CANCEL, DO_CONFIRM_OK,
        DID_MANAGER_USER, DO_CHANGE_FRESH_STATU, SHOW_MODAL, DEAL_RESULT } from "./actionType";
import {DO_REGISTER} from "../../add-teacher/store/actionType";

export const getUserList = () =>({
    type: GET_USER_LIST
});

export const addUserList = (value) => ({
    type: ADD_USER_LIST,
    value
});

export const doConfirmShow = (value) => ({
    type: DO_CONFIRM_SHOW,
    value
});

export const doConfirmCancel = () => ({
    type: DO_CONFIRM_CANCEL
});

export const doConfirmOk = (value) => ({
    type: DO_CONFIRM_OK,
    value
});

export const didManagerUser = (value) => ({
    type: DID_MANAGER_USER,
    value
});

export const doChangeFreshStatus = () => ({
   type: DO_CHANGE_FRESH_STATU
});

export const showModal = (value) => ({
    type: SHOW_MODAL,
    value
});

export const dealResult = (value) => ({
    type: DEAL_RESULT,
    value
});

export const doRegisterAdmin = (value) => ({
   type: DO_REGISTER,
   value
});
