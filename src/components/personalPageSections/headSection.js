import React from 'react';
import styled from 'styled-components';
import image from '../../assets/profilepic.jpg';
import colors from '../../constants/colors';

const HeadSection = ({ name, content, contactTitle, contactContent }) => {
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
                            <Title>{contactTitle}</Title>
                            <Description>{contactContent}</Description>
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

const Container = styled.div`
    text-align: center;
    background-color: ${colors.DARK_GRAY}
`
const Title = styled.h3`
    font: 22px 'Open Sans Bold',sans-serif;
    font-weight:600;
    color: ${colors.WHITE}
`
const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'Open Sans',sans-serif;
    line-height: 30px;
    white-space: pre-line;
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
    @media (max-width: 767px) {
        margin-top: 50px;
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
        margin-left: 20px;
    }
`
const Image = styled.img`
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 100%;
`


export default HeadSection;
