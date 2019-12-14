import React from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';

const Button = ({ name = "No name", padding = "20px", height = "50px", color = colors.DARK_GRAY, onClick = () => { console.log("no function") } }) => {
    return (
        <Container padding={padding} height={height} onClick={onClick} color={color}>
            {name}
        </Container>
    );
}

//styles
const Container = styled.a`
    text-align: center; 
    font: 14px 'Open Sans Bold',sans-serif;
    font-weight:600;
    display: block;
    cursor: pointer;
    height: ${props => props.height};
    padding-left: ${props => props.padding};
    padding-right: ${props => props.padding};
    width: auto;
    line-height ${props => props.height};
    color: ${props => props.color};
    transition: color 0.2s linear; /* vendorless fallback */
    -o-transition: color 0.2s linear; /* opera */
    -ms-transition: color 0.2s linear; /* IE 10 */
    -moz-transition: color 0.2s linear; /* Firefox */
    -webkit-transition: color 0.2s linear; /*safari and chrome */
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
    @media (max-width: 767px) {
        font: 12px 'Open Sans Bold',sans-serif;
        font-weight: 600;
        line-height ${props => props.height};
    }
    
`

export default Button;