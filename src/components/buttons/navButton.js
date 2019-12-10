import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './button';
import colors from '../../constants/colors';

const NavButton = ({ name = "No name", onClick, color = colors.WHITE }) => {
    return (
        <Container>
            <Button name={name} height={"48px"} padding={"20px"} color={color} onClick={onClick} />
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