import React from 'react';
import { HomeWrapper } from "./styled";

class Home extends React.Component{

    render() {
        return (
            <div>         
                <HomeWrapper>
                    <h2>欢迎使用学生选课系统</h2>
                </HomeWrapper>
                <h2 style={{ margin: "20px auto",  fontSize: 14, color: "#e4e4e4",textAlign: "center" }}>毕业设计作品</h2>
            </div>
        );
    }
}

export default Home;