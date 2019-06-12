import React from 'react';
import { Card, Form, Input, Button, message } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Wrapper } from "./styled";
import * as actionCreators from "./sotre/actionCreators";

class ModifyPasswordWrapper extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        let userInput = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values)=>{
            if (!err) {
                if(userInput.newPassword === userInput.confirmPassword){
                    let infos = this.props.form.getFieldsValue();
                    let info = {
                        newpass: infos.newPassword,
                        oldpass: infos.oldPassword,
                        usertype: this.props.usertype,
                        id: this.props.id
                    };
                    this.props.sendPassinfo(info);
                }else{
                    message.error('two password are not match! ');
                }
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        if(!this.props.changed){
            return(
                <Wrapper>
                    <Card title="修改密码">
                        <Form className="login-form" onSubmit={this.handleSubmit}>
                            <h5>用户：{this.props.username}</h5>
                            <Form.Item>
                                {getFieldDecorator('oldPassword',{
                                    rules: [{required: true, message: 'please enter your password of present used!'}]
                                })(
                                    <Input type="password"  placeholder="password of present used" addonBefore="旧密码"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('newPassword',{
                                    rules: [{ required: true, message: 'please enter a password!'}]
                                })(
                                    <Input type="password"  placeholder="enter a password of you want set!" addonBefore="新密码"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('confirmPassword',{
                                    rules: [{ required: true, message: 'please enter a password!'}]
                                })(
                                    <Input type="password" style={{marginTop: 20}} placeholder="please enter it again!" addonBefore="新密码"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{marginTop: 20, width: 300}}>修改</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Wrapper>
            )
        }
        return(
            <Redirect to='/login'/>
        );
    }
}

const mapState = (state) => ({
    username: state.getIn(['header','userinfo','username']),
    changed: state.getIn(['password','isChanged']),
    usertype: state.getIn(['logined','usertype']),
    id: state.getIn(['logined', 'id'])
});

const mapDispatch = (dispatch) =>({
   sendPassinfo(value){
       dispatch(actionCreators.sendPasswordInfo(value));
   }
});

const ModifyPassword = Form.create({ name: 'Modify_password'})(ModifyPasswordWrapper);

export default connect(mapState, mapDispatch)(ModifyPassword);