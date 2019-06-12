import {
    combineReducers
} from "redux-immutable";

import selectcourse from "../pages/selectcourse/store/reducer";
import header from "../components/Header/store/reducer";
import selected from "../pages/seleted/store/reducer";
import schedule from "../pages/schedule/store/reducer";
import courses from "../pages/courses/store/reducer";
import logined from "../pages/login/store/reducer";
import password from "../pages/modify-password/sotre/reducer";
import userlist from "../pages/manager-user/store/reducer";
import addTeacher from "../pages/add-teacher/store/reducer";
import addStudent from "../pages/add-student/store/reducer";
import createCourse from "../pages/create-course/store/reducer";

export default combineReducers({
    header,
    selectcourse,
    selected,
    schedule,
    courses,
    logined,
    password,
    userlist,
    addStudent,
    addTeacher,
    createCourse
});