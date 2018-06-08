import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { checkForCookie } from "./Actions";

class World extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(checkForCookie());
    }

    render() {
        return (
            <Container>
                <h1>Parka World</h1>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        cookie: state.cookie
    };
};

export default connect(mapStateToProps)(World);

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10%;
    text-align: center;
    background-color: rgb(227, 25, 54);
    color: white;
`;
