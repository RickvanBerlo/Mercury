import React from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import LinkButton from '../../components/buttons/linkButton';

const ProjectSection = ({ content, name }) => {
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
                            content.SECTIONS.map((section, index) => {
                                return createSection(section, index);
                            })
                        }
                    </RightContainer>
                </CenterContainer >
            </CenterBlock >
        </Container >
    );
}

const createSection = (section, index) => {
    return (
        <TextContainer key={index}>
            <Title>{section.TITLE}</Title>
            <Info>
                {section.SUBTITLE}
            </Info>
            <Description>{section.DESCRIPTION}</Description>
            <LinkList>
                {
                    section.LINKS.map((link, index) => {
                        return <LinkButton
                            key={"Link" + index}
                            name={link.NAME}
                            textColor={colors.DARK_GRAY}
                            bgColor={colors.DARK_WHITE}
                            href={link.LINK}
                            margin="0px 30px 0px 0px"
                            border={`1px solid ${colors.LIGHT_GRAY}`}
                            flex={1}
                            padding="2px 0px"
                            clickBgColor={colors.DARK_GRAY}
                            clickColor={colors.LIGHT_GRAY}
                        >
                        </LinkButton>
                    })
                }
            </LinkList>
        </TextContainer >
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
    @media (max-width: 767px) {
        padding-top: 30px;
    }
`

const Container = styled.div`
    text-align: center;
    background-color: ${colors.WHITE}
`
const Title = styled.h3`
    font: 26px 'Open Sans Bold',sans-serif;
    font-weight:600;
    user-select: none;
    margin-bottom: 10px;
    @media (max-width: 767px) {
        margin-bottom: 5px;
    }
`
const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'Open Sans',sans-serif;
    line-height: 30px;
    user-select: none;
    white-space: pre-line;
`

const Info = styled.p`
    font: 18px 'Libre Baskerville', serif;
    color: ${colors.SUBTITLE};
    margin-bottom: 18px;
    margin-top: 9px;
    user-select: none;
    @media (max-width: 767px) {
        font: 15px 'Libre Baskerville', serif;
    }
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
    user-select: none;
    text-transform: uppercase;
    letter-spacing: 1px;
`

const TextContainer = styled.div`
    position: relative;
    padding: 0 20px;
    padding-bottom: 30px;
    min-height: 1px;
    @media (max-width: 767px) {
        text-align: left;
        margin-top: 50px;
    }
`

const LeftContainer = styled.div`
    margin-top: 10px;
    padding: 0 20px;
    min-width: 200px;
`
const RightContainer = styled.div`
    width: 60vw;
    @media (max-width: 767px) {
        width: 80vw;
    }
`

const LinkList = styled.div`
    display: flex;
`

export default ProjectSection;
