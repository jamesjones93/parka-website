import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWorldVinyl } from "./Actions";

class WorldVinyl extends React.Component {
    constructor(props) {
        super(props);

        this.vinylMouseOver = this.vinylMouseOver.bind(this);
        this.vinylMouseOut = this.vinylMouseOut.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getWorldVinyl());
    }

    vinylMouseOver(e) {
        e.currentTarget.children[0].style.opacity = 1;
        this.track.play();
    }

    vinylMouseOut(e) {
        e.currentTarget.children[0].style.opacity = 0;
        this.track.pause();
        this.track.currentTime = 0;
    }

    render() {
        if (!this.props.vinyls) {
            return <p />;
        }

        let vinylsList = this.props.vinyls.map(vinyl => {
            return (
                <VinylContainer
                    key={vinyl.id}
                    onMouseOver={this.vinylMouseOver}
                    onMouseOut={this.vinylMouseOut}
                >
                    <VinylImg src={vinyl.images[0].src} />
                    <audio ref={audio => (this.track = audio)}>
                        <source src="tracks/halflife.mp3" />
                    </audio>
                </VinylContainer>
            );
        });

        return (
            <Container>
                <ReleasesContainer>
                    {(this.props.vinyls && vinylsList) || <Loader />}
                </ReleasesContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        vinyls: state.vinyls
    };
};

export default connect(mapStateToProps)(WorldVinyl);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
    padding: 10% 5%;
    z-index: 3;
`;

const ReleasesContainer = styled.div`
    width: 90%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const VinylContainer = styled.div`
    width: 20%;
    margin: 0 2%;
    height: auto;
    border-radius: 50%;
    background-color: rgb(227, 25, 54);
    overflow: hidden;
    cursor: pointer;
`;

const VinylImg = styled.img`
    ${transition} width: 100%;
    height: 100%;
    opacity: 0;
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
