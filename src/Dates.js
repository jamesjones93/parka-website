import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDates } from "./Actions";

class Dates extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getDates());
    }

    render() {
        if (!this.props.dates) {
            return <Loader />;
        }

        let datesList = this.props.dates.map((date, index) => {
            var divStyle = {};

            if (index % 3 === 0) {
                divStyle.backgroundColor = "rgb(227, 25, 54)";
            } else if (index % 2 === 0) {
                divStyle.backgroundColor = "rgb(16, 16, 16)";
            } else {
                divStyle.backgroundColor = "rgb(250, 250, 250)";
                divStyle.color = "rgb(16, 16, 16)";
            }

            console.log(divStyle);

            return (
                <DateContainer style={divStyle}>
                    <DateDate>{date.date}</DateDate>
                    <DateDescription>{date.description}</DateDescription>
                </DateContainer>
            );
        });

        return (
            <Container>
                <ClickedContainer>
                    <EventTextContainer>
                        <EventDate>JUNE 1</EventDate>
                        <EventDescription>
                            Conduit at h0l0 - P. Leone, Analog Soul, Peter
                            Fonda, Naang Tani
                        </EventDescription>
                        <EventAddress>
                            Ohm Club<br /> Koepenikerstr,<br /> 20 10999,<br />{" "}
                            Berlin<br />
                            +49 159 042895<br /> contact@ohmclub.de
                        </EventAddress>
                    </EventTextContainer>
                    <ClickedImgContainer>
                        <ClickedImg src="/eventphotos/june19-bossanova.jpg" />
                    </ClickedImgContainer>
                </ClickedContainer>
                <DatesListContainer>{datesList}</DatesListContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    console.log(state);
    return {
        dates: state.dates
    };
};

export default connect(mapStateToProps)(Dates);

const Container = styled.div`
    width: 100%;
    margin: 0.15% 0 0 0;
    height: 89.8%;
    position: absolute;
    top: 10%;
    color: rgb(16, 16, 16);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const ClickedContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
    display: flex;
    flex-direction: row;
`;

const EventTextContainer = styled.div`
    width: 42%;
    height: 100%;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
    padding: 4%;
`;

const EventDate = styled.p`
    font-size: 35px;
`;

const EventDescription = styled.p`
    font-size: 17px;
    width: 85%;
`;

const EventAddress = styled.p`
    font-size: 17px;
`;

const ClickedImgContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const ClickedImg = styled.img`
    height: 100%;
`;

const DatesListContainer = styled.div`
    width: 100%;
    overflow: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const DateContainer = styled.div`
    width: 100%;
    height: 25%;
    padding: 0.2% 0 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    color: rgb(250, 250, 250);
    cursor: pointer;
`;

const DateDate = styled.p`
    height: 100%;
    width: 15%;
    padding: 0 0 0 5%;
    line-height: 2;
`;

const DateDescription = styled.p`
    height: 100%;
    line-height: 2;
    overflow: hidden;
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
