import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleCart } from '../../store/action/toggle/toggleActions';
import { removeFromCheckout } from '../../store/action/shopify/shopifyActions';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            overlayLeft: "100%"
        };
        this.closeCart = this.closeCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    closeCart() {
        this.props.dispatch(toggleCart(false));
    }

    removeItem(productId) {
        this.props.dispatch(removeFromCheckout(productId));
    }

    render() {
        if (!this.props.checkout) return <span />;
        const { checkout, checkout: { subtotalPrice } } = this.props;

        return (
            <Overlay ref={div => (this.overlay = div)}>
                <CartContainer>
                    <Cross src="/icons/cross.png" onClick={this.closeCart} />
                    <ProductsContainer>
                        {checkout.lineItems.map(product => {
                            const { id, variant, variant: { image: { src }, price }, title, quantity } = product;
                            return (
                                <ProductContainer key={id}>
                                    <CartImage src={src} />
                                    <InfoContainer>
                                        <ProductTitle>{title}</ProductTitle>
                                        <ProductQuantity>QTY: {quantity}</ProductQuantity>
                                        <ProductQuantity>SIZE: {variant.title}</ProductQuantity>
                                        <ProductPrice>${price * quantity}</ProductPrice>
                                    </InfoContainer>
                                    <SmallCross src="/icons/cross.png" onClick={() => this.removeItem(id)} />
                                </ProductContainer>
                            );
                        })}
                    </ProductsContainer>
                    <SubtotalContainer>
                        <SubtotalLabel>Subtotal:</SubtotalLabel>
                        <SubtotalValue>${subtotalPrice}</SubtotalValue>
                    </SubtotalContainer>
                    <Link to="/checkout">
                        <CheckoutButton onClick={this.closeCart}>Checkout</CheckoutButton>
                    </Link>
                </CartContainer>
            </Overlay>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        checkout: state.shopifyReducer.checkout,
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
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(16, 16, 16, 0.5);
    z-index: 25;

    @media only screen and (max-device-width: 768px) {
        z-index: 25;
    }
`;

const CartContainer = styled.div`
    width: 40%;
    position: fixed;
    left: 50%;
    top: 0;
    padding: 5%;
    height 100%;
    background-color: rgb(250, 250, 250);
    margin: 0;
    z-index: 30;

    @media only screen and (max-device-width: 768px) {
        width: 85%;
        height: 90%;
        left: 0;
        font-size: 30px;
        position: absolute;
        top: 1.25%;
        left: 2.5%;
        z-index: 100;
    }

`;

const Cross = styled.img`
    height: 30px;
    margin: -7% 0 0 -7%;
    position: absolute;
    cursor: pointer;

    @media only screen and (max-device-width: 768px) {
        height: 60px;
        padding: 10px;
        margin: -5% 0 0 -5%;
    }
`;

const ProductsContainer = styled.div`
    height: 65%;
    width: 100%;
    margin: 0;
    overflow: scroll;

    @media only screen and (max-device-width: 768px) {
        height: 85%;
    }
`;

const ProductContainer = styled.div`
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: row;
`;

const CartImage = styled.img`
    height: 80%;
`;

const InfoContainer = styled.div`
    width: 50%;
    margin: 0 0 0 4%;
    padding: 0;
    font-size: 15px;
`;

const ProductTitle = styled.p`
    color: rgb(16, 16, 16);
    line-height: 15px;
    width: 100%;
    vertical-align: top;
    margin: 0;

    @media only screen and (max-device-width: 768px) {
        font-size: 35px;
        line-height: 42px;
    }
`;

const ProductQuantity = styled.p`
    color: rgb(150, 150, 150);
    line-height: 17px;
    font-size: 13px;
    margin: 0;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
        line-height: 37px;
    }
`;

const ProductPrice = styled.p`
    color: rgb(227, 25, 54);
    margin: 0;
    line-height: 17px;
    font-size: 14px;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
        line-height: 37px;
    }
`;

const SmallCross = styled.img`
    ${transition} height: 20%;
    opacity: 0.55;
    cursor: pointer;
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

    @media only screen and (max-device-width: 768px) {
        font-size: 40px;
    }
`;

const SubtotalValue = styled.p`
    font-size: 25px;
    font-weight: bold;

    @media only screen and (max-device-width: 768px) {
        font-size: 45px;
    }
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

    @media only screen and (max-device-width: 768px) {
        font-size: 45px;
    }
`;
