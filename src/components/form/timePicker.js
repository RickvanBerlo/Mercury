import React, { memo, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import Model from '../model/model';
import ItemSelector from '../itemSelector/itemSelector';
import generateUUID from '../../utils/GenerateUUID';
import { connect } from "react-redux";
import { addModel, setModelActive, setModelInactive } from '../../stores/models/modelActions';

const TimePickerWrapper = ({ name, getValues, refresh, classname, addModel, setModelActive, setModelInactive, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "00:00" : props.value);
    const storedValue = useRef(value);
    const UUID = useRef(generateUUID());
    const timePickerModelId = useRef(generateUUID());

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props])

    useEffect(() => {
        if (refresh)
            setValue("00:00");
    }, [refresh]);

    useEffect(() => {
        const setActive = () => {
            setModelActive(timePickerModelId.current);
        }

        const callback = (value) => {
            switch (value) {
                case "toggleVisibility":
                    setValue("00:00");
                    break;
                default: console.error("no case was found for " + value + " in the Callback function in TimePicker!");
            }
        }
        document.getElementById(UUID.current).callback = callback;
        const timePicker = document.getElementById(name);
        timePicker.addEventListener("click", setActive, false);
        return () => {
            timePicker.removeEventListener("click", setActive, false);
        }
    }, [props, name, setModelActive])

    useEffect(() => {
        storedValue.current = value;
    }, [value])

    useEffect(() => {
        const modelOnsubmit = (newValue) => {
            setValue(newValue);
            setModelInactive(timePickerModelId.current);
        }

        addModel(
            timePickerModelId.current,
            <Model
                key={timePickerModelId.current}
                id={timePickerModelId.current}
                title="Selecteer een kleur"
                content={createContent(modelOnsubmit, storedValue.current)}
            />
        )
    }, [addModel, setModelInactive])
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
        </Container >
    )
}

const mapDispatchToProps = {
    addModel,
    setModelActive,
    setModelInactive
}

const createContent = (modelOnSubmit, value) => {
    return (
        <div>
            <ItemSelector items={createItems()} defaultItem={value} callback={modelOnSubmit} marginBottom={"20px"} />
        </div>
    )
}

const createItems = () => {
    let array = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 5) {
            const minutes = j < 10 ? "0" + j : j;
            const hour = i < 10 ? "0" + i : i;
            array.push(hour + ":" + minutes);
        }
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

const MemoTimePickerWrapper = memo(connect(null, mapDispatchToProps)(TimePickerWrapper), areEqual)
export default MemoTimePickerWrapper;