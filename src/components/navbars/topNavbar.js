import React from 'react';
import styled, { keyframes } from 'styled-components';
import NavButton from '../buttons/navButton';
import strings from '../../constants/strings';

const TopNavbar = () => {
    return (
        <Container>
            <NavButton name={strings.NAVIGATION.BUTTON1} />
            <NavButton name={strings.NAVIGATION.BUTTON2} />
            <NavButton name={strings.NAVIGATION.BUTTON3} />
            <NavButton name={strings.NAVIGATION.BUTTON4} />
            <NavButton name={strings.NAVIGATION.BUTTON5} />
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
    background-color: transparent;
    z-index: 100;
`

export default TopNavbar;