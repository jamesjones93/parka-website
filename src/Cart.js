import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            overlayLeft: "100%"
        };
    }

    render() {
        return (
            <Overlay ref={div => (this.overlay = div)}>
                <Container>
                    <h1>testing</h1>
                </Container>
            </Overlay>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        showCart: state.showCart,
        cart: state.cart
    };
};

export default connect(mapStateToProps)(Cart);

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: red;
    z-index: 10;
`;

const Container = styled.div`
    width: 50%;
    position: relative;
    left: 50%;
    height 100vh;
    background-color: white;
    padding: 0;
    margin: 0;
`;
