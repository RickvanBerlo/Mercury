import React, { memo, useState, useEffect } from "react";
import styled, { keyframes, css } from 'styled-components';
import colors from '../../constants/colors';
import GenerateUUID from '../../utils/GenerateUUID';

const TimePickerWrapper = ({ index, label, name, validation = () => { return true }, getValues, dependencyValues, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "00:00" : props.value);
    const [toggle, setToggle] = useState(null);
    const show = dependencyValues.every(checkIstruthy);

    getValues(index, name, value, validation(value))

    const changeToggle = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        if (!show) setValue("00:00");
    }, [show])

    useEffect(() => {
        if (toggle) {
            const Selector = document.getElementById(name + "Selector");
            Selector.scrollTop = (((parseInt(value.substring(0, 2)) * 4) + (parseInt(value.substring(3, 5)) / 15)) - 2.5) * 50;
        }
    }, [toggle])

    useEffect(() => {
        const timePicker = document.getElementById(name);
        timePicker.addEventListener("click", changeToggle, false);
        return () => {
            timePicker.removeEventListener("click", changeToggle, false);
        }
    }, [])

    return (
        <Container show={show}>
            {label !== undefined ? <Label>{label}</Label> : null}
            <HiddenCheckbox
                {...props}
                type="time"
                name={name}
                value={value}
                disabled={!show}
                onChange={(event) => { getValues(index, name, event.target.value, validation(event.target.value)); setValue(event.target.value) }}
            >
            </HiddenCheckbox >
            <StyledTimePicker id={name} >
                <Time>{value}</Time>
            </StyledTimePicker>
            <ContainerPopup enable={toggle}>
                <Popup enable={toggle}>
                    <TopBar><Title>Select a time</Title></TopBar>
                    <SelectorContainer id={name + "Selector"}>
                        {createGrid(value, setValue)}
                    </SelectorContainer>
                    <BottomBar><Button onClick={changeToggle} onTouchEnd={changeToggle}><ButtonText>Accepteren</ButtonText></Button></BottomBar>
                </Popup>
            </ContainerPopup>
        </Container>
    )
}

const checkIstruthy = (value) => {
    if (value) return true;
    return false;
}

const createGrid = (value, callback) => {
    let array = [];

    for (let i = 0; i < (24 * 4); i++) {
        const hours = (i / 4) < 10 ? "0" + Math.floor(i / 4) : Math.floor(i / 4);
        let minutes = (((i / 4) - Math.floor(i / 4)) * 4) * 15;
        if (minutes === 0) minutes = "00"
        array.push(
            <Item key={GenerateUUID()} onClick={() => { callback(hours + ":" + minutes) }} onTouchEnd={() => { callback(hours + ":" + minutes) }}>
                <Name toggle={value === hours + ":" + minutes}>{hours + ":" + minutes}</Name>
            </Item>
        )
    }

    return array;
}

const Show = keyframes`
    from{
        top: -450px;
    }
    to {
        top 10%;
    }
`
const Hide = keyframes`
    from{
        top: 10%;
    }
    to {
        top -450px;
    }
`

const ContainerPopup = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    visibility: ${props => props.enable ? "visible" : "hidden"}
    transition: visibility 0.1s ${props => props.enable ? "0s" : "0.5s"} linear;
`


const Container = styled.div`
    margin-bottom: 20px;
    display: ${props => props.show ? "block" : "none"}
`

const TopBar = styled.div`
    width: 100%;
    height: 50px;
`

const Item = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 50px;  
    transition: background-color 0.3s linear;
    &:hover{
        cursor: pointer;
    }
`

const Name = styled.p`
    margin: 0;
    color: ${colors.DARK_GREEN}
    line-height: 60px;
    font-size: ${props => props.toggle ? "30px" : "20px"}
    text-decoration: ${props => props.toggle ? "underline" : "none"};
    transition: font-size 0.3s linear;
    user-select: none;
    text-align: center;
    &:hover{
        font-size: 30px;
    }
`

const SelectorContainer = styled.div`
    margin-left: 5%;
    width: 90%;
    height: calc(100% - 100px);
    box-shadow: inset 0px 0px 10px 0px ${colors.BLACK};
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }

`
const BottomBar = styled.div`
    width: 100%;
    height: 50px;
`

const ButtonText = styled.p`
    margin: 0;
    line-height: 50px;
    text-align: center;
    color: ${colors.DARK_GREEN};
    font-size: 20px;
    user-select: none;
`

const Button = styled.div`
    width: 100%;
    height: 50px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: inset 0px 0px 15px 15px ${colors.WHITE};
    background-color: ${colors.WHITE};
    &:hover{
        background-color: ${colors.DARK_WHITE}
        cursor: pointer;
    }
    &:active{
        background-color: ${colors.ACTIVE_COLOR};
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colors.WHITE};
        }
        &:active{
            background-color: ${colors.DARK_WHITE};
        }
    }
`

const Title = styled.p`
    font-size: 25px;
    margin: 0;
    text-align: center;
    line-height: 50px;
    color: ${colors.DARK_GREEN};
    user-select: none;
`

const Popup = styled.div`
    position: absolute;
    width: 250px;
    height: 400px;
    top: -450px;
    z-index: 4;
    border-radius: 10px;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
    animation: ${props => props.enable == null ? `none` : props.enable ? css`${Show} 0.6s ease-out forwards` : css`${Hide} 0.5s ease-in forwards`};

`

const Label = styled.div`
    color: ${colors.DARK_GREEN};
    margin-left: 10px;
    margin-bottom:2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'time' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledTimePicker = styled.div`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    outline: none;
    &:hover{
        cursor: pointer;
    }
`

const Time = styled.p`
    font: 18px 'Open Sans Bold',sans-serif;
    margin: 0;
    padding: 2px;
`

const areEqual = (prevProps, nextProps) => {
    let areEqual = true;
    nextProps.dependencyValues.forEach((element, index) => {
        if (element != prevProps.dependencyValues[index]) {
            areEqual = false;
            return;
        }
    });
    return areEqual;
}

const MemoTimePickerWrapper = memo(TimePickerWrapper, areEqual)
export default MemoTimePickerWrapper;