import React from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';

const LinkButton = ({
    name = "No name",
    textColor = colors.WHITE,
    bgColor = colors.GRAY,
    padding = "0px",
    borderRadius = "0px",
    clickColor = colors.BLACK,
    clickBgColor = colors.WHITE,
    href = "",
    fontSize = "16px",
    margin = "0px",
    border = "0px",
    flex = 0,
    target = "_blank",
    display = "block"
}) => {
    return (
        <Container
            bgColor={bgColor}
            textColor={textColor}
            padding={padding}
            borderRadius={borderRadius}
            clickColor={clickColor}
            clickBgColor={clickBgColor}
            href={href}
            fontSize={fontSize}
            margin={margin}
            border={border}
            flex={flex}
            target={target}
            display={display}
        >
            {name}
        </Container>
    );
}

//styles
const Container = styled.a`
    text-align: center; 
    font: ${props => props.fontSize} 'Open Sans Bold',sans-serif;
    font-weight:600;
    background-color: ${props => props.bgColor};
    padding: ${props => props.padding};
    border-radius: ${props => props.borderRadius};
    border: ${props => props.border};
    color: ${props => props.textColor};
    margin: ${props => props.margin};
    flex: ${props => props.flex};
    target: ${props => props.target};
    display: ${props => props.display}
    cursor: pointer;
    text-decoration: none;
    width: auto;
    transition: background-color 0.3s linear,  color 0.3s linear; /* vendorless fallback */
    -o-transition: background-color 0.3s linear,  color 0.3s linear; /* opera */
    -ms-transition: background-color 0.3s linear,  color 0.3s linear; /* IE 10 */
    -moz-transition: background-color 0.3s linear,  color 0.3s linear; /* Firefox */
    -webkit-transition: background-color 0.3s linear,  color 0.3s linear; /*safari and chrome */
    -webkit-tap-highlight-color: transparent;
    &:hover{
        background-color: ${props => props.clickBgColor};
        color: ${props => props.clickColor};
    }
    &:focus{
        outline: none;
        }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${props => props.bgColor};
            color: ${props => props.textColor};
        }
        &:active{
            background-color: ${props => props.clickBgColor};
            color: ${props => props.clickColor};
        }
    }
    
`

export default LinkButton;