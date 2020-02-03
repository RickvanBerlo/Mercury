import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import LinkButton from '../../components/buttons/linkButton';

const ProjectSection = ({ content, name }) => {
    const [opacity, setopacity] = useState(0);
    const [transformLeft, setTransfromLeft] = useState("-30px");
    const [transformRight, setTransfromRight] = useState("30px");

    const listenScrollEvent = () => {
        if (opacity !== 0) return;
        if (document.getElementById(name).getBoundingClientRect().y < 800) {
            setopacity(1);
            setTransfromLeft("0px");
            setTransfromRight("0px");
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    })

    if (!content.CATEGORY) return null;
    return (
        <Container id={name}>
            <CenterBlock>
                <CenterContainer>
                    <LeftContainer opacity={opacity} transform={transformLeft}>
                        <CategoryContainer>
                            <Category>{content.CATEGORY}</Category>
                        </CategoryContainer>
                    </LeftContainer>
                    <RightContainer opacity={opacity} transform={transformRight}>
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
                            clickColor={colors.DARK_WHITE}
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
    border-bottom: 3px solid ${colors.LIGHT_GREEN};
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
    opacity: ${props => props.opacity};
    transform: translate(${props => props.transform}, 0px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    -o-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* opera */
    -ms-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* IE 10 */
    -moz-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* Firefox */
    -webkit-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /*safari and chrome */
`
const RightContainer = styled.div`
    width: 60vw;
    opacity: ${props => props.opacity};
    transform: translate(${props => props.transform}, 0px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    -o-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* opera */
    -ms-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* IE 10 */
    -moz-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /* Firefox */
    -webkit-transition: opacity 0.5s ease-out, transform 0.5s ease-out; /*safari and chrome */
    @media (max-width: 767px) {
        width: 80vw;
    }
`

const LinkList = styled.div`
    display: flex;
`

export default ProjectSection;
