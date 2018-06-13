import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { hideCart, getCart, removeProduct } from "./Actions";

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            overlayLeft: "100%"
        };
        this.closeCart = this.closeCart.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    closeCart() {
        this.props.dispatch(hideCart());
    }

    removeItem(productId, e) {
        console.log(productId);
        this.props.dispatch(removeProduct(productId));
    }

    render() {
        if (!this.props.checkout) {
            return <p />;
        }

        let checkout = this.props.checkout;

        let checkoutItemList = checkout.lineItems.map(product => {
            return (
                <ProductContainer key={product.id}>
                    <CartImage src={product.variant.image.src} />
                    <InfoContainer>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductQuantity>
                            QTY: {product.quantity}
                        </ProductQuantity>
                        <ProductQuantity>
                            SIZE: {product.variant.title}
                        </ProductQuantity>
                        <ProductPrice>
                            ${product.variant.price * product.quantity}
                        </ProductPrice>
                    </InfoContainer>
                    <SmallCross
                        src="/icons/cross.png"
                        onClick={e => this.removeItem(product.id, e)}
                    />
                </ProductContainer>
            );
        });

        return (
            <Overlay ref={div => (this.overlay = div)}>
                <CartContainer>
                    <Cross src="/icons/cross.png" onClick={this.closeCart} />
                    <ProductsContainer>{checkoutItemList}</ProductsContainer>
                    <SubtotalContainer>
                        <SubtotalLabel>Subtotal:</SubtotalLabel>
                        <SubtotalValue>
                            ${this.props.checkout.subtotalPrice}
                        </SubtotalValue>
                    </SubtotalContainer>
                    <CheckoutButton>Checkout</CheckoutButton>
                </CartContainer>
            </Overlay>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        checkout: state.checkout,
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
    background-color: rgba(16, 16, 16, 0.5);
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

const Cross = styled.img`
    height: 30px;
    margin: -7% 0 0 -7%;
    position: absolute;
    cursor: pointer;
`;

const ProductsContainer = styled.div`
    height: 65%;
    width: 100%;
    margin: 0;
    overflow: scroll;
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
    font-weight: bold;
`;

const ProductQuantity = styled.p`
    color: rgb(150, 150, 150);
    line-height: 17px;
    margin: 0;
`;

const ProductPrice = styled.p`
    color: rgb(227, 25, 54);
    margin: 0;
    line-height: 17px;
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
