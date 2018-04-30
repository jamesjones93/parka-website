import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Release extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>testing</h1>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        error: state.error
    };
};

export default connect(mapStateToProps)(Release);
