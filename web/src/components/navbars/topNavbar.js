import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavButton from '../buttons/cv/navButton';
import colors from '../../constants/colors';

const TopNavbar = ({ buttons }) => {
    const [visibility, setVisibility] = useState("hidden");
    const [opacity, setOpacity] = useState(1);
    const [activeButton, setActiveButton] = useState(0);

    const listenScrollEvent = (e) => {
        e.preventDefault();
        var activeButton = 0;
        buttons.forEach((button, index) => {
            if (button.PRIVATE_NAME) {
                if (document.getElementById(button.PRIVATE_NAME).getBoundingClientRect().y < 45) {
                    activeButton = index;
                }
            }
        });
        setVisibility(activeButton === 0 ? "hidden" : "visible");
        setOpacity(activeButton === 0 ? 0 : 1);
        setActiveButton(activeButton);
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    })

    return (
        <Container visibility={visibility} opacity={opacity}>
            {
                buttons.map((button, index) => {
                    return (<NavButton key={index} name={button.PUBLIC_NAME} color={activeButton === index ? colors.LIGHT_GREEN : colors.WHITE} onClick={() => { window.scrollTo(0, button.PRIVATE_NAME ? window.scrollY + document.getElementById(button.PRIVATE_NAME).getBoundingClientRect().y : 0); }} />)
                })
            }
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
    background-color: ${colors.NAVBAR};
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