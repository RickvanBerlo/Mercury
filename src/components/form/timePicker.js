import React, { memo, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import Model from '../model/model';
import ItemSelector from '../itemSelector/itemSelector';
import generateUUID from '../../utils/GenerateUUID';

const TimePickerWrapper = ({ name, getValues, refresh, classname, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "00:00" : props.value);
    const [toggle, setToggle] = useState(null);
    const UUID = useRef(generateUUID());

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props])

    useEffect(() => {
        if (refresh)
            setValue("00:00");
    }, [refresh]);

    useEffect(() => {
        const changeToggle = () => {
            setToggle(!toggle);
        }

        const callback = (value) => {
            switch (value) {
                case "toggleVisibility":
                    setValue("00:00");
                    //this causes a problem. needs further investigation
                    setToggle(null);
                    break;
                default: console.error("no case was found for " + value + " in the Callback function in TimePicker!");
            }
        }
        document.getElementById(UUID.current).callback = callback;
        const timePicker = document.getElementById(name);
        timePicker.addEventListener("click", changeToggle, false);
        return () => {
            timePicker.removeEventListener("click", changeToggle, false);
        }
    }, [props, name, toggle])

    const modelOnsubmit = (newValue) => {
        setValue(newValue);
        setToggle(!toggle);
    }

    const createContent = () => {
        return (
            <div>
                <ItemSelector items={createItems()} defaultItem={value} callback={modelOnsubmit} toggle={toggle} marginBottom={"20px"} />
            </div>
        )
    }

    return (
        <Container id={UUID.current} className={classname}>
            {props.label !== undefined ? <Label>{props.label}</Label> : null}
            <HiddenInput
                {...props}
                type="time"
                name={name}
                value={value}
                onChange={(event) => { setValue(event.target.value) }}
            >
            </HiddenInput >
            <StyledTimePicker id={name} className="input" title={`Selecteer een tijd.`}>
                <Time>{value}</Time>
            </StyledTimePicker>
            <Model
                toggle={toggle}
                setToggle={setToggle}
                title="Selecteer een tijd"
                content={createContent()}
            />
        </Container >
    )
}

const createItems = () => {
    let array = [];
    for (let i = 0; i < (24 * 4); i++) {
        const hours = (i / 4) < 10 ? "0" + Math.floor(i / 4) : Math.floor(i / 4);
        let minutes = (((i / 4) - Math.floor(i / 4)) * 4) * 15;
        if (minutes === 0) minutes = "00"
        array.push(hours + ":" + minutes)
    }
    return array;
}

const Container = styled.div`
    margin-bottom: 20px;
`

const Label = styled.div`
    color: ${colors.DARK_GREEN};
    margin-left: 10px;
    margin-bottom:2px;
`

const HiddenInput = styled.input.attrs({ type: 'time' })`
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
    width: calc(100% - 16px);
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
    if (nextProps.refresh) return false;
    return true;
}

const MemoTimePickerWrapper = memo(TimePickerWrapper, areEqual)
export default MemoTimePickerWrapper;