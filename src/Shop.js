import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getRecords } from "./Actions";

class Shop extends React.Component {
    constructor(props) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getRecords());
    }

    addToCart() {
        console.log("in here");
    }

    render() {
        if (!this.props.records) {
            return <Loader />;
        }

        let records = this.props.records.products;

        let recordsList = records.map(record => {
            return (
                <RecordContainer>
                    <RecordImage src={record.images[0].src} />
                    <RecordInfoDiv>
                        <AddButton onClick={this.addToCart}>ADD</AddButton>
                        <RecordTitle>{record.title}</RecordTitle>
                    </RecordInfoDiv>
                </RecordContainer>
            );
        });

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
                <RecordsContainer>{recordsList}</RecordsContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        records: state.records
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
    height: 90%;
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

const RecordsContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const RecordContainer = styled.div`
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

const RecordImage = styled.img`
    width: 250px;
    height: 250px;
`;

const RecordInfoDiv = styled.div`
    width: 250px;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 10px;
`;

const RecordTitle = styled.p`
    font-size: 20px;
    padding: 0 0 0 10px;
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
