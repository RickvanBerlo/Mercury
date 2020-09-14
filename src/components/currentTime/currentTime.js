import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";

const CurrentTime = ({ colors }) => {
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
        <Container colors={colors} id={"currentTime"} ><ArrowLeft colors={colors}/></Container>
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

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors,
    };
};

const Container = styled.div`
    position: relative;
    display: flow-root;
    pointer-events: none
    width: calc(100% - 20px);
    height: 2px;
    opacity: 0;
    background-color: ${props => props.colors.MAIN};
    z-index: 0;
    transition: opacity 0.2s linear, top 0.1s linear;
`

const ArrowLeft = styled.div`
    width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 15px solid ${props => props.colors.MAIN};
    float: right;
    transform: translateY(-9px);
`

export default connect(mapStateToProps, undefined)(CurrentTime);