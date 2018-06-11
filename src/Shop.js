import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProducts, getRecords } from "./Actions";
import AllProductsContainer from "./AllProductsContainer";
import Product from "./Product";

class Shop extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getAllProducts());
    }

    addToCart() {
        console.log("in here");
    }

    render() {
        if (!this.props.products) {
            return <Loader />;
        }

        return (
            <Container>
                <ShopHeaderContainer>
                    <ShopHeaderLink to="/shop/merchandise">
                        MERCHANDISE
                    </ShopHeaderLink>
                    <ShopHeaderLink to="/shop/records">
                        RECORDS XDIGITAL VIA BANDCAMP
                    </ShopHeaderLink>
                </ShopHeaderContainer>

                <Route exact path="/shop/" component={AllProductsContainer} />
                <Route exact path="/shop/:product" component={Product} />
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        products: state.products
    };
};

export default connect(mapStateToProps)(Shop);

const transition = `
    -moz-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
`;

const Container = styled.div`
    position: absolute;
    top: 10%;
    height: 100%;
    width: 100%;
    text-align: center;
    background-color: rgb(250, 250, 250);
`;

const ShopHeaderContainer = styled.div`
    width: 50%;
    height: 8%;
    margin: 0 0 0 45%;
    padding: 0 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ShopHeaderLink = styled(Link)`
    text-decoration: none;
    color: rgb(16, 16, 16);
    font-size: 18px;
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
