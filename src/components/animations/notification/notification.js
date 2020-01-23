import React from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../../constants/colors';

const notification = ({ text = undefined, color = colors.WHITE, textSize = "18px", paddingLeft = "0px", enable, setEnable, timeInMiliseconds = 0 }) => {
    if (enable === undefined) return null;
    if (timeInMiliseconds > 0) setTimeout(() => { setEnable(false) }, timeInMiliseconds);
    console.log(enable);
    return (
        <Text textSize={textSize} color={color} paddingLeft={paddingLeft} enable={enable}>{text}</Text>
    );
}

const show = keyframes`
  to {
    opacity: 1;
  }
`
const hide = keyframes`
  to {
    opacity: 0;
  }
`

const Text = styled.p`
    font: ${props => props.textSize} 'Open Sans Bold',sans-serif;
    color:${props => props.color};
    display: table-cell; 
    vertical-align: middle;
    opacity: ${props => props.enable ? 0 : 1};
    padding-left: ${props => props.paddingLeft};
    animation: ${props => props.enable ? show : hide} 0.2s ease-in-out ${props => props.enable ? "0.6s" : "1.0s"} forwards;

`

export default notification;