import { DO_REGISTER, DEAL_RESULT } from "./actionType";

export const doRegister = (value) =>({
    type: DO_REGISTER,
    value
});

export const dealResult = (value) => ({
    type: DEAL_RESULT,
    value
});