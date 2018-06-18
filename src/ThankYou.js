import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import axios from "./axios";
import { hideThankYou } from "./Actions";

class ThankYou extends React.Component {
    constructor(props) {
        super(props);

        this.closeThankYou = this.closeThankYou.bind(this);
    }

    componentDidMount() {
        console.log("hello");
    }

    closeThankYou() {
        this.props.dispatch(hideThankYou());
        location.pathname = "/";
    }

    render() {
        return (
            <Overlay>
                <Cross
                    src="/icons/crosswhite.png"
                    onClick={this.closeThankYou}
                />
                <Container>
                    <Title>THANK YOU!</Title>
                    <OrderPlacedText>
                        Your order was placed. <br />
                        You will recieve a confirmation E-Mail in few minutes.
                    </OrderPlacedText>
                    <SmallText>
                        Didn't receive one or have any questions? Please send us
                        an email at ops@par-ka.com.
                    </SmallText>
                </Container>
                <RedRectangle />
            </Overlay>
        );
    }
}

const mapStateToProps = function(state) {
    return {};
};

export default connect(mapStateToProps)(ThankYou);

const Overlay = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(16, 16, 16, 0.92);
    display: flex;
    flex-direction: column;
    z-index: 15;
    justify-content: center;
    align-items: center;
`;

const Cross = styled.img`
    width: 2%;
    min-width: 20px;
    position: absolute;
    top: 2.5%;
    left: 95%;
    cursor: pointer;
`;

const Container = styled.div`
    background-color: rgb(250, 250, 250);
    padding: 2%;
    height: 35%;
    width: 40%;
`;

const RedRectangle = styled.div`
    width: 40%;
    padding: 2%;
    height: 15%;
    background-color: rgb(227, 25, 54);
`;

const Title = styled.p`
    font-size: 35px;
    margin: 0;
    font-weight: bold;
`;

const OrderPlacedText = styled.p`
    width: 70%;
    margin: 8% 0 0 0;
    font-weight: bold;
    font-size: 18px;
`;

const SmallText = styled.p`
    width: 70%;
    margin: 8% 0 0 0;
    font-weight: bold;
    font-size: 12px;
`;
