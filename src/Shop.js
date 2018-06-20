import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
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

    render() {
        if (!this.props.products) {
            return <Loader />;
        }

        return (
            <Container>
                <ShopHeaderContainer>
                    <ShopHeaderLink to="/shop/records">RECORDS</ShopHeaderLink>
                    <ShopHeaderLink to="/shop/merchandise">
                        MERCHANDISE
                    </ShopHeaderLink>
                </ShopHeaderContainer>

                <div>
                    <AllProductsContainer params={this.props.match.params} />
                </div>
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
    width: 40%;
    height: 5%;
    padding: 0 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    left: 50%;
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
