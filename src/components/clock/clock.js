import React, { useState, useEffect, useRef, memo } from "react";
import styled from 'styled-components';
import { mobilecheck } from '../../utils/deviceCheck';
import colors from '../../constants/colors';
import colorChanger from '../../utils/colorChanger';

const Clock = ({ analog }) => {
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
    
    useEffect(()=>{
        if(analog){
            const splitTime = time.split(":");
        
            const secondDegrees = (parseInt(splitTime[2]) * 6) - 180; 
            const minuteDegrees = (parseInt(splitTime[1]) * 6) - 180;
            const hourDegrees = (parseInt(splitTime[0]) * 30) - 180;

            document.getElementById("hour").style.transform = `translateY(2.5px) rotate(${hourDegrees}deg)`;
            document.getElementById("minute").style.transform = `translateY(2.5px) rotate(${minuteDegrees}deg)`;
            document.getElementById("second").style.transform = `translateY(1.5px) rotate(${secondDegrees}deg)`;
        }
    }, [time, analog])

    useEffect(() => {
        if(analog){
            const dialLines = document.getElementsByClassName("daillines");
            for (var i = 0; i < 60; i++) {
                dialLines[i].style.transform = "translate(-0px, -120px) rotate(" + 6 * i + "deg)";
            }
        }
    }, [analog])

    return (
        analog ?
        <AnalogContainer>
                <AnalogPosition>
                    <AnalogClock id={"analogClock"}>
                        <HourMarker id="hour"/>
                        <MinuteMarker id="minute"/>
                        <SecondMarker id="second"/>
                        <CenterDot/>
                        {createDaillines()}
                    </AnalogClock>
                </AnalogPosition>
        </AnalogContainer>
        :
        <Container>{time}</Container>
    )
}

const createDaillines = () => {
    const array = [];
    for (var i = 0; i < 60; i++) {
        array.push(<DialLine key={`dailline_${i}`} className="daillines" />);
    }
    return array;
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

const DialLine = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    height: 10px;
    width: 2px;
    background-color: rgb(255 255 255 / 45%);
    transform-origin: 0px 120px;
    &:nth-of-type(5n){
        height: 15px;
        width: 4px;
    }
`

const HourMarker = styled.div`
    position: absolute;
    height: 60px;
    width: 5px;
    top: 50%;
    left: 50%;
    background-color: #00000030;
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: translateY(2.5px) rotate(0deg);
    -webkit-transform-origin: left center;
    -ms-transform-origin: left center;
    transform-origin: center 0px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.90);
    -moz-box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.90);
    box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.90);
`

const MinuteMarker = styled.div`
    position: absolute;
    height: 100px;
    width: 5px;
    top: 50%;
    left: 50%;
    background-color: #00000030;
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: translateY(2.5px) rotate(0deg);
    -webkit-transform-origin: left center;
    -ms-transform-origin: left center;
    transform-origin: center 0px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.90);
    -moz-box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.90);
    box-shadow: 0px 0px 4px -2px rgba(0,0,0,0.90);
`

const SecondMarker = styled.div`
    position: absolute;
    height: 100px;
    width: 3px;
    top: 50%;
    left: 50%;
    background-color: ${colorChanger(colors.DARK_GREEN, 0.5)};
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: translateY(1.5px) rotate(0deg);
    -webkit-transform-origin: left center;
    -ms-transform-origin: left center;
    transform-origin: center 0px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 4px -1px rgba(0,0,0,0.90);
    -moz-box-shadow: 0px 0px 4px -1px rgba(0,0,0,0.90);
    box-shadow: 0px 0px 4px -1px rgba(0,0,0,0.90);
`

const AnalogContainer = styled.div`
    position: relative;
    user-select: none;
    margin: 0;
    top: 5%;
    width: 100vw;
` 
const CenterDot = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 7px;
    height: 7px;
    /* margin: auto; */
    transform: translate(-3.5px, -3.5px);
    border-radius: 100%;
    background-color: ${colors.WHITE};
    border: 2px solid #eaeaea;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.90);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.90);
    box-shadow: 0px 0px 41px -26px rgba(0,0,0,0.90);

`

const AnalogPosition = styled.div`
    width: 250px;
    height: 250px;
    margin: auto;
     border-radius: 100%;
    background-color: ${colors.TRANSPARENT};
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.90);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.90);
    box-shadow: 0px 0px 41px -26px rgba(0,0,0,0.90);
`

const AnalogClock = styled.div`
    background-color: ${colors.TRANSPARENT};
    width: 240px;
    height: 240px;
    border-radius: 100%;
    border: 5px solid ${colors.TRANSPARENT_20_WHITE};
    -webkit-box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.90);
    -moz-box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.90);
    box-shadow: inset 0px 0px 41px -26px rgba(0,0,0,0.90);

`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoClock = memo(Clock, areEqual)
export default MemoClock;