import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import { lerp, invlerp } from '../utils/lerp';
import { mobilecheck } from '../utils/deviceCheck';

import background from '../assets/background.jpg';

const LogIn = ({ history }) => {
    const [degree, setDegree] = useState(0);
    const [formWidth, setFormWidth] = useState(0);

    const CalculateDegree = () => {
        const percent = invlerp(700, 1250, window.innerWidth);
        const limit = percent > 1 ? 1 : percent < 0 ? 0 : percent;
        setDegree(lerp(0, 30, limit));
        setFormWidth(lerp(35, 60, 1 - limit));
    }

    useEffect(() => {
        CalculateDegree();
    })

    window.addEventListener("resize", CalculateDegree);
    return (
        <Container background={background} >
            <BackgroundImage background={background} />
            <HideOverflow>
                <ContainerRight degree={degree} />
                <ContainerLeft degree={degree}>
                    <OffsetTransform degree={degree}>
                        <CenterGroup width={formWidth} top={mobilecheck() ? 20 : 35}>
                            <Title>login</Title>
                            <form onSubmit={onSubmit}>
                                <TextInput
                                    type="text"
                                    maxLength={50}
                                    value={"email"}
                                    autofocus={true}
                                    required
                                />
                                <TextInput
                                    type="password"
                                    maxLength={50}
                                    value={"email"}
                                    autofocus={true}
                                    required
                                />
                                <SubmitButton
                                    type="submit"
                                    value="Verzenden">
                                </SubmitButton>
                            </form >
                        </CenterGroup>
                    </OffsetTransform>
                </ContainerLeft>
            </HideOverflow>
        </Container >
    )
}

const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
}

//Form
const TextInput = styled.input`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    outline: none;
    margin-bottom: 20px;
`

const SubmitButton = styled.input`
    background-color: ${colors.WHITE};
    min-height: 40px;
    border-radius: 10px;
    padding: 5px 20px;
    color: ${colors.BLACK}
    outline: none;
    font: 18px 'Open Sans Bold',sans-serif;
`
//Form

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${colors.HEADER_BACKGROUND_COLOR};
 
`

const HideOverflow = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`

const CenterGroup = styled.div`
    position: absolute;
    margin: 0;
    top: ${props => props.top}%;
    left: 7%;
    width: ${props => props.width}%;
`

const Title = styled.h2`
    font: 40px 'Open Sans',sans-serif;
    margin-top: 0px;
    font-weight:400;
`

const OffsetTransform = styled.div`
    width 100%;
    height: 100%;
    margin-top: 30%;
    transform: skew(-${props => props.degree}deg);
    margin: 0 0 0 ${props => 20 + props.degree}vw;
`

const BackgroundImage = styled.div`
    position: absolute;
    width 100vw;
    height: 100vh;
    background: url(${props => props.background}) bottom;
    background-size: 100vw;
    background-repeat: no-repeat;
    z-index: 0;
`

const ContainerRight = styled.div`
    position: absolute;
    width 100vw;
    height: 100vh;
    z-index: 2;
    margin: 0 0 0 ${props => 80 - props.degree}vw;
    transform: skew(${props => props.degree}deg);
    -webkit-border-image: -webkit-gradient(linear, 0 0, 100% 0, from(${colors.BLACK}), to(${colors.TRANSPARENT})) 0 100%;
    border-style: solid;
    border-left-width: 20px;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-right-width: 0px;
`

const ContainerLeft = styled.div`
    position: absolute;
    width 100vw;
    height: 100vh;
    background-color: white;
    z-index: 1;
    margin: 0 0 0 -${props => 20 + props.degree}vw;
    transform: skew(${props => props.degree}deg);
    border-width: 0px;
`

export default LogIn;