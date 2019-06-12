import {
    takeEvery,
    put
} from "redux-saga/effects";
import Axios from "axios";

import {actionType as headerActionTypes, actionCreators as headerActionCreators} from "../components/Header/store";
import {actionTypes as selectedActionTypes, actionCreators as selectedActionCreators} from "../pages/seleted/store";
import {actionTypes as coursesActionTypes, actionCreators as coursesActionCreators} from "../pages/courses/store";
import {actionCreators as loginActionCreators, actionTypes as loginActionTypes} from "../pages/login/store";
import {actionCreators as modifyActionCreators, actionTypes as modifyActionTypes} from "../pages/modify-password/sotre";
import {actionCreators as managerActionCreator, actionType as managerActionType} from "../pages/manager-user/store";
import {actionCreators as scActionCreator, actionTypes as scActionType} from "../pages/selectcourse/store";
import {actionCreator as scheduleActionCreator, actionType as scheduleActionType} from "../pages/schedule/store";
import {
    actionCreator as createCourseActionCreator,
    actionType as createCourseActionType
} from "../pages/create-course/store";
import {
    actionTypes as selectcourseActionTypes,
    actionCreators as selectcourseActionCreators
} from "../pages/selectcourse/store";
import {DO_REGISTER} from "../pages/add-teacher/store/actionType";
import * as teacherActionCreator from "../pages/add-teacher/store/actionCreators";
import * as studentActionCreator from "../pages/add-student/store/actionCreators";

/**
 * 获取用户信息
 * @param action    包含用户类型以及用户id
 * @returns {IterableIterator<*>}
 */
function* getInitInfo(action) {
    const userinfo = yield Axios.get("/api/" + action.value.usertype + "/" + action.value.id);
    yield put(headerActionCreators.addInfo(userinfo.data.data));
}

/**
 * 获取学生的已选课程列表
 * @param action
 * @returns {IterableIterator<*>}
 */
function* getSelectedList(action) {
    const selectedList = yield Axios.get("/api/sc/" + action.value);
    yield put(selectedActionCreators.addSelectedList(selectedList.data));
}

//获取所有可选课程
function* getSelectableList() {
    const selectCourse = yield Axios.get("/api/course");
    yield put(selectcourseActionCreators.showCourseInfo(selectCourse.data));
}

//通过教师id查询教师创建的所有课程
function* getCreatedCourseList(action) {
    console.log(action);
    const courses = yield Axios.get("/api/course/teacher/" + action.value);
    yield put(coursesActionCreators.toAddCreatedCourseList(courses.data));
}

//发送用户登录信息
function* sendUserinfo(action) {
    const username = action.value.username;
    const password = action.value.password;
    const usertype = action.value.usertype;
    const ReLogin = yield Axios.post("/api/login", {
        'username': username,
        'password': password,
        'usertype': usertype
    });
    yield put(loginActionCreators.checkLoginResualt(ReLogin.data));
}

//发送修改密码请求
function* sendModifyPasswordInfo(action) {
    const data = {
        oPass: action.value.oldpass,
        nPass: action.value.newpass
    };
    const re = yield Axios.put("/api/" + action.value.usertype + "/" + action.value.id, data);
    yield put(modifyActionCreators.toCheckModifyResult(re.data));
}

/**
 * 获取所有的用户列表，管理员除外
 * @returns {IterableIterator<*>}
 */
function* getUserList() {
    const userlist = yield Axios.get("/api/user");
    yield put(managerActionCreator.addUserList(userlist.data));
}

function* toDelUser(action) {
    let id = action.value.get('id');
    let usertype = action.value.get('usertype');
    const re = yield Axios.delete("/api/admin/" + usertype + "/" + id);
    yield put(managerActionCreator.didManagerUser(re.data));
}

function* doRegister(action) {
    let usertype = action.value.usertype;
    if (usertype === "admin") {
        const re = yield Axios.post("/api/admin", action.value);
        yield put(managerActionCreator.dealResult(re.data));
    } else if (usertype === "teacher") {
        const re = yield Axios.post("/api/admin/teacher", action.value);
        yield put(teacherActionCreator.dealResult(re.data));
    } else {
        const re = yield Axios.post("/api/admin/student", action.value);
        yield put(studentActionCreator.dealResult(re.data));
    }

}

function* sendSCCourse(action) {
    let re = yield Axios.post("/api/sc", action.value);
    yield put(scActionCreator.handleSucc(re.data));
}


function* goAddCourse(action) {
    let re = yield Axios.post("/api/course", action.value);
    yield put(createCourseActionCreator.finishAddCourse(re.data));
}

function* goDeleteCourse(action) {
    const re = yield Axios.delete("/api/course/" + action.value);
    yield put(coursesActionCreators.doHandleResult(re.data));
}

function* goGetSchedule(action) {
    const sid = action.value;
    const re = yield Axios.get("/api/schedule/" + sid);
    yield put(scheduleActionCreator.toHandleStudentSchedule(re.data));
}

function* mySaga() {
    yield takeEvery(managerActionType.GET_USER_LIST, getUserList);
    yield takeEvery(managerActionType.DO_CONFIRM_OK, toDelUser);
    yield takeEvery(modifyActionTypes.SEND_PASSWORD_INFO, sendModifyPasswordInfo);
    yield takeEvery(loginActionTypes.SEND_USERINFO_TO_SERVER, sendUserinfo);
    yield takeEvery(headerActionTypes.INIT_INFO, getInitInfo);
    yield takeEvery(selectedActionTypes.INIT_SELECTED_LIST, getSelectedList);
    yield takeEvery(selectcourseActionTypes.INIT_SELECTABLE_LIST, getSelectableList);
    yield takeEvery(coursesActionTypes.GET_CREATED_COURSE_LIST, getCreatedCourseList);
    yield takeEvery(DO_REGISTER, doRegister);
    yield takeEvery(createCourseActionType.ADD_COURSE, goAddCourse);
    yield takeEvery(scActionType.SEND_SELECT_COURSE, sendSCCourse);
    yield takeEvery(coursesActionTypes.CONFIRM_DELETE_COURSE, goDeleteCourse);
    yield takeEvery(scheduleActionType.GET_STUDENT_SCHEDULE, goGetSchedule);
}

export default mySaga;