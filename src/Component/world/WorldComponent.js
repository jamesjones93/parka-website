import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { addToCheckout } from '../../store/action/shopify/shopifyActions';

class WoldComponent extends React.Component {
    constructor(props) {
        super(props);

        this.digitalMouseOver = this.digitalMouseOver.bind(this);
        this.digitalMouseOut = this.digitalMouseOut.bind(this);
        this.addToCheckout = this.addToCheckout.bind(this);
    }

    digitalMouseOver(tag, e) {
        if (tag === "ComingSoon" || tag === "N/A") {
            e.currentTarget.children[0].style.filter = "blur(5px)";
            e.currentTarget.children[1].style.opacity = 1;
            e.currentTarget.style.cursor = "default";
        }
        e.currentTarget.children[3].style.opacity = 1;
        e.currentTarget.style.backgroundColor = "rgb(16, 16, 16)";
        e.currentTarget.children[0].style.opacity = 1;
        e.currentTarget.children[1].play();
    }

    digitalMouseOut(e) {
        e.currentTarget.children[0].style.opacity = 0;
        e.currentTarget.children[1].style.opacity = 0;
        e.currentTarget.style.backgroundColor = "rgb(227, 25, 54)";
        e.currentTarget.children[3].style.opacity = 0;
        e.currentTarget.children[1].pause();
    }

    addToCheckout(item, e) {
        let addedOverlayOpacity = e.currentTarget.children[2];
        addedOverlayOpacity.style.opacity = 1;

        setTimeout(() => addedOverlayOpacity.style.opacity = 0, 800);

        if (item.tags.length > 0) return;

        const productInfo = {
            id: item.variants[0].id,
            quantity: 1
        };

        this.props.dispatch(addToCheckout(productInfo));
    }

    render() {
        const { info, colorStyles, circleStyles } = this.props;

        return (
            <Container style={colorStyles}>
                <ReleasesContainer>
                    {info && info.map(item => {
                        const tag = item.tags.length ? item.tags[0].value : null;

                        return (
                            <DigitalContainer
                                key={item.id}
                                onMouseOver={e => this.digitalMouseOver(tag, e)}
                                onMouseOut={this.digitalMouseOut}
                                onClick={e => this.addToCheckout(item, e)}
                                style={circleStyles}
                            >
                                <DigitalImg src={item.images[0].src} />
                                <audio ref={audio => (this.item = audio)}>
                                    <source src={"audio/" + item.handle + ".mp3"} />
                                </audio>
                                <AddedBackgroundOverlay>
                                    <AddedText>ADDED</AddedText>
                                </AddedBackgroundOverlay>
                                <TitleOverlay>
                                    <Title>
                                        {(item.tags.length > 0 && item.description) ||
                                        item.title}
                                    </Title>
                                </TitleOverlay>
                            </DigitalContainer>
                        );
                    }) || <span />}
                </ReleasesContainer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps)(WoldComponent);


const transition = `
    -moz-transition: all 0.10s ease-in;
    -o-transition: all 0.10s ease-in;
    -webkit-transition: all 0.10s ease-in;
    transition: all 0.10s ease-in;
`;

const Container = styled.div`
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

const DigitalContainer = styled.div`
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
    position: relative;
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

const TitleOverlay = styled.div`
    ${transition} width: 200px;
    height: 220px;
    z-index: 3;
    font-size: 12px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(16, 16, 16, 0.2);
    color: rgb(250, 250, 250);
    opacity: 0;
`;

const Title = styled.p`
    width: 80%;
    text-align: center;
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
    position: relative;
    margin: 0 auto;
    top: 120px;
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
