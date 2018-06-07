import React from "react";
import { AppProvider, Page, Card, Button } from "@shopify/polaris";
import styled from "styled-components";
import { connect } from "react-redux";
import { getRecords } from "./Actions";

class Shop extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getRecords());
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
                    <RecordTitle>{record.title}</RecordTitle>
                </RecordContainer>
            );
        });

        return (
            <Container>
                <h1>Parka Shop</h1>
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
`;

const RecordsContainer = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const RecordContainer = styled.div`
    ${transition} width: 260px;
    height: 260px;
    text-align: center;
    padding: 30px 0 10px 0;
    margin: 7.5px;
    border-radius: 4px;
    color: rgb(120, 120, 120);

    :hover {
        background-color: rgba(227, 25, 54, 1);
        color: white;
        cursor: pointer;
    }
`;

const RecordImage = styled.img`
    width: 200px;
    height: 200px;
`;

const RecordTitle = styled.p`
    font-size: 20px;
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
