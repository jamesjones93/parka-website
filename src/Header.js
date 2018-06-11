import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <ParkaWorldHeader>
                    <Link to="/world">
                        <Logo src="/logo/Logotype.svg" />
                    </Link>
                </ParkaWorldHeader>
                <HeaderLinksContainer>
                    <HeaderLink
                        innerRef={a => {
                            this.parkaLink = a;
                        }}
                        to="/"
                    >
                        PARKA
                    </HeaderLink>
                    <HeaderLink to="/shop">SHOP</HeaderLink>
                    <HeaderLink to="/dates">DATES</HeaderLink>
                    <HeaderLink to="/info">INFO</HeaderLink>
                </HeaderLinksContainer>
            </div>
        );
    }
}

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const ParkaWorldHeader = styled.div`
    width: 50%;
    height: 10%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    background-color: rgb(16, 16, 16);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    ${transition} width: 180px;

    :hover {
        filter: brightness(50%);
    }
`;

const HeaderLinksContainer = styled.div`
    width: 50%;
    height: 10%;
    position: fixed;
    left: 50%;
    top: 0;
    z-index: 2;
    background-color: rgb(250, 250, 250);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const HeaderLink = styled(Link)`
    font-size: 25px;
    color: rgb(16, 16, 16);
    text-decoration: none;

    :hover {
        ${transition} color: rgb(227, 25, 54);
    }
`;
