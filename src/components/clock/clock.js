import React, { useState, useEffect, useRef, memo } from "react";
import styled from 'styled-components';
import { mobilecheck } from '../../utils/deviceCheck';
import colors from '../../constants/colors';

const Clock = () => {
    let timeout = useRef(null);
    const [time, setTime] = useState(getTime());

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

    return (
        <Container>{time}</Container>
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

const Container = styled.p`
    position: absolute;
    user-select: none;
    margin: 0;
    font-size: ${mobilecheck() ? "80px" : "100px"};
    color: ${colors.WHITE}
    top: 25%;
    text-align: center;
    width: 100vw;
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoClock = memo(Clock, areEqual)
export default MemoClock;