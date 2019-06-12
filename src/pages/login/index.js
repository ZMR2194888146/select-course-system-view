import React from 'react';
import {BG }from "./style";
import { Form, Input, Icon, Button, Radio} from "antd";
import { Row, Col, Card } from 'antd';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actionCreators } from "./store";

class Login extends React.Component{

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) =>{
            if (!err) {
                let userInfo = this.props.form.getFieldsValue(); 
                this.props.sendInfo(userInfo);
            }
        })
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        if(!this.props.logined){
            return(
                <BG>
                    <Row type="flex" justify="space-around" align="middle" style={{height: "100vh"}}>
                        <Col span={4}>
                            <Card title="用户登录" bordered={true} style={{ width: 300 }}>
                                <Form onSubmit={this.handleOnSubmit} className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                                rules: [
                                                    { required: true, message: 'Please input your school ID!' },
                                                    { pattern: new RegExp("^\\w+$","g"), message: 'School ID are numbers or letters!'}
                                                ],
                                        })(
                                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="school ID" />
                                        )
                                        }
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('usertype',{
                                            rules:[{required: true, message: 'Please chose your user type!'}],
                                        })(
                                            <Radio.Group>
                                                <Radio value="student">学生</Radio>
                                                <Radio value="teacher">教师</Radio>
                                                <Radio value="admin">管理员</Radio>
                                            </Radio.Group>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-buttom" 
                                                style={{width: 250}}>
                                            登录
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                </Row>
              </BG>
            );
        }else{
            return(
                <Redirect to="/"/>
            );
        }
    }
}

const LoginWrapper = Form.create({ name: "SCS_login"})(Login);

const mapState = (state) => {
    return{
        logined: state.getIn(['logined','logined'])
    }
}

const mapDispatch = (dispatch) => {
    return{
        sendInfo(value){
            dispatch(actionCreators.sendUserinf(value));
        }
    }
}

export default connect(mapState, mapDispatch) (LoginWrapper);