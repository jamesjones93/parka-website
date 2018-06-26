import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct, addToCart, clearProduct } from "./Actions";
import DOMPurify from "dompurify";

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainImageSrc: "",
            productQuantity: 1,
            addButtonText: "ADD",
            buttonColor: "",
            buttonTextColor: ""
        };

        this.changeSize = this.changeSize.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getProduct(this.props.match.params.product));

        this.setState({
            variantIndex: 0,
            addButtonText: "ADD"
        });
    }

    componentWillUnmount() {
        this.props.dispatch(clearProduct());
    }

    goBack() {
        this.props.history.goBack();
    }

    changeSize() {
        let variantIndex;

        if (
            this.state.variantIndex ===
            this.props.product.variants.length - 1
        ) {
            variantIndex = 0;
        } else {
            variantIndex = this.state.variantIndex += 1;
        }

        if (this.props.product.variants[variantIndex].available) {
            this.setState({
                variantIndex: variantIndex
            });
        } else {
            this.changeSize();
        }
    }

    quantityChange(e) {
        this.setState({
            productQuantity: e.currentTarget.value
        });
    }

    addToCart(e) {
        this.setState({ addButtonText: "ADDED" });

        let addedButton = e.currentTarget;

        addedButton.style.backgroundColor = "rgb(2, 105, 55)";
        addedButton.style.border = "1px solid rgb(2, 105, 55)";
        addedButton.style.color = "rgb(250, 250, 250)";

        setTimeout(() => {
            this.setState({ addButtonText: "ADD" });
            addedButton.style.backgroundColor = "inherit";
            addedButton.style.border = "1px solid rgb(16, 16, 16);";
            addedButton.style.color = "rgb(16, 16, 16)";
        }, 800);

        let productInfo = {
            id: this.props.product.variants[this.state.variantIndex].id,
            quantity: this.state.productQuantity
        };
        console.log(productInfo);

        this.props.dispatch(addToCart(productInfo));
    }

    render() {
        if (!this.props.product) {
            return <Loader />;
        }

        let product = this.props.product;
        let upperTitle = product.title.toUpperCase();
        let description = product.descriptionHtml;

        let availableVariants = [];

        product.variants.map(variant => {
            if (variant.available == true) {
                availableVariants.push(variant);
            }
        });

        return (
            <Container>
                <ShopHeaderContainer>
                    <ShopHeaderLink to="/shop/records">RECORDS</ShopHeaderLink>
                    <ShopHeaderLink to="/shop/merchandise">
                        MERCHANDISE
                    </ShopHeaderLink>
                </ShopHeaderContainer>
                <Leftcontainer>
                    <MainImage src={product.images[0].src} />
                </Leftcontainer>
                <RightContainer>
                    <TopContainer>
                        <TitleAndPrice>
                            <Title>{upperTitle}</Title>
                            <Price>${product.variants[0].price}</Price>
                        </TitleAndPrice>
                        <Size onClick={this.changeSize}>
                            {(availableVariants.length &&
                                (product.variants[this.state.variantIndex] &&
                                    product.variants[this.state.variantIndex]
                                        .selectedOptions[0].value)) || (
                                <p>Sold Out</p>
                            )}
                        </Size>
                        <Cross
                            src="/icons/cross.png"
                            onClick={this.goBack.bind(this)}
                        />
                    </TopContainer>
                    <Description
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description)
                        }}
                    />

                    <QuantityAndAddContainer>
                        {(availableVariants.length && (
                            <QuantityInput
                                type="number"
                                placeholder="1"
                                ref={input => {
                                    this.quantity = input;
                                }}
                                onChange={this.quantityChange}
                            />
                        )) || <p />}
                        {(availableVariants.length && (
                            <AddButton
                                onClick={this.addToCart}
                                style={{
                                    color: this.state.buttonTextColor,
                                    backgroundColor: this.state.buttonColor,
                                    border: "1px solid" + this.state.buttonColor
                                }}
                            >
                                {this.state.addButtonText}
                            </AddButton>
                        )) || <p />}
                    </QuantityAndAddContainer>
                </RightContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        product: state.product,
        addedSuccess: state.addedSuccess
    };
};

export default connect(mapStateToProps)(Product);

const transition = `
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    top: 10%;

    @media only screen and (max-device-width: 768px) {
        height: auto;
    }
`;

const Leftcontainer = styled.div`
    width: 50%;
    position: absolute;
    left: 0;
    top: 15%;

    @media only screen and (max-device-width: 768px) {
        position: absolute;
        width: 100%;
        top: 65%;
    }
`;

const MainImage = styled.img`
    width: 100%;
    margin: 12px 0 0 0;

    @media only screen and (max-device-width: 768px) {
        margin: 0;
        width: 110%;
    }
`;

const ShopHeaderContainer = styled.div`
    width: 40%;
    height: 5%;
    padding: 0 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 10%;
    left: 50%;
    background-color: rgb(250, 250, 250);
`;

const ShopHeaderLink = styled(Link)`
    ${transition} text-decoration: none;
    color: rgb(16, 16, 16);
    font-size: 14px;

    :hover {
        color: rgb(227, 25, 54);
    }
    @media only screen and (max-device-width: 768px) {
        font-size: 25px;
    }
`;

const RightContainer = styled.div`
    width: 45%;
    position: absolute;
    left: 50%;
    top: 15%;
    padding: 2px 2.5%;

    @media only screen and (max-device-width: 768px) {
        width: 100%;
        left: 0;
        top: 15%;
    }
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

const TitleAndPrice = styled.div`
    width: 65%;
`;

const Title = styled.p`
    font-size: 25px;
    padding: 0px;
    margin: 3px 0 0 0;
    width: 100%;

    @media only screen and (max-device-width: 768px) {
        font-size: 50px;
    }
`;

const Price = styled.p`
    color: rgb(227, 25, 54);
    font-size: 20px;

    @media only screen and (max-device-width: 768px) {
        font-size: 35px;
    }
`;

const Size = styled.div`
    ${transition} width: 90px;
    height: 60px;
    margin: 10px 10% 0 30px;
    border: 2px solid rgb(16, 16, 16);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    text-align: center;

    :hover {
        color: rgb(227, 25, 54);
        border: 2px solid rgb(227, 25, 54);
    }

    @media only screen and (max-device-width: 768px) {
        width: 120px;
        height: 80px;
        font-size: 40px;
    }
`;

const Cross = styled.img`
    height: 30px;
    margin: 10px 0 0 0;
    cursor: pointer;

    @media only screen and (max-device-width: 768px) {
        height: 50px;
    }
`;

const Description = styled.p`
    font-size: 16px;
    margin: 40px 0 0 0;
    padding: 0;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
    }
`;

const QuantityAndAddContainer = styled.div`
    width: 80%;
    margin: 20% 0 7% 0;
    display: flex;
    flex-direction: row;
`;

const QuantityInput = styled.input`
    width: 20%;
    height: 26px;
    border: 1px solid rgb(16, 16, 16);
    font-size: 16px;
    text-align: center;

    ::placeholder {
        color: rgb(16, 16, 16);
    }

    :focus {
        outline: none;
    }

    @media only screen and (max-device-width: 768px) {
        height: 80px;
        font-size: 30px;
    }
`;

const AddButton = styled.button`
    ${transition} width: 20%;
    height: 30px;
    color: rgb(16, 16, 16);
    border: 1px solid rgb(16, 16, 16);
    font-size: 16px;
    text-align: center;
    padding: 0;
    cursor: pointer;
    margin: 0 0 0 3%;

    :hover {
        border: 1px solid rgb(227, 25, 54);
        color: rgb(227, 25, 54);
    }

    :focus {
        outline: none;
    }

    @media only screen and (max-device-width: 768px) {
        height: 80px;
        font-size: 30px;
    }
`;

const DeliveryText = styled.p`
    font-size: 10px;
    width: 80%;

    @media only screen and (max-device-width: 768px) {
        font-size: 25px;
        width: 100%;
        text-align: justify;
    }
`;

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
