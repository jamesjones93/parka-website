import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { checkForCookie } from "./Actions";
import WorldVinyl from "./WorldVinyl";
import WorldDigital from "./WorldDigital";
import WorldVideos from "./WorldVideos";
import WorldMixtapes from "./WorldMixtapes";

class World extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSection = this.toggleSection.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(checkForCookie());
    }

    toggleSection(e) {
        if (e.currentTarget.parentElement.style.height === "80%") {
            e.currentTarget.parentElement.style.height = "7%";
        } else {
            e.currentTarget.parentElement.style.height = "80%";
        }
    }

    render() {
        return (
            <Container>
                <VinylContainer>
                    <Title onClick={this.toggleSection}>VINYL</Title>
                    <WorldVinyl />
                </VinylContainer>
                <DigitalContainer>
                    <Title onClick={this.toggleSection}>DIGITAL</Title>
                    <WorldDigital />
                </DigitalContainer>
                <MixtapesContainer>
                    <Title onClick={this.toggleSection}>MIXTAPES</Title>
                    <WorldMixtapes />
                </MixtapesContainer>
                <VideosContainer>
                    <Title onClick={this.toggleSection}>VIDEOS</Title>
                    <WorldVideos />
                </VideosContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        cookie: state.cookie
    };
};

export default connect(mapStateToProps)(World);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    width: 100%;
    height: 90%;
    position: absolute;
    top: 10%;
    background-color: rgb(227, 25, 54);
    overflow: hidden;
`;

const sectionContainer = `
    ${transition} width: 100%;
    height: 7%;
    margin: 0;
    background-color: inherit;
    overflow: hidden;
    z-index: -1;
`;

const VinylContainer = styled.div`
    ${sectionContainer} background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
`;

const DigitalContainer = styled.div`
    ${sectionContainer} background-color: rgb(250, 250, 250);
    color: rgb(16, 16, 16);
`;

const MixtapesContainer = styled.div`
    ${sectionContainer} background-color: rgb(227, 25, 54);
    color: rgb(250, 250, 250);
`;

const VideosContainer = styled.div`
    ${sectionContainer} background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
`;

const Title = styled.p`
    font-size: 18px;
    margin: 0 0 0 5%;
    padding: 10px 0 0px 0;
    width: 100%;
    cursor: pointer;
`;
