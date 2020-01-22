import React from 'react';
import styled from 'styled-components';
import image from '../../assets/profilepic.png';
import colors from '../../constants/colors';
import LinkButton from '../../components/buttons/linkButton';

const HeadSection = ({ name, content, infoTitle, infoContent }) => {
    return (
        <Container id={name}>
            <CenterBlock>
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
                                    <LinkButton name="Download CV" padding="10px 20px" display="inline-block" margin="25px 0px 0px 0px" borderRadius="4px" fontSize="18px" href="/cv/CV_RickvanBerlo.pdf"></LinkButton>
                                    {/* <CvButton href="/cv/CV_RickvanBerlo.pdf" download>Download CV</CvButton> */}
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
    margin-right: 5%;
    padding-top: 60px;
    padding-bottom: 40px;
    display: inline-block;
    text-align: left;
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

export default HeadSection;
