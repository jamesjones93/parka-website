import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ParkaWorldHeader>
                    <Link to="/world">
                        <Logo src="/logo/parkalogowhite.png" />
                    </Link>
                </ParkaWorldHeader>
                <HeaderLinksContainer>
                    <HeaderLink className="header-link" to="/">
                        PARKA
                    </HeaderLink>
                    <HeaderLink className="header-link" to="/shop">
                        SHOP
                    </HeaderLink>
                    <HeaderLink className="header-link" to="/dates">
                        DATES
                    </HeaderLink>
                    <HeaderLink className="header-link" to="/info">
                        INFO
                    </HeaderLink>
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
    background-color: rgb(227, 25, 54);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    ${transition} width: 75px;
    height: 20px;

    :hover {
        filter: brightness(0%);
    }
`;

const HeaderLinksContainer = styled.div`
    width: 50%;
    height: 10%;
    position: fixed;
    left: 50%;
    top: 0;
    z-index: 2;
    background-color: rgb(16, 16, 16);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const HeaderLink = styled(Link)`
    font-size: 25px;
    color: white;
    text-decoration: none;

    :hover {
        ${transition} color: rgba(255, 255, 255, 0.5);
    }
`;
