import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { hideCart, getCart } from "./Actions";

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            overlayLeft: "100%"
        };
        this.closeCart = this.closeCart.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    closeCart() {
        this.props.dispatch(hideCart());
    }

    render() {
        return (
            <Overlay ref={div => (this.overlay = div)} onClick={this.closeCart}>
                <CartContainer>
                    <ProductsContainer>
                        <p>testing</p>
                    </ProductsContainer>
                    <SubtotalContainer>
                        <SubtotalLabel>Subtotal:</SubtotalLabel>
                        <SubtotalValue>$20</SubtotalValue>
                    </SubtotalContainer>
                    <CheckoutButton>Checkout</CheckoutButton>
                </CartContainer>
            </Overlay>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        showCart: state.showCart,
        cart: state.cart
    };
};

export default connect(mapStateToProps)(Cart);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(16, 16, 16, 0.7);
    z-index: 10;
`;

const CartContainer = styled.div`
    width: 40%;
    position: relative;
    left: 50%;
    top: 0;
    padding: 5%;
    height 100vh;
    background-color: rgb(250, 250, 250);
    margin: 0;
    z-index: 15;
`;

const ProductsContainer = styled.div`
    height: 65%;
    width: 100%;
    margin: 0;
`;

const SubtotalContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const SubtotalLabel = styled.p`
    font-size: 18px;
    font-weight: bold;
`;

const SubtotalValue = styled.p`
    font-size: 25px;
    font-weight: bold;
`;

const CheckoutButton = styled.button`
    ${transition} width: 100%;
    height: 7.5%;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
    font-size: 20px;
    cursor: pointer;
    border: 1px solid rgb(16, 16, 16);

    :hover {
        background-color: rgb(227, 25, 54);
        border: 1px solid rgb(227, 25, 54);
    }

    :focus {
        outline: none;
    }
`;
