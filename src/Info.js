import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toRegister, userLogin } from "./Actions";

export default function Info() {
    return (
        <Container>
            <LeftContainer>
                <img src="" />
            </LeftContainer>
            <RightContainer>
                <Title>PARKA</Title>
                <Description>
                    Parka is as Parka does. On a mission to accelerate the
                    future. Join us.
                </Description>
                <Email>parkarecords[at]gmail.com</Email>
            </RightContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
`;

const LeftContainer = styled.div`
    width: 50%;
    height: 100vh;
    top: 0;
    position: absolute;
    left: 0;
    background-color: rgb(16, 16, 16);
`;

const RightContainer = styled.div`
    width: 40%;
    height: 100%;
    top: 0%;
    position: absolute;
    left: 50%;
    margin: 125px 5% 10% 5%;
`;

const Title = styled.p`
    margin: 0% 0 5% 0;
    font-size: 30px;
    font-weight: bold;

    @media only screen and (max-device-width: 768px) {
        margin: 15% 0 5% 0;
        font-size: 55px;
    }
`;

const Description = styled.p`
    font-size: 14px;

    @media only screen and (max-device-width: 768px) {
        margin: 10% 0;
        font-size: 30px;
    }
`;

const Email = styled.p`
    margin: 5% 0;
    font-size: 14px;

    @media only screen and (max-device-width: 768px) {
        margin: 10% 0;
        font-size: 28px;
    }
`;
