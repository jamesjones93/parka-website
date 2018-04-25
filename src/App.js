import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/home" component={Home} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
