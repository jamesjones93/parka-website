import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDates } from "./Actions";
import ReactCSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Dates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.openClickedContainer = this.openClickedContainer.bind(this);
        this.closeClickedContainer = this.closeClickedContainer.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getDates());
    }

    openClickedContainer(index, e) {
        this.setState({
            clicked: true,
            clickedIndex: index
        });
    }

    closeClickedContainer() {
        this.setState({
            clicked: false
        });
    }

    render() {
        if (!this.props.dates) {
            return <Loader />;
        }

        let dates = this.props.dates;

        let datesList = dates.map((date, index) => {
            var divStyle = {};

            if (index % 3 === 0) {
                divStyle.backgroundColor = "rgb(227, 25, 54)";
            } else if (index % 2 === 0) {
                divStyle.backgroundColor = "rgb(16, 16, 16)";
            } else {
                divStyle.backgroundColor = "rgb(250, 250, 250)";
                divStyle.color = "rgb(16, 16, 16)";
            }

            return (
                <DateContainer
                    style={divStyle}
                    key={index}
                    onClick={e => this.openClickedContainer(index, e)}
                >
                    <DateDate>{date.date}</DateDate>
                    <DateDescription>{date.description}</DateDescription>
                </DateContainer>
            );
        });

        return (
            <Container>
                <OuterContainer>
                    {this.state.clicked && (
                        <ClickedContainer>
                            <EventTextContainer>
                                <EventDate>
                                    {dates[this.state.clickedIndex].date}
                                </EventDate>
                                <EventDescription>
                                    {dates[this.state.clickedIndex].description}
                                </EventDescription>

                                <EventAddress>
                                    {dates[this.state.clickedIndex].club}
                                </EventAddress>
                                <EventAddress>
                                    {dates[this.state.clickedIndex].clubAddress}
                                </EventAddress>
                            </EventTextContainer>
                            <ClickedImgContainer>
                                <ClickedImg
                                    src={
                                        "/eventphotos/" +
                                        dates[this.state.clickedIndex].img
                                    }
                                />
                            </ClickedImgContainer>
                            <ClickedCross
                                src="/icons/crosswhite.png"
                                onClick={this.closeClickedContainer}
                            />
                        </ClickedContainer>
                    )}
                </OuterContainer>

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

const OuterContainer = styled.div`
    width: 100%;
    height: 66%;
    overflow: hidden;
`;

const ClickedContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    z-index: -1;
`;

const EventTextContainer = styled.div`
    width: 42%;
    object-fit: contain;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
    padding: 4%;
    z-index: -1;
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
`;

const ClickedImg = styled.img`
    height: 100%;
    width: 100%;
`;

const ClickedCross = styled.img`
    width: 2.5%;
    position: absolute;
    margin: 2% 0 0 95.5%;
    cursor: pointer;
    z-index: 5;
`;

const DatesListContainer = styled.div`
    width: 100%;
    height: 40%;
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
