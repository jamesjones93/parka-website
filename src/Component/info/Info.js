import React from "react";
import styled from "styled-components";

export default function Info() {
    return (
        <Container>
            <LeftContainer>
                <img src="" />
            </LeftContainer>
            <RightContainer>
                <Title>PARKA</Title>
                <Description>
                    Director of Operations:{" "}
                    <Email href="mailto:ops@par-ka.com">ops@par-ka.com</Email>
                </Description>
                <Description>
                    Director of Operations North America:{" "}
                    <Email href="mailto:hi@par-ka.com">hi@par-ka.com</Email>
                </Description>
                <Description>
                    Director of Propoganda:{" "}
                    <Email href="mailto:press@par-ka.com">
                        press@par-ka.com
                    </Email>
                </Description>
                <Description>
                    All other inquiries:{"  "}
                    <Email href="mailto:info@par-ka.com">info@par-ka.com</Email>
                </Description>
                <DemosContainer>
                    <Logo src="/logo/parkalogoblack.png" />
                    <DemosText>is not accepting demos at this time.</DemosText>
                </DemosContainer>
                <br />
                <DescriptionRight>
                    <Email href="https://www.xlr8r.com/news/premiere-hear-a-fierce-techno-cut-from-lawrence-lee">
                        Hear a Fierce Techno Cut From Lawrence Lee
                    </Email>, xlr8r
                </DescriptionRight>
                <DescriptionRight>
                    <Email href="http://www.standardhotels.com/culture/le-bain-lawrence-lee">
                        In the Mix featuring Lawrence Lee
                    </Email>, the standard
                </DescriptionRight>
                <DescriptionRight>
                    <Email href="https://www.standardhotels.com/culture/le-bain-peter-fonda">
                        Peter Fonda's Spellbook
                    </Email>, the standard
                </DescriptionRight>
                <DescriptionRight>
                    <Email href="https://www.xlr8r.com/mp3/peter-fonda-rf-acid">
                        Xlr8r: Peter Fonda 'RF Acid'
                    </Email>, xlr8r
                </DescriptionRight>
                <DescriptionRight>
                    <Email href="https://thump.vice.com/en_us/article/8qbpwx/the-house-that-habibi-built">
                        The House Habibi Built
                    </Email>, thump
                </DescriptionRight>
                <DescriptionRight>
                    <Email href="https://thump.vice.com/en_us/article/z45kpe/cure-your-mid-winter-blues-with-this-hypnotic-house-cut-from-berlins-abu-ashley">
                        Hypnotic House from Abu Ashley
                    </Email>, thump
                </DescriptionRight>
                <br />
            </RightContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
`;

const LeftContainer = styled.div`
    width: 0%;
    height: 100vh;
    top: 0;
    position: absolute;
    left: 0;
    background-color: rgb(250, 250, 250);
`;

const RightContainer = styled.div`
    width: 90%;
    height: 100%;
    top: 0%;
    position: absolute;
    padding: 0 5%;
    margin: 125px 0% 10% 0%;
`;

const Title = styled.p`
    margin: 0% 0 5% 0;
    font-size: 30px;
    font-weight: bold;

    @media only screen and (max-device-width: 768px) {
        margin: 15% 0 5% 0;
        font-size: 55px;
    }
`;

const Description = styled.p`
    font-size: 14px;

    @media only screen and (max-device-width: 768px) {
        margin: 10% 0;
        font-size: 30px;
    }
`;

const DescriptionRight = styled.p`
    font-size: 14px;
    text-align: right;

    @media only screen and (max-device-width: 768px) {
        margin: 10% 0;
        font-size: 30px;
    }
`;

const Email = styled.a`
    text-decoration: underline;
    color: rgb(16, 16, 16);
    margin: 5% 0;
    font-size: 14px;

    @media only screen and (max-device-width: 768px) {
        margin: 10% 0;
        font-size: 28px;
    }
`;

const DemosContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Logo = styled.img`
    height: 14px;
    width: 52px;
    margin: 0 7px 0 0;

    @media only screen and (max-device-width: 768px) {
        height: 28px;
        width: 105px;
    }
`;

const DemosText = styled.p`
    font-size: 14px;
    width: 50%;

    @media only screen and (max-device-width: 768px) {
        font-size: 28px;
    }
`;
