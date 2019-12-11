import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../constants/colors';

const TextSection = ({ content, name }) => {
    return (
        <Container id={name}>
            <CenterBlock>
                <CenterContainer>
                    <LeftContainer>
                        <CategoryContainer>
                            <Category>{content.CATEGORY}</Category>
                        </CategoryContainer>
                    </LeftContainer>
                    <RightContainer>
                        {
                            content.SECTIONS.map(section => {
                                return createSection(section);
                            })
                        }
                    </RightContainer>
                </CenterContainer >
            </CenterBlock >
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
    display: inline-block;  
    text-align: left;
    border-bottom: 1px solid ${colors.LIGHT_GRAY};
`

const Container = styled.div`
    text-align: center;
    background-color: ${colors.WHITE}
`
const Title = styled.h3`
    font: 22px 'Open Sans Bold',sans-serif;
    font-weight:600;
`
const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'Open Sans',sans-serif;
    line-height: 30px;
    white-space: pre-line;
`

const DotContainer = styled.span`
    margin-right: 5px;
    margin-left: 5px;
`

const Info = styled.p`
    font: 18px 'Libre Baskerville', serif;
    color: ${colors.SUBTITLE};
    margin-bottom: 18px;
    margin-top: 9px;
`

const Date = styled.em`
    font: 16px 'Open Sans',sans-serif;
    margin-top: 6px;
`

const CenterContainer = styled.div`
    width: 96%;
    max-width: 1020px;
    margin: 0 auto;

    display: flex;
`
const CategoryContainer = styled.div`
    width: auto;
    position: sticky;
    position: -webkit-sticky;
    display: inline-block;
    top: 70px; /* required */
`
const Category = styled.h2`
    font: 18px 'Open Sans Bold',sans-serif;
    border-bottom: 3px solid ${colors.LIGHT_BLUE};
    font-weight:600;
    text-transform: uppercase;
    letter-spacing: 1px;
`

const TextContainer = styled.div`
    position: relative;
    padding: 0 20px;
    min-height: 1px;
`

const LeftContainer = styled.div`
    margin-top: 10px;
    padding: 0 20px;
    min-width: 200px;
`
const RightContainer = styled.div`
`

export default TextSection;
