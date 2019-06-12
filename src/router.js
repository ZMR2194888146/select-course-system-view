import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import App from "./App";
import Login from "./pages/login";
import Header from "./components/Header";
import HomePage from "./pages/home";
import NoMatch from "./pages/no-match";

import CreateCourse from './pages/create-course';
import Courses from "./pages/courses";

import SelectCourse from "./pages/selectcourse";
import Schedule from "./pages/schedule";
import Selected from "./pages/seleted";

import ModifyPassword from "./pages/modify-password";

import AddStudent from "./pages/add-student";
import AddTeacher from "./pages/add-teacher";
import ManagerUsers from "./pages/manager-user";

class SCRouter extends React.Component{

    render(){
        return(
            <div>
                <HashRouter>
                    <App>
                        <Switch>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/" component={()=>(
                                this.props.logined ?  
                                    <div>
                                    <Header/>
                                        <Switch>
                                            <Route path="/" exact component={HomePage}/>
                                            <Route path="/users" component={()=>(
                                                <Switch>
                                                    <Route path="/users" exact component={ManagerUsers}/>
                                                    <Route path="/users/student" component={AddStudent}/>
                                                    <Route path="/users/teacher" component={AddTeacher}/>
                                                </Switch>
                                            )}/>
                                            <Route path="/course" component={()=>
                                                <div>
                                                    <Switch>
                                                        <Route path="/course/schedule" component={Schedule}/>
                                                        <Route path="/course/select" component={SelectCourse}/>
                                                        <Route path="/course/selected" component={Selected}/>
                                                        <Route component={NoMatch}/>
                                                    </Switch>
                                                </div>
                                            }/>
                                            <Route path="/teacher" component={()=>
                                                <div>
                                                    <Switch>
                                                        <Route path="/teacher/create" component={CreateCourse}/>
                                                        <Route path="/teacher/list" component={Courses}/>
                                                        <Route component={NoMatch}/>
                                                    </Switch>
                                                </div>
                                            }/>
                                            <Route path="/user" component={()=>
                                                <div>
                                                    <Switch>
                                                        <Route path="/user/password" component={ModifyPassword}/>
                                                        <Route component={NoMatch}/>
                                                    </Switch>
                                                </div>
                                            }/>
                                            <Route component={NoMatch}/>
                                        </Switch>
                                    </div>
                            : <Login/> )}/>
                            <Route component={NoMatch}/>    
                        </Switch>         
                    </App>          
                </HashRouter>
            </div>
        );
    }
}

const mapState = (state) => ({
    logined: state.getIn(['logined', 'logined'])
});

export default connect(mapState, null)(SCRouter);