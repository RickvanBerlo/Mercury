import React from 'react';
import styled, { keyframes } from 'styled-components';
import NavButton from '../buttons/navButton';

const TopNavbar = () => {
    return (
        <Container>
            <NavButton name="HOME" />
            <NavButton name="OVER MIJ" />
            <NavButton name="CURRICULUM VITAE" />
            <NavButton name="PORTFOLIO" />
            <NavButton name="CONTACT" />
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
`

export default TopNavbar;