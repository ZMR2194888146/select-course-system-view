import {fromJS} from "immutable";
import {message} from "antd";
import {ADD_USER_LIST, DO_CONFIRM_SHOW, DO_CONFIRM_CANCEL, DID_MANAGER_USER, DO_CHANGE_FRESH_STATU, SHOW_MODAL, DEAL_RESULT } from "./actionType"

const userlistState = fromJS({
    userlist: [],
    wantdel: {},
    wantReg: {},
    showAdmin: false,
    isShow: false,
    fresh: false
});

const state = (state = userlistState, action) =>{
    switch(action.type){
        case DEAL_RESULT:
            if (action.value.code === "200"){
                message.success("添加成功");
            }else {
                message.warn(action.value.message);
            }
            return state;
        case DO_CHANGE_FRESH_STATU:
            return state.set('fresh', !state.get('fresh'));
        case ADD_USER_LIST:
            if (action.value.code === "200") {
                const userList = [];
                action.value.data.teacher.forEach(t => {
                    if (t !== null) {
                        const i = {};
                        i.name = t.name;
                        i.college = t.college;
                        i.usertype = "教师";
                        i.id = t.id;
                        i.username = t.username;
                        userList.push(i);
                    }
                });
                action.value.data.student.forEach(s =>{
                   if (s !== null) {
                       const i = {};
                       i.name = s.name;
                       i.college = s.college;
                       i.usertype = "学生";
                       i.id = s.id;
                       i.username = s.username;
                       userList.push(i);
                   }
                });
                return userlistState.set("userlist", userList);
            }
            message.warn(action.value.message);
            return state.set('userlist', action.value);
        case SHOW_MODAL:
            if ('admin'=== action.value){
                return state.set('showAdmin', true);
            } else if ('teacher' === action.value){
                return state.set('showTeacher', true);
            } else {
                return state.set('showStudent', true);
            }

        case DO_CONFIRM_SHOW:
            console.log(action);
            const newState = state.get('userlist');
            let wantDel = {};
            newState.forEach(u=>{
               if (u.id === action.value){
                   wantDel = u;
               }
            });
            return state.set('wantdel', wantDel).set('isShow', true);
        case DO_CONFIRM_CANCEL:
            return state.set('isShow', false).set('showAdmin', false);
        case DID_MANAGER_USER:
            if (action.value.code === "200"){
                message.success("delete completed !");
            }else {
                message.success("delete failed !");
            }
            return state.set('fresh', true);
        default:
            return state;
    }
}

export default state;