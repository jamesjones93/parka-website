import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getWorldVideos } from "../../store/action/Actions";

class WorldVideos extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getWorldVideos());
    }

    render() {
        if (!this.props.videos) return <Loader />;

        const videoContainerList = this.props.videos.map((video, index) => {
            return (
                <iframe
                    key={index}
                    src={video.link}
                    width="600px"
                    height="380px"
                    frameBorder="0"
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    allowFullScreen="true"
                />
            );
        });

        return (
            <Container>
                <VideoContainer>{videoContainerList}</VideoContainer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        videos: state.videos
    };
};

export default connect(mapStateToProps)(WorldVideos);

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(250, 250, 250);
    color: rgb(16, 16, 16);
    overflow: scroll;
`;

const VideoContainer = styled.div`
    width: 100%
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 80px 0 40px 0;

    @media (max-width: 1000) {
        padding: 9% 0 0 0;
    }

    @media (max-width: 250) {
        padding: 7%;
    }
    @media only screen and (max-device-width: 768px) {
        margin: 20% 0 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
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
