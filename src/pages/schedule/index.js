import React from 'react';
import {Card} from 'antd';
import {connect} from "react-redux";

import {toGetStudentSchedule} from "./store/actionCreator";

import {TableWrapper} from "./style";


const weekday = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

class Schedule extends React.Component {


    componentWillMount() {
        this.props.getSchedule(this.props.userinfo.id);
    }

    getArrayData(data) {
        let array = new Array(12);
        for (let i = 0; i < 12; i++) {
            array[i] = new Array(7);
        }
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 12; j++) {
                array[j][i] = false;
            }
        }
        data.map((item) => {
            for (let i = 0; i < item.count; i++) {
                array[item.time + i - 1][item.date-1] = (
                    <td>
                        <span>{item.cname}</span><br/>
                        <span>{weekday[item.date]}{<span>【0~{item.duce}周】</span>}</span><br/>
                        <span> {item.teacher}</span>
                    </td>
                )
            }
        });
        return array;
    }

    renderTableBody(data) {
        const array = this.getArrayData(data);
        return array.map((item, index) => (
            <tr>
                <td>{index+1}</td>
                {item.map(v =>
                    v === false ? <td>&nbsp;</td> : v
                )}
            </tr>
        ))
    }

    renderSchedule(data) {
        return (
            <table>
                <tr>
                    <th>序号</th>
                    {weekday.map(item => (
                        <th>{item}</th>
                    ))}
                </tr>
                {this.renderTableBody(data)}
            </table>
        )
    }

    render() {
        return (
            <Card title="学生课表" style={{width: 900, margin: "auto"}}>
                <TableWrapper>
                    {this.renderSchedule(this.props.schedule)}
                </TableWrapper>
            </Card>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        schedule: state.getIn(["schedule", "schedule"]),
        userinfo: state.getIn(["header", "userinfo"])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSchedule(value) {
            dispatch(toGetStudentSchedule(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);