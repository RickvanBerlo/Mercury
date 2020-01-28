import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavButton from '../buttons/navButton';
import strings from '../../constants/strings';
import colors from '../../constants/colors';

const TopNavbar = () => {
    const [visibility, setVisibility] = useState("hidden");
    const [opacity, setOpacity] = useState(1);
    const [color, setColor] = useState(colors.TRANSPARENT);
    const [colorbutton1, setColorButton1] = useState(colors.WHITE);
    const [colorbutton2, setColorButton2] = useState(colors.WHITE);
    const [colorbutton3, setColorButton3] = useState(colors.WHITE);
    const [colorbutton4, setColorButton4] = useState(colors.WHITE);

    const listenScrollEvent = () => {
        if (document.getElementById('contactSection').getBoundingClientRect().y < 48) {
            if (colorbutton4 !== colors.BLUE) {
                setVisibility("visible");
                setColorButton4(colors.LIGHT_GREEN);
                setColorButton3(colors.WHITE);
                setColorButton2(colors.WHITE);
                setColorButton1(colors.WHITE);
                setColor(colors.NAVBAR);
            }
        } else if (document.getElementById('workSection').getBoundingClientRect().y < 0) {
            if (colorbutton3 !== colors.BLUE) {
                setVisibility("visible");
                setColorButton4(colors.WHITE);
                setColorButton3(colors.LIGHT_GREEN);
                setColorButton2(colors.WHITE);
                setColorButton1(colors.WHITE);
                setColor(colors.NAVBAR);
            }
        } else if (document.getElementById('headSection').getBoundingClientRect().y < 45) {
            if (colorbutton2 !== colors.BLUE) {
                setVisibility("visible");
                setOpacity(1);
                setColor(colors.NAVBAR);
                setColorButton4(colors.WHITE);
                setColorButton3(colors.WHITE);
                setColorButton2(colors.LIGHT_GREEN);
                setColorButton1(colors.WHITE);
            }
        } else {
            setVisibility("hidden");
            setOpacity(0);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    })

    return (
        <Container visibility={visibility} opacity={opacity} color={color}>
            <NavButton name={strings.NAVIGATION.BUTTON1} color={colorbutton1} onClick={() => { window.scrollTo(0, 0); }} />
            <NavButton name={strings.NAVIGATION.BUTTON2} color={colorbutton2} onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('headSection').getBoundingClientRect().y + 4); }} />
            <NavButton name={strings.NAVIGATION.BUTTON3} color={colorbutton3} onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('workSection').getBoundingClientRect().y + 4); }} />
            <NavButton name={strings.NAVIGATION.BUTTON4} color={colorbutton4} onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('contactSection').getBoundingClientRect().y - 40); }} />
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