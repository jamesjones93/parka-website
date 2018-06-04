import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function EnterParkaSite() {
    return (
        <Container>
            <EnterSiteLink to="/shop">ENTER PARKA SITE</EnterSiteLink>
        </Container>
    );
}

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    position: relative;
    width: 50%;
    display: flex;
    justify-content: center;
    padding: 10px 0 30px 0;
    background-color: rgb(16, 16, 16);
    margin: 0 0 0 50%;
    height: 100vh;
`;

const EnterSiteLink = styled(Link)`
    ${transition} font-size: 35px;
    align-self: flex-end;
    position: absolute;
    text-align: center;
    width: 80%;
    padding: 20px 0 0 0;
    border-top: 3px solid white;
    color: rgb(20, 20, 20);

    :hover {
        color: rgba(255, 255, 255, 0.5);
    }
`;
