import React from 'react';
import { Card, Table, Select, Button } from 'antd';
import { connect } from "react-redux";
import { actionCreators, actionTypes } from "./store";
import UserBox from "../../components/UserBox"

const Option = Select.Option;

const columns = 
[
    {
        title:"课程代码",
        dataIndex: "cid",
        key: "cid",
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title:"课程名称",
        dataIndex: "cname",
        key: "cname",
        render: text => <a href="javascript:;">{text}</a>
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
        title: "教师",
        dataIndex: "teacher",
        key: "teacher"
    },
    {
        title: "上课时间",
        dataIndex: "time",
        key: "time"
    },
    {
        title:"上课地点",
        dataIndex:"space",
        key:"space"
    },
    {
        title: "工作日",
        dataIndex: "date",
        key: "cid"
    }
]

class Selected extends React.Component{

    componentWillMount(){
        this.props.getInitSelected(this.props.id);
    }

    getTitleBar(data){
        if(data.duce === 1) return;
        return(
            <div>
                学年： <Select defaultValue={data.duce} style={{width: 130}}>
                    {data.duces.map((item)=>(
                        <Option value={item}>{item}</Option>
                    ))}
                </Select>
                学期: <Select defaultValue={data.term}>
                {data.terms.map((item)=>(
                        <Option value={item}>{item}</Option>
                    ))}
                </Select>
            </div>
        );
    }

    render(){
        return (
            <div>
                <UserBox/>
                <Card>
                    <Table dataSource={this.props.courses} columns={columns} size="small"></Table>
                </Card>
                <Button style={{position:"fixed", top: 120, right: 10}} type="primary" onClick={()=>this.props.getInitSelected(this.props.id)}  icon="reload">刷新</Button>
            </div>
        );
    }
}

    const mapStateToProps = (state) => {
        return {
            id: state.getIn(['logined', 'id']),
            courses: state.get('selected')
        }
    }

    const mapDispathToProps = (dispatch) => ({
        getInitSelected(id) {
            dispatch(actionCreators.intiSeletedList(id));
        }
    })

export default connect(mapStateToProps, mapDispathToProps)(Selected);