import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct } from "./Actions";

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mainImageSrc: ""
        };
    }

    componentDidMount() {
        console.log("hello");
        console.log(this.props);
        this.props.dispatch(getProduct(this.props.match.params.product));
    }

    render() {
        if (!this.props.product) {
            return <Loader />;
        }

        let product = this.props.product;
        let upperTitle = product.title.toUpperCase();

        return (
            <Container>
                <Leftcontainer>
                    <MainImage src={product.images[0].src} />
                </Leftcontainer>
                <RightContainer>
                    <TopContainer>
                        <Title>{upperTitle}</Title>
                        <Cross src="/icons/cross.png" />
                    </TopContainer>
                    <Price>$10.00</Price>
                    <p>{product.description}</p>
                </RightContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("product", state.product);

    return {
        product: state.product
    };
};

export default connect(mapStateToProps)(Product);

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
    align-items: center;
`;

const Title = styled.p`
    font-size: 30px;
    padding: 0px;
    margin: 0px;
    width: 65%;
`;

const Cross = styled.img`
    width: 5%;
`;

const Price = styled.p`
    color: rgb(227, 25, 54);
    font-weight: bold;
    font-size: 20px;
    margin: 0;
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
