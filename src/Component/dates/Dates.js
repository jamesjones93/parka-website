import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getDates } from "../../store/action/Actions";
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
                    <DateInfo>{date.date}</DateInfo>
                    <DateDescription>
                        {date.club} - {date.description}
                    </DateDescription>
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
    return {
        dates: state.dates
    };
};

export default connect(mapStateToProps)(Dates);

const Container = styled.div`
    width: 100%;
    margin: 0.15% 0 0 0;
    height: 94.8%;
    position: absolute;
    top: 5%;
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
    object-fit: fill;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
    padding: 4%;
    z-index: -1;
`;

const EventDate = styled.p`
    font-size: 35px;

    @media only screen and (max-device-width: 768px) {
        font-size: 50px;
        padding: 0 0 5% 0;
    }
`;

const EventDescription = styled.p`
    font-size: 17px;
    width: 85%;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
    }
`;

const EventAddress = styled.p`
    font-size: 17px;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
        margin: 10% 0 0 0;
    }
`;

const ClickedImgContainer = styled.div`
    width: 50%;
    height: 100%;

    @media only screen and (max-device-width: 768px) {
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
`;

const ClickedImg = styled.img`
    width: 100%;
    height: 100%;

    @media only screen and (max-device-width: 768px) {
        height: 100%;
        width: auto;
    }
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
//change DateContainer height back to 32.4% when more dates are in
const DateContainer = styled.div`
    width: 100%;
    height: 50%;
    padding: 0.2% 0 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    color: rgb(250, 250, 250);
    cursor: pointer;

    @media only screen and (max-device-width: 768px) {
        font-size: 30px;
    }
    //
`;

const DateInfo = styled.p`
    padding: 0 0 0 5%;
    width: 80%;
    line-height: 2;
`;

const DateDescription = styled.span`
    margin: 0 0 0 20%;
    overflow: hidden;
    position: absolute;
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
