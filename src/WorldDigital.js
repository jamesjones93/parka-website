import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWorldDigital, addToCart } from "./Actions";

class WorldDigital extends React.Component {
    constructor(props) {
        super(props);

        this.digitalMouseOver = this.digitalMouseOver.bind(this);
        this.digitalMouseOut = this.digitalMouseOut.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getWorldDigital());
    }

    digitalMouseOver(tag, e) {
        if (tag === "ComingSoon") {
            e.currentTarget.children[0].style.filter = "blur(5px)";
            e.currentTarget.children[1].style.opacity = 1;
            e.currentTarget.style.cursor = "default";
        }

        e.currentTarget.style.backgroundColor = "rgb(250, 250, 250)";
        e.currentTarget.children[0].style.opacity = 1;
        this.track.play();
    }

    digitalMouseOut(e) {
        e.currentTarget.children[0].style.opacity = 0;
        e.currentTarget.children[1].style.opacity = 0;
        e.currentTarget.style.backgroundColor = "rgb(227, 25, 54)";
        this.track.pause();
        this.track.currentTime = 0;
    }

    addToCart(trackId, tag, e) {
        if (tag === "ComingSoon") {
            return;
        } else {
            let productInfo = {
                id: trackId,
                quantity: 1
            };

            this.props.dispatch(addToCart(productInfo));
        }
    }

    render() {
        if (!this.props.digital) {
            return <p />;
        }

        let digitalList = this.props.digital.map(track => {
            let tag;
            if (track.tags.length > 0) {
                tag = track.tags[0].value;
            } else {
                tag = null;
            }

            return (
                <DigitalContainer
                    key={track.id}
                    onMouseOver={e => this.digitalMouseOver(tag, e)}
                    onMouseOut={this.digitalMouseOut}
                    onClick={e =>
                        this.addToCart(
                            track.variants[0].id,
                            track.tags[0].value,
                            e
                        )
                    }
                >
                    <DigitalImg src={track.images[0].src} />
                    <audio ref={audio => (this.track = audio)}>
                        <source src={"tracks/" + track.title + ".mp3"} />
                    </audio>
                </DigitalContainer>
            );
        });

        return (
            <Container>
                <ReleasesContainer>
                    {(this.props.digital && digitalList) || <Loader />}
                </ReleasesContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        digital: state.digital
    };
};

export default connect(mapStateToProps)(WorldDigital);

const transition = `
    -moz-transition: all 0.10s ease-in;
    -o-transition: all 0.10s ease-in;
    -webkit-transition: all 0.10s ease-in;
    transition: all 0.10s ease-in;
`;

const Container = styled.div`
    background-color: rgb(250, 250, 250);
    color: rgb(16, 16, 16);
    width: 90%;
    height: 100%;
    margin: 20px 0 0 0;
    padding: 4% 5% 10% 5%;
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

const DigitalContainer = styled.div`
    width: 20%;
    margin: 0 2% 2% 2%;
    height: auto;
    border-radius: 50%;
    background-color: rgb(227, 25, 54);
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DigitalImg = styled.img`
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
