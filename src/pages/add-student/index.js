import React from 'react';
import { message, Form, Input, Card, Button} from "antd";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import * as actionCreator from "./store/actionCreators";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
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


class AddStudent extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let info = this.props.form.getFieldsValue();
                info.usertype = "student";
                this.props.doRegister(info);
            }
        })
    };

    render() {
        if (this.props.usertype === "admin") {
            const {getFieldDecorator} = this.props.form;
            return (
                <Card title="添加学生" style={{width: 500, margin: "20px auto"}}>

                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="登录用户名：" {...formItemLayout}
                                  extra="密码不用填写，新增用户默认密码为88888888">
                            {getFieldDecorator('username',{
                                rules: [{ required: true, message: 'please enter username'}],
                            })(
                                <Input type="text" maxLength={15}/>
                            )}
                        </FormItem>
                        <FormItem label="姓名" {...formItemLayout}>
                            {getFieldDecorator('name',{
                                rules: [{ required: true, message: 'please enter your name'}],
                            })(
                                <Input type="text" maxLength={15}/>
                            )}
                        </FormItem>
                        <FormItem label="学院" {...formItemLayout}>
                            {getFieldDecorator('college',{
                                rules: [{ required: true, message: 'please enter college'}],
                            })(
                                <Input type="text" maxLength={15} />
                            )}
                        </FormItem>
                        <FormItem label="专业" {...formItemLayout}>
                            {getFieldDecorator('major',{
                                rules: [{ required: true, message: 'please enter major'}],
                            })(
                                <Input type="text" maxLength={15}/>
                            )}
                        </FormItem>
                        <FormItem label="班级" {...formItemLayout}>
                            {getFieldDecorator('className',{
                                rules: [{ required: true, message: 'please enter class number '}],
                            })(
                                <Input type="text" maxLength={15}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button htmlType="submit" type="primary" icon="plus">添加学生</Button>
                        </FormItem>
                    </Form>
                </Card>
            );
        } else {
            message.error("sorry, you not have permission !");
            return <Redirect to="/"/>
        }
    }
}

const mapState = (state) => ({
    usertype: state.getIn(['logined', 'usertype'])
});

const mapDispatch = (dispatch) => ({
    doRegister(value){
        dispatch(actionCreator.doRegister(value));
    }
});

const UserWrapper = Form.create()(AddStudent);

export default connect(mapState, mapDispatch)(UserWrapper);