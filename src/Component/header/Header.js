import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { checkForCookie } from '../../store/action/user/userActions';
import { toggleCart } from '../../store/action/toggle/toggleActions';
import { getCart } from '../../store/action/shopify/shopifyActions';
import Cart from "../shop/Cart";

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
        this.props.dispatch(checkForCookie());
    }

    showCartClick() {
        this.props.dispatch(toggleCart(true));
    }

    render() {
        const { cookie, checkout, showCart } = this.props;

        return (
            <div>
                <ParkaWorldHeader>
                    {(cookie && (
                        <Link to="/world">
                            <Logo src="/logo/parkalogoblack.png" />
                        </Link>
                    )) || (
                        <Link to="/">
                            <Logo src="/logo/parkalogoblack.png" />
                        </Link>
                    )}
                </ParkaWorldHeader>
                <HeaderLinksContainer>
                    <HeaderLink to="/shop/all">SHOP</HeaderLink>
                    <HeaderLink to="/dates">DATES</HeaderLink>
                    <HeaderLink to="/info">INFO</HeaderLink>
                    <CartImgContainer onClick={this.showCartClick}>
                        {(checkout && (
                            <CartImg src="/icons/cartfull.svg" />
                        )) || <CartImg src="/icons/cartempty.svg" />}
                        <CartNumberItems>[{(checkout && checkout.lineItems.length) || 0}]</CartNumberItems>
                    </CartImgContainer>
                </HeaderLinksContainer>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {(showCart && <Cart key="1" />) || <p key="2" />}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        cartVisible: state.toggleReducer.showCart,
        checkout: state.checkout,
        cookie: state.cookie
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
    height: 7.5%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    background-color: rgb(250, 250, 250);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    ${transition} width: 80px;
    margin: 3px 0 0 0;

    :hover {
        filter: brightness(50%);
    }

    @media only screen and (max-device-width: 768px) {
        width: 97px;
    }
`;

const HeaderLinksContainer = styled.div`
    width: 50%;
    height: 7.5%;
    position: fixed;
    left: 50%;
    top: 0;
    z-index: 20;
    background-color: rgb(250, 250, 250);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const HeaderLink = styled(Link)`
    font-size: 18px;
    color: rgb(16, 16, 16);
    text-decoration: none;

    :hover {
        ${transition} color: rgb(227, 25, 54);
    }

    @media only screen and (max-device-width: 768px) {
        font-size: 26px;
    }
`;

const CartImgContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 22px;
    width: 40px;
    cursor: pointer;
    align-items: center;
`;

const CartImg = styled.img`
    height: 20px;

    @media only screen and (max-device-width: 768px) {
        height: 26px;
    }
`;

const CartNumberItems = styled.p`
    font-size: 12px;
    color: rgb(227, 25, 54);
    padding: 2px 0 0 0;
`;
