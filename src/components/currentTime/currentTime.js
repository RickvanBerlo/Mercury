import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

const CurrentTime = () => {
    const [time, setTime] = useState(getTime());
    let timeout = useRef(null);

    useEffect(() => {
        const updateTime = () => {
            setTime(getTime())
            timeout.current = setTimeout(updateTime, 500);
        }
        updateTime();
        return () => {
            clearTimeout(timeout.current);
        }
    }, [timeout, setTime]);

    useEffect(() => {
        const container = document.getElementById("currentTime");
        const today = new Date();
        container.style.opacity = 1;
        container.style.top = `${(today.getHours() * 180) + (today.getMinutes() * (180 / 60))}px`;
    }, [time])

    return (
        <Container id={"currentTime"} ><ArrowLeft /></Container>
    )
}

const getTime = () => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return h + ":" + m + ":" + s;
}

const Container = styled.div`
    position: relative;
    display: flow-root;
    width: calc(100% - 20px);
    height: 2px;
    opacity: 0;
    background-color: ${colors.DARK_GREEN};
    z-index: 2;
    transition: opacity 0.2s linear, top 0.1s linear;
`

const ArrowLeft = styled.div`
    width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid ${colors.DARK_GREEN};
    float: right;
    transform: translateY(-9px);
`

export default CurrentTime