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

    addToCart(mixtapeId, tag, e) {
        if (tag === "ComingSoon") {
            return;
        } else {
            let productInfo = {
                id: mixtapeId,
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
                    onClick={e =>
                        this.addToCart(
                            mixtape.variants[0].id,
                            mixtape.tags[0].value,
                            e
                        )
                    }
                >
                    <MixtapeImg src={mixtape.images[0].src} />

                    <audio ref={audio => (this.track = audio)}>
                        <source src={"tracks/" + mixtape.title + ".mp3"} />
                    </audio>
                </MixtapeContainer>
            );
        });

        return (
            <Container>
                <ReleasesContainer>
                    {(this.props.mixtapes && mixtapesList) || <Loader />}
                </ReleasesContainer>
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
    width: 90%;
    height: 100%;
    background-color: rgb(227, 25, 54);
    color: rgb(250, 250, 250);
    padding: 4% 5% 10% 5%;
    margin: 20px 0 0 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ReleasesContainer = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const MixtapeContainer = styled.div`
    width: 20%;
    margin: 0 2%;
    height: auto;
    border-radius: 50%;
    background-color: rgb(16, 16, 16);
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
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
