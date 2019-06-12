import React from "react";
import {Card} from "antd";
import {connect} from "react-redux";

class UserBox extends React.Component {
    render() {
        if (this.props.userinfo.usertype === "student"){
            return (
                <Card style={{margin: 5, height: 50}}>
                    <p>
                        学号：{this.props.userinfo.username}&nbsp;&nbsp;&nbsp;姓名：{this.props.userinfo.name}&nbsp;&nbsp;&nbsp;
                        专业：{this.props.userinfo.major}&nbsp;&nbsp;&nbsp;班级：{this.props.userinfo.className}
                        &nbsp;&nbsp;&nbsp;学院：{this.props.userinfo.college}
                    </p>
                </Card>
            );
        } else {
            return (
                <Card style={{margin: 5, height: 50}}>
                    <p>
                        学号：{this.props.userinfo.username}&nbsp;&nbsp;&nbsp;姓名：{this.props.userinfo.name}&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;学院：{this.props.userinfo.college}
                    </p>
                </Card>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        userinfo: state.getIn(['header', 'userinfo'])
    }
};

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);