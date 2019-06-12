import React from 'react';
import {Card, Table, Modal, Button} from 'antd';
import { connect } from "react-redux";

import { actionCreators } from "./store";
import UserBox from "../../components/UserBox";

const { Column } = Table; 

class Courses extends React.Component{

    componentWillMount(){
        this.props.toGetList(this.props.tid);
    }

    render(){
        const { created, showCourseInfo, courseInfo, isShow, clickOk, clickCancel } = this.props;
        if (this.props.fresh){
            this.props.toGetList(this.props.tid);
            this.props.notFresh();
        }
        return (
            <div>
                <UserBox/>
                <Card>
                    <Button type="primary" icon="reload" onClick={()=>this.props.toGetList(this.props.tid)}
                            style={{position: "fixed", top:65, right: 30}}>刷新</Button>
                    <Table dataSource={created} size="small">
                        <Column title="课程代码" dataIndex="cid" key="cid"
                            render={(text, record)=>(
                                <a href="javascript:;" onClick={()=>{
                                    showCourseInfo(text)
                                }}>{text}</a>
                            )}/>
                       
                        <Column title="课程名称" dataIndex="cname" key="cname" 
                            render={(text, record)=>(
                                <a href="javascript:;" onClick={()=>{
                                    showCourseInfo(record.cid)
                                }}>{text}</a>
                            )}
                            />
                        
                        <Column title="课程容量" dataIndex="capacity" key="capacity" />

                        <Column title="学分" dataIndex="score" key="score" />

                        <Column title="周学时" dataIndex="duce" key="duce" />

                        <Column title="上课时间" dataIndex="time" key="time" render={(text, record)=>(
                            <span>周{record.date}&nbsp;第{record.time}~{record.time + record.acount}节课</span>
                        )}/>

                        <Column title="上课地点" dataIndex="space" key="cid" />

                        <Column title="操作" key="code"
                            render={(text, record) => (
                                <a href="javascript:;" onClick={()=>{
                                    showCourseInfo(record.code);
                                }}>删除</a>
                            )}
                        />
                                              
                    </Table>
                </Card>
                <Modal title="课程信息" visible={isShow} 
                    onOk={()=>clickOk(courseInfo.cid)} onCancel={clickCancel}>
                    <div><span>课程名称：</span><span>{courseInfo.cname}</span></div>
                    <div><span>课程代码：</span><span>{courseInfo.cid}</span></div>
                    <div><span>课程容量：</span><span>{courseInfo.capacity}</span></div>
                    <div><span>上课时间：</span><span>{courseInfo.time}</span></div>
                    <div><span>上课地点：</span><span>{courseInfo.space}</span></div>
                    <div><span>周学时：</span><span>{courseInfo.duce}</span></div>
                    <div><span>学分：</span><span>{courseInfo.score}</span></div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        created: state.getIn(["courses","courses"]),
        isShow: state.getIn(["courses", "wantShowInfo"]),
        courseInfo: state.getIn(["courses","courseInfo"]),
        tid: state.getIn(['logined', 'id']),
        fresh: state.getIn(['courses', 'fresh'])
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        toGetList(tid){
            /**
             * 显示所有这个教师创建的课程
             */
            dispatch(actionCreators.getCreatedCourseList(tid));
        },
        showCourseInfo(data){
            dispatch(actionCreators.gotoShowCoure(data));
        },
        clickOk(value){
            dispatch(actionCreators.doDeleteCourse(value));
        },
        clickCancel(){
            dispatch(actionCreators.doNotShowCourse());
        },
        notFresh(){
            dispatch(actionCreators.changeFreshStatus());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Courses);