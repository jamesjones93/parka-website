import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toRegister, userLogin } from "./Actions";

class Dates extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <h1>Dates</h1>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        dates: state.dates
    };
};

export default connect(mapStateToProps)(Dates);

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 10%;
    text-align: center;
    background-color: rgb(250, 250, 250);
    color: rgb(16, 16, 16);
`;
