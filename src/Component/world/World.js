import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import WorldComponent from './WorldComponent';
import { getAllProducts } from '../../store/action/shopify/shopifyActions';

class World extends React.Component {
    constructor(props) {
        super(props);

        this.toggleSection = this.toggleSection.bind(this);
    }

    componentDidMount() {
        if (!this.props.products.length) this.props.dispatch(getAllProducts(null));
    }

    toggleSection(e) {
        const children = e.currentTarget.parentElement.parentElement.children

        children[0].style.height = '7%';
        children[1].style.height = '7%';
        children[2].style.height = '7%';
        children[3].style.height = '7%';

        e.currentTarget.parentElement.style.height = '73%';
    }

    render() {
        this.sectionContainerHeight = { height: '7%' };
        const { products } = this.props;
        if (!products.length) return <Loader />;

        const worldInfo = products.reduce((prev, curr) => {
            if (curr.productType === 'WorldMix') {
                prev.mixes.push(curr);
            } else if (curr.productType === 'WorldDigital') {
                prev.digitals.push(curr);
            } else if (curr.productType === 'WorldVinyl') {
                prev.vinyls.push(curr);
            } else if (curr.productType === 'WorldMixtape') {
                prev.mixtapes.push(curr);
            }

            return prev;
        }, {  mixes: [], digitals: [], vinyls: [], mixtapes: [] });



        return (
            <Container>
                <DigitalContainer style={this.sectionContainerHeight}>
                    <Title onClick={this.toggleSection} >TRACKS</Title>
                    <WorldComponent
                        info={worldInfo.digitals}
                        colorStyles={{ backgroundColor: 'rgb(16, 16, 16)', color: 'rgb(250, 250, 250)' }}
                        circleStyles={{ backgroundColor: 'rgb(227, 25, 54)' }}
                    />
                </DigitalContainer>
                <MixesContainer style={this.sectionContainerHeight}>
                    <Title onClick={this.toggleSection}>MIXES</Title>
                    <WorldComponent
                        info={worldInfo.mixes}
                        colorStyles={{ backgroundColor: 'rgb(250, 250, 250)', color: 'rgb(16, 16, 16)' }}
                        circleStyles={{ backgroundColor: '' }}
                    />
                </MixesContainer>
                <MixtapesContainer style={this.sectionContainerHeight}>
                    <Title onClick={this.toggleSection}>MIXTAPES</Title>
                    <WorldComponent
                        info={worldInfo.mixtapes}
                        colorStyles={{ backgroundColor: 'rgb(227, 25, 54)', color: 'rgb(250, 250, 250)' }}
                        circleStyles={{ backgroundColor: 'rgb(16, 16, 16)' }}
                    />
                </MixtapesContainer>
                <VinylContainer style={this.sectionContainerHeight}>
                    <Title onClick={this.toggleSection}>VINYL</Title>
                    <WorldComponent
                        info={worldInfo.vinyls}
                        colorStyles={{ backgroundColor: 'rgb(16, 16, 16)', color: 'rgb(250, 250, 250)' }}
                        circleStyles={{ backgroundColor: 'rgb(227, 25, 54)' }}
                    />
                </VinylContainer>
                <VideosContainer style={this.sectionContainerHeight}>
                    <Title onClick={this.toggleSection}>VIDEOS</Title>
                    <WorldComponent />
                </VideosContainer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shopifyReducer.products
    };
};

export default connect(mapStateToProps)(World);

const transition = `
    -moz-transition: all 0.15s ease-in;
    -o-transition: all 0.15s ease-in;
    -webkit-transition: all 0.15s ease-in;
    transition: all 0.15s ease-in;
`;

const Container = styled.div`
    width: 100%;
    height: 92.5%;
    position: absolute;
    top: 7.5%;
    background-color: rgb(227, 25, 54);
    overflow: hidden;
`;

const sectionContainer = `
    ${transition} width: 100%;
    margin: 0;
    background-color: inherit;
    overflow: scroll;
    z-index: -1;
    display: flex;
    flex-direction: column;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const DigitalContainer = styled.div`
    ${sectionContainer} background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
`;

const MixesContainer = styled.div`
    ${sectionContainer} background-color: rgb(250, 250, 250);
    color: rgb(16, 16, 16);
`;

const MixtapesContainer = styled.div`
    ${sectionContainer} background-color: rgb(227, 25, 54);
    color: rgb(250, 250, 250);
`;

const VinylContainer = styled.div`
    ${sectionContainer} background-color: rgb(16, 16, 16);
    color: rgb(250, 250, 250);
`;

const VideosContainer = styled.div`
    ${sectionContainer} background-color: rgb(250, 250, 250);
    color: rgb(16, 16, 16);
`;

const Title = styled.p`
    font-size: 18px;
    margin: 0;
    width: 100%;
    padding: 4px 0 35px 5%;
    z-index: 5;
    cursor: pointer;
    align-self: center;
    position: fixed;
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
