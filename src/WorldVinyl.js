import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getWorldVinyl, addToCart } from "./Actions";

class WorldVinyl extends React.Component {
    constructor(props) {
        super(props);

        this.vinylMouseOver = this.vinylMouseOver.bind(this);
        this.vinylMouseOut = this.vinylMouseOut.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getWorldVinyl());
    }

    vinylMouseOver(sku, e) {
        if (sku == 0) {
            e.currentTarget.children[0].style.filter = "blur(5px)";
            e.currentTarget.children[1].style.opacity = 1;
            e.currentTarget.style.cursor = "default";
        }

        e.currentTarget.style.backgroundColor = "rgb(16, 16, 16)";
        e.currentTarget.children[0].style.opacity = 1;
        this.track.play();
    }

    vinylMouseOut(e) {
        e.currentTarget.children[0].style.opacity = 0;
        e.currentTarget.children[1].style.opacity = 0;
        e.currentTarget.style.backgroundColor = "rgb(227, 25, 54)";
        this.track.pause();
        this.track.currentTime = 0;
    }

    addToCart(vinyl, e) {
        if (vinyl.tags.length > 0) {
            return;
        } else {
            let productInfo = {
                id: vinyl.variants[0].id,
                quantity: 1
            };
            console.log(productInfo);
            this.props.dispatch(addToCart(productInfo));
        }
    }

    render() {
        if (!this.props.vinyls) {
            return <Loader />;
        }

        let vinylsList = this.props.vinyls.map(vinyl => {
            console.log(vinyl);
            return (
                <VinylContainer
                    key={vinyl.id}
                    onMouseOver={e =>
                        this.vinylMouseOver(vinyl.variants[0].sku, e)
                    }
                    onMouseOut={this.vinylMouseOut}
                    onClick={e => this.addToCart(vinyl, e)}
                >
                    <VinylImg src={vinyl.images[0].src} />
                    {vinyl.variants[0].sku == 0 && (
                        <OverlayText>{vinyl.variants[0].title}</OverlayText>
                    )}
                    <audio ref={audio => (this.track = audio)}>
                        <source src={"tracks/" + vinyl.title + ".mp3"} />
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
    -moz-transition: all 0.10s ease-in;
    -o-transition: all 0.10s ease-in;
    -webkit-transition: all 0.10s ease-in;
    transition: all 0.10s ease-in;
`;

const Container = styled.div`
    background-color: rgb(16, 16, 16);
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
`;

const ReleasesContainer = styled.div`
    margin: 0 auto;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

const VinylContainer = styled.div`
    background-color: rgb(227, 25, 54);
    width: 200px;
    margin: 1.5%
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VinylImg = styled.img`
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
    margin: 0 auto;
    margin: 20%;
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
