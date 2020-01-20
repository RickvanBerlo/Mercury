import React from 'react';
import styled from 'styled-components';
import Button from './button';
import colors from '../../constants/colors';
import screenResolution from '../../utils/screenResolution';

const NavButton = ({ name = "No name", onClick, color = colors.WHITE }) => {
    const width = screenResolution().width;
    const height = width < 450 ? "48px" : "48px";
    const padding = width < 450 ? "10px" : "20px";
    return (
        <Container>
            <Button name={name} height={height} padding={padding} color={color} onClick={onClick} />
        </Container>
    );
}

//styles
const Container = styled.div`
    height: auto;
    width: auto;
    display: inline-block;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

`

export default NavButton;