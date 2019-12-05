import React from 'react';
import styled, { keyframes } from 'styled-components';

const Button = ({ name = "No name", padding = "20px", height = "50px", color = "black", onClick = () => { console.log("no function") } }) => {
    return (
        <Container padding={padding} height={height} onClick={onClick} color={color}>
            {name}
        </Container>
    );
}

//styles
const Container = styled.a`
    text-align: center; 
    font: 15px 'opensans-bold',sans-serif;
    display: block;
    cursor: pointer;
    height: ${props => props.height};
    padding-left: ${props => props.padding};
    padding-right: ${props => props.padding};
    width: auto;
    line-height ${props => props.height};
    color: ${props => props.color};
    
`

export default Button;