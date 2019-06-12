import React from 'react';
import {Table, message, Button, Modal, Form, Input } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {fromJS} from "immutable";

import { Wrapper } from "./styled.js";

import {
    getUserList, doConfirmShow, doConfirmCancel, doConfirmOk, doChangeFreshStatus, showModal, doRegisterAdmin
} from "./store/actionCreators";

const { Column } = Table;
const { FormItem } = Form;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class Mananger extends React.Component{

    componentWillMount(){
        this.props.toGetUserList();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(err);
            if (!err){
                let info = this.props.form.getFieldsValue();
                info.usertype = "admin";
                this.props.toRegisterAdmin(info);
            }
        })
    }

    showAdminModal= () => {
        this.props.wantShowModal("admin");
    };

    render(){
        if(this.props.usertype === "admin"){
            if(this.props.fresh){
                this.props.toGetUserList();
                this.props. changeFreshStatu();
            }
            const {getFieldDecorator} = this.props.form;
            return(
                <Wrapper>
                    <div style={{position: "fixed", right: 20, top: 65, width: 500}}>
                        <Button style={{width: 110, margin: "0 5px"}}  type="primary"
                                onClick={this.props.toGetUserList} icon="reload">刷新</Button>
                        <Button style={{width: 110, margin: "0 5px"}}  type="primary" icon="plus"
                                onClick={this.showAdminModal}>添加管理员</Button>
                    </div>
                    <div className="box">
                        <Table dataSource={this.props.userlist}>

                            <Column title="用户ID" dataIndex="username" key="username"/>

                            <Column title="姓名" dataIndex="name" key="id"/>

                            <Column title="学院" dataIndex="college" key="id"/>

                            <Column title="用户类型" dataIndex="usertype" key="id"/>

                            <Column title="操作" dataIndex="id" key="id" render={(text, recode)=>(
                                <a href="javascript:;" onClick={()=>{
                                    this.props.confirm(recode.id)
                                }}>删除</a>
                            )}/>
                        </Table>
                    </div>
                    <Modal title="删除确认" align="center" width={300} onCancel={this.props.cancelDel}
                           onOk={()=>this.props.toDeletUser(this.props.wantdel)} visible={this.props.showConfirm}>
                        <div style={{margin: "auto"}}>
                            <h2>是否确认删除？</h2>
                            <p>ID：{this.props.wantdel.username}</p>
                            <p>姓名：{this.props.wantdel.name}</p>
                            <p>学院：{this.props.wantdel.college}</p>
                            <p>用户类型：{this.props.wantdel.usertype}</p>
                        </div>
                    </Modal>
                    <Modal title="添加管理员" align="center"   visible={this.props.showAdmin} onCancel={this.props.cancelDel} onOk={this.handleSubmit}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="登录用户名" {...formItemLayout}>
                                {getFieldDecorator('username',{
                                    rules: [{required: true, message: 'please enter username'}]
                                })(
                                    <Input type="text" maxLength={15}/>
                                )}
                            </Form.Item>
                        </Form>
                    </Modal>
                </Wrapper>
            );
        }else {
            message.error("sorry, you not have permission !");
            return <Redirect to="/"/>
        }
    }
}

const mapState = (state) =>({
    showConfirm: state.getIn(['userlist', 'isShow']),
    userlist: state.getIn(['userlist','userlist']),
    usertype: state.getIn(['logined', 'usertype']),
    wantdel: state.getIn(['userlist', 'wantdel']),
    fresh: state.getIn(['userlist', 'fresh']),
    showAdmin: state.getIn(['userlist', 'showAdmin'])
});

const mapDispatch = (dispatch) => ({
    changeFreshStatu(){
        dispatch(doChangeFreshStatus());
    },
    toGetUserList(){
        dispatch(getUserList());
    },
    confirm(id){
        dispatch(doConfirmShow(id));
    },
    toDeletUser(value){
        let user = fromJS(value);
        if (value.usertype === "教师"){
            user = user.set("usertype", "teacher");
        } else {
            user = user.set("usertype", "student");
        }
        dispatch(doConfirmCancel());
        dispatch(doConfirmOk(user));
    },
    cancelDel(){
        dispatch(doConfirmCancel());
    },
    wantShowModal(value){
        dispatch(showModal(value));
    },
    toRegisterAdmin(value){
        dispatch(doRegisterAdmin(value));
        dispatch(doConfirmCancel());
    }
});

const UserWrapper = Form.create()(Mananger);

export default connect(mapState, mapDispatch)(UserWrapper);