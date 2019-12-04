import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './button';

const NavButton = ({ name = "No name" }) => {
    return (
        <Container>
            <Button name={name} height={"48px"} padding={"20px"} />
        </Container>
    );
}

//styles
const Container = styled.div`
    height: auto;
    width: auto;
    display: inline-block;
    cursor: pointer;
`

export default NavButton;