import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import NavButton from '../buttons/navButton';
import strings from '../../constants/strings';
import colors from '../../constants/colors';

const TopNavbar = () => {
    const [visibility, setVisibility] = useState("visible");
    const [opacity, setOpacity] = useState(1);
    const [color, setColor] = useState(colors.TRANSPARENT);
    const [colorbutton1, setColorButton1] = useState(colors.BLUE);
    const [colorbutton2, setColorButton2] = useState(colors.WHITE);
    const [colorbutton3, setColorButton3] = useState(colors.WHITE);
    const [colorbutton4, setColorButton4] = useState(colors.WHITE);

    const listenScrollEvent = () => {
        if (document.getElementById('projectSection').getBoundingClientRect().y < 0) {
            if (colorbutton4 != colors.BLUE) {
                setColorButton4(colors.BLUE);
                setColorButton3(colors.WHITE)
            }
        } else if (document.getElementById('infoSection').getBoundingClientRect().y < 0) {
            if (colorbutton3 != colors.BLUE) {
                setColorButton4(colors.WHITE)
                setColorButton3(colors.BLUE);
                setColorButton2(colors.WHITE)
            }
        } else if (document.getElementById('headSection').getBoundingClientRect().y < 0) {
            if (colorbutton2 != colors.BLUE) {
                setVisibility("visible");
                setOpacity(1);
                setColor(colors.NAVBAR);
                setColorButton3(colors.WHITE)
                setColorButton2(colors.BLUE)
                setColorButton1(colors.WHITE);
            }
        } else if (window.scrollY > 265) {
            if (visibility != "hidden") {
                setVisibility("hidden");
                setOpacity(0);
            }
        } else if (window.scrollY > 230) {
            setColorButton1(colors.BLUE);
            setColorButton2(colors.WHITE)
        } else {
            setVisibility("visible");
            setOpacity(1);
            setColor(colors.TRANSPARENT);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    })
    return (
        <Container visibility={visibility} opacity={opacity} color={color}>
            <NavButton name={strings.NAVIGATION.BUTTON1} color={colorbutton1} onClick={() => { window.scrollTo(0, 0); }} />
            <NavButton name={strings.NAVIGATION.BUTTON2} color={colorbutton2} onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('headSection').getBoundingClientRect().y + 4); }} />
            <NavButton name={strings.NAVIGATION.BUTTON3} color={colorbutton3} onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('infoSection').getBoundingClientRect().y + 4); }} />
            <NavButton name={strings.NAVIGATION.BUTTON4} color={colorbutton4} onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('projectSection').getBoundingClientRect().y + 4); }} />
        </Container>
    );
}

//styles
const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: auto;
    width: 100%;
    text-align: center;
    background-color: ${props => props.color};
    z-index: 100;
    visibility: ${props => props.visibility};
    opacity: ${props => props.opacity};
    transition: visibility 0.1s, opacity 0.1s linear;
    -o-transition: visibility 0.1s opacity 0.1s linear; /* opera */
    -ms-transition: visibility 0.1s opacity 0.1s linear; /* IE 10 */
    -moz-transition: visibility 0.1s opacity 0.1s linear; /* Firefox */
    -webkit-transition: visibility 0.1s opacity 0.1s linear; /*safari and chrome */
`

export default TopNavbar;