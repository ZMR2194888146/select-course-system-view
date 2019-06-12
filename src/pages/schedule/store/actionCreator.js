import {GET_STUDENT_SCHEDULE, HANDLE_STUDENT_SCHEDULE} from "./actionType";

export const toGetStudentSchedule = (value) => ({
    type: GET_STUDENT_SCHEDULE,
    value
});

export const toHandleStudentSchedule = (value) => ({
    type: HANDLE_STUDENT_SCHEDULE,
    value
});