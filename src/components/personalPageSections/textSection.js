import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../constants/colors';

const TextSection = ({ content, name }) => {
    return (
        <Container id={name}>
            <CenterBlock>
                <CenterContainer>
                    <CategoryContainer>
                        <Category>{content.CATEGORY}</Category>
                    </CategoryContainer>
                    {
                        content.SECTIONS.map(section => {
                            return createSection(section);
                        })
                    }
                </CenterContainer >
            </CenterBlock>
        </Container >
    );
}

const createSection = (section) => {
    return (
        <TextContainer>
            <Title>{section.TITLE}</Title>
            <Info>
                {section.SUBTITLE}
                <DotContainer>•</DotContainer>
                <Date>{section.DATE}</Date>
            </Info>
            <Description>{section.DESCRIPTION}</Description>
        </TextContainer>
    )
}

//styles
const CenterBlock = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    padding-top: 60px;
    padding-bottom: 40px;
    overflow: hidden;
    display: inline-block;  
    text-align: left;
    border-bottom: 1px solid ${colors.LIGHT_GRAY};
`

const Container = styled.div`
    text-align: center;
`
const Title = styled.h3`
    font: 22px/30px 'opensans-bold', sans-serif;
`
const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'opensans-bold', sans-serif;
    line-height: 30px;
    white-space: pre-line;
`

const DotContainer = styled.span`
    margin-right: 5px;
    margin-left: 5px;
`

const Info = styled.p`
    font: 19px 'librebaskerville-italic', serif;
    color: ${colors.SUBTITLE};
    margin-bottom: 18px;
    margin-top: 9px;
`

const Date = styled.em`
    font: 16px 'opensans-regular', sans-serif;
    margin-top: 6px;
`

const CenterContainer = styled.div`
    width: 96%;
    max-width: 1020px;
    margin: 0 auto;
`
const CategoryContainer = styled.div`
    margin-top: 26px;
    position: relative;
    min-height: 1px;
    float: left;
    border-bottom: 3px solid ${colors.LIGHT_BLUE};
`
const Category = styled.h2`
    position: relative;
    font: 18px/24px 'opensans-bold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0px;
`

const TextContainer = styled.div`
    float: right;
    width: 70%;
    position: relative;
    padding: 0 20px;
    min-height: 1px;
`


export default TextSection;
