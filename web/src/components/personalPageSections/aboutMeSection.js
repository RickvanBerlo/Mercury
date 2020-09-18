import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import image from '../../assets/profilepic.webp';
import colors from '../../constants/colors';
import LinkButton from '../../components/buttons/cv/linkButton';

const AboutMeSection = ({ name, content, infoTitle, infoContent }) => {
    const [opacity, setopacity] = useState(0);
    const [transform, setTransfrom] = useState("30px");

    const listenScrollEvent = (e) => {
        e.preventDefault();
        if (opacity !== 0) return;
        if (document.getElementById(name).getBoundingClientRect().y < 600) {
            setopacity(1);
            setTransfrom("0px");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    })


    return (
        <Container id={name}>
            <CenterBlock opacity={opacity} transform={transform}>
                <CenterContainer>
                    <LeftContainer>
                        <ImageContainer>
                            <Image src={image} />
                        </ImageContainer>
                    </LeftContainer>
                    <RightContainer>
                        <TextContainer>
                            <Title>{content.TITLE}</Title>
                            <Description>{content.DESCRIPTION}</Description>
                            <InfoTitle>{infoTitle}</InfoTitle>
                            <FlexContainer>
                                <InfoDescription>{infoContent}</InfoDescription>
                                <ButtonContainer>
                                    <LinkButton
                                        name="Download CV"
                                        padding="10px 20px"
                                        display="inline-block"
                                        margin="25px 0px 0px 0px"
                                        borderRadius="4px"
                                        clickBgColor={colors.LIGHT_GREEN}
                                        fontSize="18px"
                                        href="/cv/CV_RickvanBerlo.pdf"
                                    >
                                    </LinkButton>
                                </ButtonContainer>
                            </FlexContainer>
                        </TextContainer>
                    </RightContainer>
                </CenterContainer >
            </CenterBlock >
        </Container >
    );
}

//styles

const CenterBlock = styled.div`
    margin-left: 5%;
    opacity: ${props => props.opacity};
    margin-right: 5%;
    padding-top: 60px;
    padding-bottom: 60px;
    display: inline-block;
    transform: translate(0px, ${props => props.transform});
    text-align: left;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    -o-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* opera */
    -ms-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* IE 10 */
    -moz-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* Firefox */
    -webkit-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /*safari and chrome */
`
const FlexContainer = styled.div`
    display: flex;
    @media (max-width: 900px){
        display: block;
    }
    @media (max-width: 767px){
        display: flex;
    }
    @media (max-width: 700px){
        display: block;
    }
`

const Container = styled.div`
    text-align: center;
    background-color: ${colors.DARK_GRAY}
`

const ButtonContainer = styled.div`
    flex: 1;
    @media (max-width: 900px){
        margin-bottom: 20px;
    }
    @media (max-width: 700px){
        margin-bottom: 20px;
    }
`

const Title = styled.h3`
    font: 22px 'Open Sans Bold',sans-serif;
    font-weight:600;
    user-select: none;
    color: ${colors.WHITE}
`

const InfoTitle = styled.h3`
    font: 22px 'Open Sans Bold',sans-serif;
    font-weight:600;
    user-select: none;
    margin-bottom: 0px;
    color: ${colors.WHITE}
`

const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'Open Sans',sans-serif;
    line-height: 30px;
    white-space: pre-line;
`
const InfoDescription = styled.p`
    color: ${colors.GRAY};
    font: 16px 'Open Sans',sans-serif;
    line-height: 30px;
    white-space: pre-line;
    flex: 2;
`

const CenterContainer = styled.div`
    width: 96%;
    max-width: 1020px;
    margin: 0 auto;
    display: flex;
    @media (max-width: 767px) {
        display: grid;
    }
`

const TextContainer = styled.div`
    position: relative;
    padding: 0 20px;
    min-height: 1px;
    user-select: none;
    @media (max-width: 767px) {
        margin - top: 50px;
    }
`

const LeftContainer = styled.div`
    margin-top: 10px;
    padding-right: 40px;
    min-width: 200px;
    @media (max-width: 767px) {
        display: contents;
        margin: 0px 30px;
    }
`
const RightContainer = styled.div`
    width: 60vw;
    @media (max-width: 767px) {
        width: 80vw;
    }
`

const ImageContainer = styled.div`
    margin-top: 3%;
    position: relative;
    min-width: 200px;
    float: left;
    @media (max-width: 767px) {
        margin - left: 20px;
    }
`
const Image = styled.img`
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 100%;
    pointer-events: none;
    user-select: none;
`

export default AboutMeSection;
