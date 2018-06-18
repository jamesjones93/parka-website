import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProducts, getRecords } from "./Actions";

class AllProductsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getAllProducts());
    }

    render() {
        if (!this.props.products) {
            return <Loader />;
        }

        let products;

        if (this.props.params.filter === "all") {
            products = this.props.products.filter(
                product =>
                    product.productType === "Merchandise" ||
                    product.productType === "Record"
            );
        } else if (this.props.params.filter === "merchandise") {
            products = this.props.products.filter(
                product => product.productType === "Merchandise"
            );
        } else if (this.props.params.filter === "records") {
            products = this.props.products.filter(
                product => product.productType === "Record"
            );
        }

        let productsList = products.map(product => {
            let productUrl = "/shop/product/" + product.handle;

            let price = Math.round(product.variants[0].price);

            let availability = false;

            product.variants.forEach(item => {
                if (item.available === true) {
                    availability = true;
                }
            });

            let greyText = {};

            if (!availability) {
                greyText = {
                    opacity: 0.3
                };
            }

            return (
                <ProductContainerLink
                    to={productUrl}
                    params={{ productId: product.id }}
                    key={product.id}
                >
                    <ProductContainer>
                        <ProductImageContainer>
                            {!availability && <SoldOut>OUT OF STOCK</SoldOut>}
                            <ProductImage src={product.images[0].src} />
                        </ProductImageContainer>
                        <ProductInfoDiv>
                            <ProductPrice className="price" style={greyText}>
                                ${price}
                            </ProductPrice>
                            <ProductTitle style={greyText}>
                                {product.title}
                            </ProductTitle>
                        </ProductInfoDiv>
                    </ProductContainer>
                </ProductContainerLink>
            );
        });

        return <ProductsContainer>{productsList}</ProductsContainer>;
    }
}

const mapStateToProps = function(state) {
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
    width: 1060px;
    margin: 0 auto;
    padding: 5%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media (max-width: 1300px) {
        width: 795px;
    }
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

        .price {
            ${transition} border: 3px solid rgb(250, 250, 250);
            color: rgb(250, 250, 250);
        }
    }
`;

const ProductImageContainer = styled.div`
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    font-size: 14px;
    padding: 0 15px 0 10px;
    text-align: left;
`;

const ProductPrice = styled.p`
    width: 40px;
    height: 30px;
    border: 3px solid rgb(16, 16, 16);
    font-size: 16px;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SoldOut = styled.div`
    z-index: 1;
    width: 180px;
    height: 180px;
    padding: 15px;
    position: absolute;
    border: 2px solid rgb(227, 25, 54);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    color: rgb(227, 25, 54);
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
