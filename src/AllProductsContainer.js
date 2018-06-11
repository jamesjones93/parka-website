import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProducts, getRecords } from "./Actions";

class AllProductsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getAllProducts());
    }

    addToCart() {
        console.log("add to cart");
    }

    render() {
        if (!this.props.products) {
            return <Loader />;
        }

        let products = this.props.products;
        products.reverse();

        let productsList = products.map(product => {
            let productUrl = "/shop/" + product.handle;

            return (
                <ProductContainerLink
                    to={productUrl}
                    params={{ productId: product.id }}
                    key={product.id}
                >
                    <ProductContainer>
                        <ProductImage src={product.images[0].src} />
                        <ProductInfoDiv>
                            <AddButton onClick={this.addToCart}>ADD</AddButton>
                            <ProductTitle>{product.title}</ProductTitle>
                        </ProductInfoDiv>
                    </ProductContainer>
                </ProductContainerLink>
            );
        });

        return <ProductsContainer>{productsList}</ProductsContainer>;
    }
}

const mapStateToProps = function(state) {
    console.log(state.products);
    return {
        products: state.products
    };
};

export default connect(mapStateToProps)(AllProductsContainer);

const transition = `
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
`;

const ProductsContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const ProductContainerLink = styled(Link)`
    text-decoration: none;
    color: rgb(16, 16, 16);
`;

const ProductContainer = styled.div`
    ${transition} width: 250px;
    height: 330px;
    text-align: center;
    margin: 7.5px;

    :hover {
        background-color: rgba(227, 25, 54, 1);
        color: white;
        cursor: pointer;
    }
`;

const ProductImage = styled.img`
    width: 250px;
    height: 250px;
`;

const ProductInfoDiv = styled.div`
    width: 250px;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 10px;
`;

const ProductTitle = styled.p`
    font-size: 20px;
    padding: 0 15px 0 10px;
    text-align: left;
`;

const AddButton = styled.button`
    ${transition} width: 60px;
    height: 40px;
    color: rgb(16, 16, 16);
    border: 5px solid rgb(16, 16, 16);
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding: 0;
    cursor: pointer;

    :hover {
        border: 5px solid rgb(250, 250, 250);
        background-color: rgb(227, 25, 54);
        color: rgb(250, 250, 250);
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
