import React from "react";
import { Menu } from "antd";
import { Link, HashRouter } from "react-router-dom";
import { HeaderWrapper } from "./style";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as loginActionCreators } from "../../pages/login/store";

const SubMenu = Menu.SubMenu;

class Header extends React.Component {

    componentWillMount() {
        const userid = {
            usertype: this.props.usertype,
            id: this.props.id
        }
        this.props.initInfo(userid);

        setInterval(() => {
            let time = this.formateTime(new Date());
            this.setState({
                time
            })
        }, 1000);

        this.setState({});
    }

    //头部组件中的时间
    formateTime(time) {
        if (!time) return ' ';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    //获取菜单
    getRender = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <SubMenu className="menuItem" title={item.title} key={item.key}>{this.getRender(item.children)}</SubMenu>
            }
            return <Menu.Item key={item.title}><Link to={item.key}>{item.title}</Link></Menu.Item>
        })
    }

    getUserBox = (userinfo) =>{
        return(
            <h3>
                欢迎你：
                {<span>{userinfo.username}|{userinfo.name}</span>}
                <a href="javascript:;" onClick={this.props.doLoginOut}>退出</a>
            </h3>
        );
    }

    render() {
        const { userinfo, menulist } = this.props;
        return (
            <HeaderWrapper>
                <div className="titleBar">
                    <h2>学生选课系统</h2>
                    <div className="infoBar">
                        <h3>{this.state.time}</h3>
                        {this.getUserBox(userinfo)}
                    </div>
                </div>
                <HashRouter>
                    <Menu mode="horizontal" className="menuContent">
                        {this.getRender(menulist)}
                    </Menu>
                </HashRouter> 
            </HeaderWrapper>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        id: state.getIn(['logined','id']),
        menulist: state.getIn(['header', 'menulist']),
        userinfo: state.getIn(['header', 'userinfo']),
        usertype: state.getIn(['logined', 'usertype'])
    }
}

const mapDispathToProps = (dispatch) => ({
    initInfo(user){
        dispatch(actionCreators.initInfo(user));
    },
    doLoginOut(){
        window.location.href="/";
        dispatch(loginActionCreators.doLoginOut());
    }
})

export default connect(mapStateToProps, mapDispathToProps)(Header);