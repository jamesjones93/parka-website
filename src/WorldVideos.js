import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class WorldVideos extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <Container>
                <VideoContainer>
                    <iframe
                        src="https://player.vimeo.com/video/275644006"
                        width="640"
                        height="360"
                        frameBorder="0"
                        webkitallowfullscreen="true"
                        mozallowfullscreen="true"
                        allowFullScreen="true"
                    />
                </VideoContainer>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        worldReleases: state.worldReleases
    };
};

export default connect(mapStateToProps)(WorldVideos);

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
`;

const VideoContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
