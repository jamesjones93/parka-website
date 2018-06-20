import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCart, getShop, updateProduct, removeProduct } from "./Actions";
import ThankYou from "./ThankYou";

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showThankYou: false
        };

        this.quantityChange = this.quantityChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getShop());
        this.props.dispatch(getCart());
    }

    quantityChange(e) {
        this.setState({
            productQuantity: e.currentTarget.value
        });
    }

    updateItem(productId, e) {
        let productInfo = {
            id: productId,
            quantity: this.state.productQuantity
        };

        this.props.dispatch(updateProduct(productInfo));
    }

    removeItem(productId, e) {
        console.log(productId);
        this.props.dispatch(removeProduct(productId));
    }

    render() {
        if (!this.props.checkout) {
            return <Loader />;
        }

        let checkout = this.props.checkout;

        let checkoutItemList = checkout.lineItems.map(product => {
            console.log(product);
            return (
                <ProductContainer key={product.id}>
                    <ProductImg src={product.variant.image.src} />
                    <ProductTitle>{product.title}</ProductTitle>
                    <QuantityInput
                        type="number"
                        placeholder={product.quantity}
                        ref={input => {
                            this.quantity = input;
                        }}
                        onChange={this.quantityChange}
                    />
                    <ProductPrice>
                        ${product.variant.price * product.quantity}
                    </ProductPrice>
                    <UpdateLink onClick={e => this.updateItem(product.id, e)}>
                        Update
                    </UpdateLink>
                    <DeleteLink onClick={e => this.removeItem(product.id, e)}>
                        Delete
                    </DeleteLink>
                </ProductContainer>
            );
        });

        return (
            <Container>
                <ProductsContainer>{checkoutItemList}</ProductsContainer>
                <TotalText>
                    TOTAL:<TotalValue>
                        ${this.props.checkout.subtotalPrice}
                    </TotalValue>
                </TotalText>

                <ProceedToCheckout href={checkout.webUrl}>
                    Confirm and proceed to payment
                </ProceedToCheckout>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        checkout: state.checkout,
        showThankYou: state.showThankYou
    };
};

export default connect(mapStateToProps)(Checkout);

const transition = `
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
`;

const Container = styled.div`
    width: 85%;
    position: absolute;
    top: 10%;
    overflow: scroll;
    padding: 2.5% 7.5%;
`;

const ProductsContainer = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin: 2% 0 40px 0;

    @media only screen and (max-device-width: 768px) {
        width: 100%;
    }
`;

const ProductContainer = styled.div`
    margin: 0.5% 0;
    width: 100%;
    display: flex;
    height: auto;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ProductImg = styled.img`
    width: 15%;

    @media only screen and (max-device-width: 768px) {
        width: 30%;
    }
`;

const ProductTitle = styled.p`
    width: 30%;
    padding: 0 0 0 2%;
    font-size: 14px;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
    }
`;

const QuantityInput = styled.input`
    width: 15%;
    height: 40px;
    border: 1px solid rgb(16, 16, 16);
    font-size: 14px;
    text-align: center;

    ::placeholder {
        color: rgb(16, 16, 16);
    }

    :focus {
        outline: none;
    }

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
        height: 60px;
    }
`;

const ProductPrice = styled.p`
    font-size: 14px;
    margin: 0 0 0 5%;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
        margin: 0 0 0 3%;
    }
`;

const TotalContainer = styled.div`
    width: 70%;

    @media only screen and (max-device-width: 768px) {
        width: 80%;
    }
`;

const TotalText = styled.p`
    width: 49.5%;
    text-align: left;
    font-size: 22px;
    font-weight: bold;
    margin: 0 0 40px 0;

    @media only screen and (max-device-width: 768px) {
        font-size: 35px;
        width: 80%;
        margin: 10% 0;
    }
`;

const TotalValue = styled.span`
    float: right;
`;

const UpdateLink = styled.p`
    ${transition} font-size: 13px;
    margin: 0 0 0 5%;
    cursor: pointer;

    :hover {
        color: rgb(227, 25, 54);
    }

    @media only screen and (max-device-width: 768px) {
        font-size: 24px;
    }
`;

const DeleteLink = styled.p`
    ${transition} font-size: 11px;
    color: grey;
    margin: 0 0 0 5%;
    cursor: pointer;

    :hover {
        color: rgb(227, 25, 54);
    }

    @media only screen and (max-device-width: 768px) {
        font-size: 24px;
    }
`;

const ProceedToCheckout = styled.a`
    ${transition} text-decoration: none;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
    padding: 12px;

    :hover {
        background-color: rgb(180, 180, 180);
        color: rgb(16, 16, 16);
    }
`;

// const BottomContainer = styled.div`
//     width: 100%;
//     height: 55%;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//
//     @media only screen and (max-device-width: 768px) {
//         flex-direction: column;
//         height: auto;
//     }
// `;
//
// const InfoContainer = styled.div`
//     width: 52%;
//     height: 100%;
//     display: flex;
//     flex-direction: column
//     justify-content: center;
//     align-items: center;
//
//     @media only screen and (max-device-width: 768px) {
//         width: 100%;
//     }
//
// `;
//
// const Input = styled.input`
//     width: 98%;
//     height: 3%;
//     padding: 12px 12px 12px 12px;
//     border: 1px solid rgb(16, 16, 16);
//     margin: 1.5% 0;
//
//     ::placeholder {
//         color: rgb(16, 16, 16);
//     }
//
//     :focus {
//         outline: none;
//     }
//
//     @media only screen and (max-device-width: 768px) {
//         height: 80px;
//         font-size: 28px;
//     }
// `;
//
// const HalfRowContainer = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
// `;
//
// const HalfInput = styled.input`
//     width: 44%;
//     height: 3%;
//     padding: 12px;
//     border: 1px solid rgb(16, 16, 16);
//     margin: 1.5% 0;
//
//     ::placeholder {
//         color: rgb(16, 16, 16);
//     }
//     :focus {
//         outline: none;
//     }
//
//     @media only screen and (max-device-width: 768px) {
//         height: 80px;
//         font-size: 28px;
//     }
// `;
//
// const LargerInput = styled.input`
//     width: 98%;
//     height: 6%;
//     padding: 12px 12px 12px 12px;
//     border: 1px solid rgb(16, 16, 16);
//     margin: 1.5% 0;
//
//     ::placeholder {
//         color: rgb(16, 16, 16);
//     }
//     :focus {
//         outline: none;
//     }
//
//     @media only screen and (max-device-width: 768px) {
//         height: 160px;
//         font-size: 28px;
//     }
// `;
//
// const PaymentContainer = styled.div`
//     width: 44%;
//     height: 100%;
//
//     @media only screen and (max-device-width: 768px) {
//         width: 100%;
//     }
// `;
//
// const PaymentMethodTitle = styled.p`
//     font-size: 16px;
//
//     @media only screen and (max-device-width: 768px) {
//         font-size: 40px;
//         margin: 10% 0;
//     }
// `;

const Loader = styled.div`
    position: absolute;
    margin: 0 auto;
    top: 35%;
    left: 49%;
    border: 16px solid #f3f3f3;
    border-top: 16px solid rgb(227, 25, 54);
    border-radius: 50%;
    width: 3px;
    height: 3px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

// <BottomContainer>
//     <InfoContainer>
//         <HalfRowContainer>
//             <Input type="text" placeholder="Full name" />
//         </HalfRowContainer>
//         <HalfRowContainer>
//             <HalfInput type="text" placeholder="Email" />
//             <HalfInput type="text" placeholder="Phone" />
//         </HalfRowContainer>
//         <HalfRowContainer>
//             <HalfInput type="text" placeholder="Country" />
//             <HalfInput type="text" placeholder="City" />
//         </HalfRowContainer>
//         <HalfRowContainer>
//             <LargerInput type="text" placeholder="Address" />
//         </HalfRowContainer>
//         <HalfRowContainer>
//             <LargerInput type="text" placeholder="Comments" />
//         </HalfRowContainer>
//     </InfoContainer>
//     <PaymentContainer>
//         <PaymentMethodTitle>PAYMENT METHOD:</PaymentMethodTitle>
//     </PaymentContainer>
// </BottomContainer>
// {(this.props.showThankYou && <ThankYou key="1" />) || (
//     <p key="2" />
// )}
