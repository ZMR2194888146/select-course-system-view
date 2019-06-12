import React from 'react';
import {Card, Input, Button, Form, InputNumber, TimePicker, Select} from "antd";
import { connect } from "react-redux";
import * as actionCreator from "./store/actionCreator";
import mapStateToProps from "react-redux/es/connect/mapStateToProps";

const Option = Select.Option;
const FormItem = Form.Item;

const itemLayout = {
    labelCol:{
        xs: { span: 24 },
        sm: { span: 8}
    },
    wrapperCol: {
        xs: { span: 24},
        sm: { span: 16}
    }
};

class CreateCourse extends React.Component{

     handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,value) => {

            if (!err){
                let info = this.props.form.getFieldsValue();
                info.tid = this.props.tid;
                this.props.addCourse(info);
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Card title="创建课程" style={{width: 600, margin:"10px auto"}} size="small">
                <Form onSubmit={this.handleSubmit} className="form">
                    <FormItem {...itemLayout} label="课程名称">
                        {getFieldDecorator('name',{
                            rules: [{required: true, message: 'please enter course name !'}]
                        })(
                            <Input type="text" />
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="课程容量">
                        {getFieldDecorator('capacity',{
                            rules: [{required: true, message: 'please defined the capacity !'}]
                        })(
                            <InputNumber min={10} max={200}/>
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="上课时间">
                        {getFieldDecorator('time',{
                            rules: [{required: true, message: 'please choose your class time !'}]
                        })(
                            <Select style={{width: 100}}>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                                <Option value={5}>5</Option>
                                <Option value={6}>6</Option>
                                <Option value={7}>7</Option>
                                <Option value={8}>8</Option>
                                <Option value={9}>9</Option>
                                <Option value={10}>10</Option>
                                <Option value={11}>11</Option>
                                <Option value={12}>12</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="课程时长">
                        {getFieldDecorator('account',{
                            rules: [{required: true, message: 'please choose your class time !'}]
                        })(
                            <Select style={{width: 100}}>
                                <Option value={1}>1</Option>
                                <Option value={2}>2</Option>
                                <Option value={3}>3</Option>
                                <Option value={4}>4</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="周几">
                        {getFieldDecorator('date',{
                            rules: [{required: true, message: 'please choose when time are you do this work in week !'}]
                        })(
                            <Select>
                                <Option value="1">星期一</Option>
                                <Option value="2">星期二</Option>
                                <Option value="3">星期三</Option>
                                <Option value="4">星期四</Option>
                                <Option value="5">星期五</Option>
                                <Option value="6">星期六</Option>
                                <Option value="7">星期日</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="上课地点">
                        {getFieldDecorator('space',{
                            rules: [{required: true, message: 'please select a space to do this work !'}]
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="上课周学时">
                        {getFieldDecorator('duce',{
                            rules:[{required: true, message: 'please tell us you should how long to finish this work !'}]
                        })(
                            <InputNumber min={1} max={24}/>
                        )}
                    </FormItem>
                    <FormItem {...itemLayout} label="学分">
                        {getFieldDecorator('score',{
                            rules: [{required: true, message: 'please give this course a score !'}]
                        })(
                            <InputNumber min={0.5} max={10} step={0.1}/>
                        )}
                    </FormItem>
                    <FormItem wrapperCol={{
                        xs: { span: 24, offset: 0},
                        sm: { span: 16, offset: 8}
                    }}>
                        <Button htmlType="submit" type="primary" icon="plus">添加课程</Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}

const mapState = (state) => ({
    tid: state.getIn(['logined', 'id'])
});

const mapDispatch = (dispatch) => ({
    addCourse(value){
        console.log(value);
        dispatch(actionCreator.doAddCourse(value));
    }
});

const CreateCourseWrapper = Form.create()(CreateCourse);

export default connect(mapState, mapDispatch)(CreateCourseWrapper);