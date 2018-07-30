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
                    Director of Operations:{" "}
                    <Email href="mailto:ops@par-ka.com">ops@par-ka.com</Email>
                </Description>
                <Description>
                    Director of Propoganda:{" "}
                    <Email href="mailto:press@par-ka.com">
                        press@par-ka.com
                    </Email>
                </Description>
                <Description>
                    All other inquiries:{"  "}
                    <Email href="mailto:info@par-ka.com">info@par-ka.com</Email>
                </Description>
                <DemosContainer>
                    <Logo src="/logo/parkalogoblack.png" />
                    <DemosText>is not accepting demos at this time.</DemosText>
                </DemosContainer>
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

const Email = styled.a`
    text-decoration: underline;
    color: rgb(16, 16, 16);
    margin: 5% 0;
    font-size: 14px;

    @media only screen and (max-device-width: 768px) {
        margin: 10% 0;
        font-size: 28px;
    }
`;

const DemosContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Logo = styled.img`
    height: 14px;
    width: 52px;
    margin: 0 7px 0 0;

    @media only screen and (max-device-width: 768px) {
        height: 28px;
        width: 105px;
    }
`;

const DemosText = styled.p`
    font-size: 14px;
    width: 50%;

    @media only screen and (max-device-width: 768px) {
        font-size: 28px;
    }
`;
