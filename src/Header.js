import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
        );
    }
}

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const HeaderLinksContainer = styled.div`
    width: 50%;
    margin: 20px 0 0 50%;
    position: absolute;
    z-index: 2;
    background-color: rgb(16, 16, 16);
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5%;
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
