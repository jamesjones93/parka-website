import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWorldMixtapes, addToCart } from "./Actions";

class Worldmixtape extends React.Component {
    constructor(props) {
        super(props);

        this.mixtapeMouseOver = this.mixtapeMouseOver.bind(this);
        this.mixtapeMouseOut = this.mixtapeMouseOut.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getWorldMixtapes());
    }

    mixtapeMouseOver(tag, e) {
        if (tag === "ComingSoon") {
            e.currentTarget.children[0].style.filter = "blur(5px)";
            e.currentTarget.children[1].style.opacity = 1;
            e.currentTarget.style.cursor = "default";
        }

        e.currentTarget.style.backgroundColor = "rgb(227, 25, 54)";
        e.currentTarget.children[0].style.opacity = 1;
        this.track.play();
    }

    mixtapeMouseOut(e) {
        e.currentTarget.children[0].style.opacity = 0;
        e.currentTarget.children[1].style.opacity = 0;
        e.currentTarget.style.backgroundColor = "rgb(16, 16, 16)";
        this.track.pause();
        this.track.currentTime = 0;
    }

    addToCart(mixtape, e) {
        let addedOverlayOpacity = e.currentTarget.children[2];

        addedOverlayOpacity.style.opacity = 1;

        setTimeout(() => {
            addedOverlayOpacity.style.opacity = 0;
        }, 2000);

        if (mixtape.tags.length > 0) {
            return;
        } else {
            let productInfo = {
                id: mixtape.variants[0].id,
                quantity: 1
            };

            this.props.dispatch(addToCart(productInfo));
        }
    }

    render() {
        if (!this.props.mixtapes) {
            return <p />;
        }

        let mixtapesList = this.props.mixtapes.map(mixtape => {
            let tag;
            if (mixtape.tags.length > 0) {
                tag = mixtape.tags[0].value;
            } else {
                tag = null;
            }
            return (
                <MixtapeContainer
                    key={mixtape.id}
                    onMouseOver={e => this.mixtapeMouseOver(tag, e)}
                    onMouseOut={this.mixtapeMouseOut}
                    onClick={e => this.addToCart(mixtape, e)}
                >
                    <MixtapeImg src={mixtape.images[0].src} />

                    <audio ref={audio => (this.track = audio)}>
                        <source src={"tracks/" + mixtape.title + ".mp3"} />
                    </audio>
                    <AddedBackgroundOverlay>
                        <AddedText>ADDED</AddedText>
                    </AddedBackgroundOverlay>
                </MixtapeContainer>
            );
        });

        return (
            <Container>
                <MixtapesContainer>
                    {(this.props.mixtapes && mixtapesList) || <Loader />}
                </MixtapesContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        mixtapes: state.mixtapes
    };
};

export default connect(mapStateToProps)(Worldmixtape);

const transition = `
    -moz-transition: all 0.10s ease-in;
    -o-transition: all 0.10s ease-in;
    -webkit-transition: all 0.10s ease-in;
    transition: all 0.10s ease-in;
`;

const Container = styled.div`
    background-color: rgb(227, 25, 54);
    color: rgb(250, 250, 250);
    width: 90%;
    margin: 30px 0 0 0;
    padding: 2% 5% 10% 5%;
    z-index: 3;
    overlflow: hidden;

    @media (max-width: 550px) {
        margin: 40px 0 0 0;
    }

    @media (max-width: 250) {
        margin: 45px 0 0 0;
    }

    @media only screen and (max-device-width: 768px) {
        margin: 20% 0 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

const MixtapesContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const MixtapeContainer = styled.div`
    background-color: rgb(16, 16, 16);
    width: 200px;
    margin: 1.5%
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const MixtapeImg = styled.img`
    ${transition} width: 100%;
    height: 100%;
    opacity: 0;
`;

const OverlayText = styled.p`
    ${transition} position: absolute;
    margin: 0;
    opacity: 0;
`;

const AddedBackgroundOverlay = styled.div`
    ${transition} width: 200px;
    height: 220px;
    z-index: 3;
    font-size: 30px;
    position: absolute;
    display: flex;
    align-items: center;
    background-color: rgba(2, 105, 55, 0.9);
    color: rgb(250, 250, 250);
    opacity: 0;
`;

const AddedText = styled.p`
    width: 100%;
    text-align: center;
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
