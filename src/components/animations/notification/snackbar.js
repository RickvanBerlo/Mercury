import React, { useEffect, memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import colors from '../../../constants/colors';


const Snackbar = ({ text, setText, timeInSeconds = 1 }) => {
    useEffect(() => {
        document.getElementById("snackbar").addEventListener("animationend", (event) => { if (event.elapsedTime === 0.5) setText("") });
    })

    return (
        <SnackBarContainer id="snackbar" seconds={timeInSeconds} enable={text ? true : false}>
            <Text>{text}</Text>
        </SnackBarContainer>
    )
}

const Show = keyframes`
    from{
        top: -15%;
    }
    to {
        top 4%;
    }
`
const Hide = keyframes`
    from{
        top: 4%;
    }
    to {
        top -15%;
    }
`

const Text = styled.p`
    line-height: 40px;
    font: 20px 'Open Sans Bold',sans-serif;
    padding: 0px 10px;
`

const SnackBarContainer = styled.div`
    position: absolute;
    right: 4%;
    top: -15%;
    display: inline-flex;
    max-width: 90%;
    border-radius: 10px;
    background-color: ${colors.WHITE};
    border: 5px solid ${colors.LIGHT_GRAY}
    z-index: 10;
    box-shadow: 3px 4px 10px 0px;
    animation-name: hallo;
    animation: ${props => props.enable ? css`${Show} 0.4s ease-out forwards, ${Hide} 0.5s ease-in ${props => props.seconds}s forwards` : "none"};
`

const AreEqual = (prevProps, nextProps) => {
    if (prevProps.text === nextProps.text) return true;
    return false;
}

const MemoSnackbar = memo(Snackbar, AreEqual);
export default MemoSnackbar;
