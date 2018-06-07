import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class EnterParkaSite extends React.Component {
    // static contextTypes = {
    //     easdk: PropTypes.object
    // };

    render() {
        return (
            <Container>
                <EnterSiteLink to="/shop">ENTER PARKA SITE</EnterSiteLink>
            </Container>
        );
    }
}

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    display: flex;
    justify-content: center;
    background-color: rgb(16, 16, 16);
    height: 100vh;
`;

const EnterSiteLink = styled(Link)`
    ${transition} font-size: 40px;
    align-self: flex-end;
    text-align: center;
    width: 80%;
    padding: 20px 0 5% 0;
    border-top: 3px solid white;
    cursor: pointer;
    color: white;
    text-decoration: none;

    :hover {
        color: rgba(255, 255, 255, 0.5);
    }
`;
