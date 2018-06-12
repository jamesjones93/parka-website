import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { showCart, getCart } from "./Actions";
import Cart from "./Cart";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCart: false
        };

        this.showCartClick = this.showCartClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    showCartClick() {
        this.props.dispatch(showCart());
    }

    render() {
        return (
            <div>
                <ParkaWorldHeader>
                    <Link to="/world">
                        <Logo src="/logo/Logotype.svg" />
                    </Link>
                </ParkaWorldHeader>
                <HeaderLinksContainer>
                    <HeaderLink to="/shop/all">SHOP</HeaderLink>
                    <HeaderLink to="/dates">DATES</HeaderLink>
                    <HeaderLink to="/info">INFO</HeaderLink>
                    {(this.props.checkout && (
                        <CartImg
                            src="/icons/cartfull.svg"
                            onClick={this.showCartClick}
                        />
                    )) || (
                        <CartImg
                            src="/icons/cartempty.svg"
                            onClick={this.showCartClick}
                        />
                    )}
                </HeaderLinksContainer>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {(this.props.showCart && <Cart key="1" />) || <p key="2" />}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        showCart: state.showCart,
        checkout: state.checkout
    };
};

export default connect(mapStateToProps)(Header);

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

const CartImg = styled.img`
    height: 30px;
    cursor: pointer;
`;
