import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import image from '../../assets/profilepic.jpg';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const HeadSection = () => {
    return (
        <Container>
            <CenterContainer>
                <ImageContainer>
                    <Image src={image} />
                </ImageContainer>
                <TextContainer>
                    <Title>{strings.HEADSECTION.TITLE}</Title>
                    <Description>{strings.HEADSECTION.DESCRIPTION}</Description>
                    <Title>{strings.HEADSECTION.CONTACT_TITLE}</Title>
                    <Description>{strings.HEADSECTION.CONTACT_DESCRIPTION}</Description>
                </TextContainer>
            </CenterContainer>
        </Container>
    );
}

//styles
const Container = styled.div`
    margin-top: -50px;
    background: ${colors.DARK_GRAY};
    padding-top: 96px;
    padding-bottom: 80px;
    overflow: hidden;
`
const Title = styled.h3`
    color: white;
    font: 22px/30px 'opensans-bold', sans-serif;
`
const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'opensans-bold', sans-serif;
    line-height: 30px;
    white-space: pre-line;
`

const CenterContainer = styled.div`
    width: 96%;
    max-width: 1020px;
    margin: 0 auto;
`
const ImageContainer = styled.div`
    margin-top: 3%;
    position: relative;
    padding: 0 20px;
    min-height: 1px;
    float: left;
`
const Image = styled.img`
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 100%;
`

const TextContainer = styled.div`
    float: right;
    width: 70%;
    position: relative;
    padding: 0 20px;
    min-height: 1px;
`


export default HeadSection;
