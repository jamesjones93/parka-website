import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct, addToCart } from "./Actions";
import DOMPurify from "dompurify";

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainImageSrc: "",
            productQuantity: 1
        };

        this.changeSize = this.changeSize.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getProduct(this.props.match.params.product));

        this.setState({
            variantIndex: 0
        });
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

        this.setState({
            variantIndex: variantIndex
        });
    }

    quantityChange(e) {
        this.setState({
            productQuantity: e.currentTarget.value
        });
    }

    addToCart() {
        let productInfo = {
            id: this.props.product.variants[this.state.variantIndex].id,
            quantity: this.state.productQuantity
        };

        this.props.dispatch(addToCart(productInfo));
    }

    render() {
        if (!this.props.product) {
            return <Loader />;
        }
        console.log("heeeere", this.props.product);

        let product = this.props.product;
        let upperTitle = product.title.toUpperCase();
        let description = product.descriptionHtml;

        return (
            <Container>
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
                            {(product.variants[this.state.variantIndex] &&
                                product.variants[this.state.variantIndex]
                                    .selectedOptions[0].value) || <p />}
                        </Size>
                        <Cross src="/icons/cross.png" />
                    </TopContainer>
                    <Description
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description)
                        }}
                    />

                    <QuantityAndAddContainer>
                        <QuantityInput
                            type="number"
                            placeholder="1"
                            ref={input => {
                                this.quantity = input;
                            }}
                            onChange={this.quantityChange}
                        />
                        <AddButton onClick={this.addToCart}>ADD</AddButton>
                    </QuantityAndAddContainer>

                    <DeliveryText>
                        Deliveries performed by CDEK company. Delivery will take
                        2-4 days, depending on how remote your location is.
                        Delivery price starts at 300 roubles, depending on the
                        volume of your order and location of delivery
                        destination. You can discuss the final price of delivery
                        with call-centre operator.
                    </DeliveryText>
                </RightContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        product: state.product
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
    margin: 10% 0 0 0;
    display: flex;
    flex-direction: row;
`;

const Leftcontainer = styled.div`
    width: 50%;
`;

const MainImage = styled.img`
    width: 100%;
    padding: 8px 0 0 0;
`;

const RightContainer = styled.div`
    width: 45%;
    padding: 0 2.5%;
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
    margin: 0px;
    width: 100%;
`;

const Price = styled.p`
    color: rgb(227, 25, 54);
    font-size: 20px;
`;

const Size = styled.div`
    ${transition} width: 70px;
    height: 50px;
    margin: 10px 10% 0 30px;
    border: 2px solid rgb(16, 16, 16);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;

    :hover {
        color: rgb(227, 25, 54);
        border: 2px solid rgb(227, 25, 54);
    }
`;

const Cross = styled.img`
    height: 30px;
    margin: 10px 0 0 0;
`;

const Description = styled.p`
    font-size: 16px;
    margin: 40px 0 0 0;
    padding: 0;
`;

const QuantityAndAddContainer = styled.div`
    width: 80%;
    margin: 20% 0 7% 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const QuantityInput = styled.input`
    width: 45%;
    height: 66px;
    border: 1px solid rgb(16, 16, 16);
    font-size: 20px;
    text-align: center;

    ::placeholder {
        color: rgb(16, 16, 16);
    }

    :focus {
        outline: none;
    }
`;

const AddButton = styled.button`
    ${transition} width: 45%;
    height: 70px;
    color: rgb(16, 16, 16);
    border: 3px solid rgb(16, 16, 16);
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 0;
    cursor: pointer;

    :hover {
        border: 3px solid rgb(227, 25, 54);
        color: rgb(227, 25, 54);
    }

    :focus {
        outline: none;
    }
`;

const DeliveryText = styled.p`
    font-size: 10px;
    width: 80%;
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
