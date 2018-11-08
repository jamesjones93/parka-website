import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProducts } from '../../store/action/shopify/shopifyActions';

class AllProductsContainer extends React.Component {

    componentDidMount() {
        this.props.dispatch(getAllProducts(null));
    }

    render() {
        if (!this.props.products.length) return <Loader />;

        let products;

        if (this.props.params.filter === "all") {
            products = this.props.products.filter(
                product => product.productType === "Merchandise" || product.productType === "Record"
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

        return (
            <ProductsContainer>
                {products.map(product => {
                        const availability = !product.variants.every(item => item.available === false);
                        const greyText = !availability ? { opacity: 0.3 } : {};

                        return (
                            <ProductContainerLink
                                to={`/shop/product/${product.handle}`}
                                params={{ product: product }}
                                key={product.id}
                            >
                                <ProductContainer>
                                    <ProductImageContainer>
                                        {!availability && <SoldOut>OUT OF STOCK</SoldOut>}
                                        <ProductImage src={product.images[0].src} />
                                    </ProductImageContainer>
                                    <ProductInfoDiv style={greyText}>
                                        <ProductPrice className="price">
                                            ${product.variants[0].price}
                                        </ProductPrice>
                                        <ProductTitle>{product.title}</ProductTitle>
                                    </ProductInfoDiv>
                                </ProductContainer>
                            </ProductContainerLink>
                        );
                    })
                }
            </ProductsContainer>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        products: state.shopifyReducer.products
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

    @media (max-width: 1250px) {
        width: 795px;
    }

    @media (max-width: 1000px) {
        width: 530px;
    }

    @media only screen and (max-device-width: 768px) {
        padding: 7% 5%;
        width: 750px;
        justify-content: center;
    }
`;

const ProductContainerLink = styled(Link)`
    text-decoration: none;
    color: rgb(16, 16, 16);
`;

const ProductContainer = styled.div`
    ${transition} width: 250px;
    height: 320px;
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

    @media only screen and (max-device-width: 768px) {
        width: 360px;
        height: 475px;
    }
`;

const ProductImageContainer = styled.div`
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-device-width: 768px) {
        width: 360px;
        height: 360px;
    }
`;

const ProductImage = styled.img`
    width: 250px;
    height: 250px;

    @media only screen and (max-device-width: 768px) {
        width: 360px;
        height: 360px;
    }
`;

const ProductInfoDiv = styled.div`
    width: 250px;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 10px;

    @media only screen and (max-device-width: 768px) {
        padding: 20px 0 0 10px;
    }
`;

const ProductTitle = styled.p`
    font-size: 14px;
    padding: 0 15px 0 10px;
    text-align: left;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
        width: 100%;
    }
`;

const ProductPrice = styled.p`
    width: 55px;
    height: 30px;
    border: 3px solid rgb(16, 16, 16);
    font-size: 16px;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-device-width: 768px) {
        width: 80px;
        height: 60px;
        font-size: 28px;
    }
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

    @media only screen and (max-device-width: 768px) {
        width: 80px;
        height: 60px;
        font-size: 16px;
    }
`;

const Loader = styled.div`
    position: fixed;
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
