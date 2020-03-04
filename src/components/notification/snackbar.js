import React, { useEffect, memo, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import colors from '../../constants/colors';


const Snackbar = ({ text, setText, timeInSeconds = 1 }) => {
    const [showSnackbar, setShowSnackbar] = useState(null);
    const timeout = useRef(null);

    useEffect(() => {
        const setTextToEmpty = (event) => {
            if (event.elapsedTime === 0.5) setText("");
        }
        const snackbar = document.getElementById("snackbar");
        snackbar.addEventListener("animationend", setTextToEmpty, false);
        return () => {
            snackbar.removeEventListener("animationend", setTextToEmpty, false);
        }
    }, [setText])

    useEffect(() => {
        if (text === "") setShowSnackbar(null);
        else {
            setShowSnackbar(true);
            timeout.current = (setTimeout(() => { setShowSnackbar(false) }, timeInSeconds * 1000));
        }
    }, [text, timeInSeconds])
    return (
        <SnackBarContainer id="snackbar" enable={showSnackbar} onTouchStart={() => { disableTimer(timeout, setShowSnackbar) }} onClick={() => { disableTimer(timeout, setShowSnackbar) }}>
            <Text>{text}</Text>
        </SnackBarContainer>
    )
}

const disableTimer = (timeout, setShowSnackbar) => {
    timeout.current = clearTimeout(timeout.current);
    setShowSnackbar(false);
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
    user-select: none; 
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
    z-index: 8;
    box-shadow: 3px 4px 10px 0px;
    animation: ${props => props.enable == null ? `none` : props.enable ? css`${Show} 0.4s ease-out forwards` : css`${Hide} 0.5s ease-in forwards`};
`

const areEqual = (prevProps, nextProps) => {
    if (prevProps.text === nextProps.text) return true;
    return false;
}

const MemoSnackbar = memo(Snackbar, areEqual);
export default MemoSnackbar;
