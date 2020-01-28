import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';

const BarSection = ({ content, name }) => {
    const [transition, setTransition] = useState(false);
    const [opacity, setopacity] = useState(0);
    const [transformLeft, setTransfromLeft] = useState("-30px");
    const [transformRight, setTransfromRight] = useState("30px");

    const listenScrollEvent = () => {
        if (opacity !== 0) return;
        if (content.CATEGORY) {
            if (document.getElementById(name).getBoundingClientRect().y < 600) {
                setTransition(true);
            }
            if (document.getElementById(name).getBoundingClientRect().y < 800) {
                setopacity(1);
                setTransfromLeft("0px");
                setTransfromRight("0px");
            }
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
                                return createSection(section, index, transition);
                            })
                        }
                    </RightContainer>
                </CenterContainer >
            </CenterBlock >
        </Container >
    );
}

const createSection = (section, index, transition) => {
    return (
        <BarContainer key={index}>
            <Title>{section.TITLE}</Title>
            <Bar><Percentage percentage={section.PERCENTAGE} transition={transition} /></Bar>
        </BarContainer>
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
    padding-bottom: 100px;
`

const Container = styled.div`
    text-align: center;
    background-color: ${colors.WHITE}
`

const Title = styled.h3`
    font: 20px 'Open Sans Bold',sans-serif;
    font-weight:600;
    user-select: none;
    margin-bottom: 10px;lsc 
    text-align: left;
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

const BarContainer = styled.div`
    position: relative;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    min-height: 1px;
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
const Bar = styled.div`
    background-color: ${colors.LIGHT_GRAY}
    height: 40px;
    width: auto;
    border-radius: 5px;
`

const Percentage = styled.div`
    background-color: ${colors.DARK_GRAY}
    height: 100%;
    border-radius: 5px;
    width: ${props => props.transition ? props.percentage : "0%"}
    transition: width 1.5s ease-out;
    -o-transition: width 1.5s ease-out; /* opera */
    -ms-transition: width 1.5s ease-out; /* IE 10 */
    -moz-transition: width 1.5s ease-out; /* Firefox */
    -webkit-transition: width 1.5s ease-out; /*safari and chrome */
`


export default BarSection;
