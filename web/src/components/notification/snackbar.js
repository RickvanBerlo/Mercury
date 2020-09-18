import React, { useEffect, memo, useState, useRef } from 'react';
import { connect } from "react-redux";
import { removeMessage } from '../../stores/snackbar/snackbarActions';
import styled, { keyframes, css } from 'styled-components';


const Snackbar = ({ removeMessage, messages, timeInSeconds, colors }) => {
    const [showSnackbar, setShowSnackbar] = useState(null);
    const timeout = useRef(null);

    useEffect(() => {
        const setTextToEmpty = (event) => {
            if (event.elapsedTime === 0.5) removeMessage();
        }
        const snackbar = document.getElementById("snackbar");
        snackbar.addEventListener("animationend", setTextToEmpty, false);
        return () => {
            snackbar.removeEventListener("animationend", setTextToEmpty, false);
        }
    }, [messages, removeMessage])

    useEffect(() => {
        if (messages.length === 0) setShowSnackbar(null);
        else {
            setShowSnackbar(true);
            timeout.current = (setTimeout(() => { setShowSnackbar(false) }, timeInSeconds * 1000));
        }
    }, [messages, timeInSeconds])
    return (
        <SnackBarContainer colors={colors} id="snackbar" enable={showSnackbar} onTouchStart={() => { disableTimer(timeout, setShowSnackbar) }} onClick={() => { disableTimer(timeout, setShowSnackbar) }}>
            <Text color={colors.TEXT}>{messages[messages.length - 1]}</Text>
        </SnackBarContainer>
    )
}

const disableTimer = (timeout, setShowSnackbar) => {
    timeout.current = clearTimeout(timeout.current);
    setShowSnackbar(false);
}

const mapStateToProps = state => {
    return { 
        messages: state.snackbarReducer.messages, 
        timeInSeconds: state.snackbarReducer.timeInSeconds,
        colors: state.preferencesReducer.colors,    
    };
};

const mapDispatchToProps = {
    removeMessage,
}

const Show = keyframes`
    from{
        top: -200px;
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
        top -200px;
    }
`

const Text = styled.p`
    line-height: 40px;
    font: 20px 'Open Sans Bold',sans-serif;
    padding: 0px 10px;
    user-select: none;
    color: ${props => props.color} 
`

const SnackBarContainer = styled.div`
    position: absolute;
    right: 4%;
    top: -200px;
    display: inline-flex;
    max-width: 90%;
    border-radius: 10px;
    background-color: ${props => props.colors.PRIMARY};
    border: 5px solid ${props => props.colors.SECONDARY};
    z-index: 8;
    cursor: pointer;
    box-shadow: 3px 4px 10px 0px;
    animation: ${props => props.enable == null ? `none` : props.enable ? css`${Show} 0.4s ease-out forwards` : css`${Hide} 0.5s ease-in forwards`};
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoSnackbar = memo(connect(mapStateToProps, mapDispatchToProps)(Snackbar), areEqual)
export default MemoSnackbar;
