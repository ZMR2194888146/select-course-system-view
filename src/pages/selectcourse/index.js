import React from 'react';
import {Card, Modal, Table} from "antd";
import {connect} from "react-redux";

import {Wrapper} from "./styled"
import {clickLink, initSelectableList, doCancelSelect, sendSelectCourse, toChangeRefresh } from "./store/actionCreators";
import UserBox from "../../components/UserBox";

const columns =
    [
        {
            title: "课程代码",
            dataIndex: "cid",
            key: "cid",
            render: text => <a href="javascript:;" corsecode={text}>{text}</a>
        },
        {
            title: "课程名称",
            dataIndex: "cname",
            key: "cname",
            render: text => <a href="javascript:;" corsecode={text}>{text}</a>
        },
        {
            title: "授课教师",
            dataIndex: "teacher",
            key: "teacher"
        },
        {
            title: "学分",
            dataIndex: "score",
            key: "score"
        },
        {
            title: "周学时",
            dataIndex: "duce",
            key: "duce"
        },
        {
            title: "选否",
            dataIndex: "selected",
            key: "selected"
        },
        {
            title: "余量",
            dataIndex: "capacity",
            key: "capacity"
        }
    ];

class SelectSourse extends React.Component {

    componentWillMount() {
        /**
         * 在组件挂载前调用ajax获取数据,当执行render生命周期函数时渲染数据
         */
        this.props.getInitList();
    }

    render() {
        const s = this.props.course;
        const sc = {
            cid:  s.cid,
            sid: this.props.id
        };
        if (this.props.refresh){
            this.props.getInitList();
            this.props.changeRefresh();
        }
        return (
            <Wrapper>
                <UserBox/>
                <Card>
                    <p>共有{this.props.selectable.length}条记录</p>
                    <Table columns={columns} dataSource={this.props.courses}
                           onRow={(recode, index) => {
                               return {
                                   onClick: (recode) => {
                                       this.props.openModel(this.props.selectable[index].cid)
                                   }
                               }
                           }
                           }/>
                </Card>
                <Modal title={s.cname} visible={this.props.showCourseInfo}
                       onOk={()=>this.props.handleOnOk(sc)} onCancel={this.props.handleOnCancel}
                        okText="选定" cancelText="取消">
                    <h4>授课教师：{s.teacher}</h4>
                    <h4>学分：{s.score}</h4>
                    <h4>上课时间：周{s.date}&nbsp;第{s.time}~{s.time+s.acount}节课</h4>
                    <h4>上课地点：{s.space}</h4>
                    <h4>课程容量：{s.capacity}</h4>
                    <h4>周学时：{s.duce}</h4>
                </Modal>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => {
    /**
     * 这里返回的数据是一个array数组,在这里将数据组装成普通数组对象
     */
    const courses = [];
    state.getIn(['selectcourse', 'selectable']).map((item) => {
        courses.push(item);
    });
    return {
        id: state.getIn(['logined','id']),
        courses: courses,
        showCourseInfo: state.getIn(['selectcourse', 'showCourseInfo']),
        selectable: state.getIn(['selectcourse', 'selectable']),
        course: state.getIn(['selectcourse','course']),
        refresh: state.getIn(['selectcourse', 'refesh'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInitList() {
            dispatch(initSelectableList());
        },
        openModel(index) {
            dispatch(clickLink(index));
        },
        handleOnOk(value){
            dispatch(sendSelectCourse(value));
            dispatch(initSelectableList());
        },
        handleOnCancel(){
            dispatch(doCancelSelect());
        },
        changeRefresh(){
            dispatch(toChangeRefresh());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSourse);