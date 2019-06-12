import { ADD_COURSE, ADD_COURSE_FINISH } from "./actionType";

export const doAddCourse = (value) => ({
   type: ADD_COURSE,
   value
});

export const finishAddCourse = (value) => ({
   type: ADD_COURSE_FINISH,
   value
});