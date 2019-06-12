import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import Router from './router';
import { Provider } from "react-redux";
import store from "./store"

class AppWrapper extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
