import React, { memo, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import generateUUID from '../../utils/GenerateUUID';

const InputWrapper = ({ type, name, getValues, refresh, classname, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "" : props.value);
    const UUID = useRef(generateUUID());
    useEffect(() => {
        if (refresh)
            setValue("");
    }, [refresh]);

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props])

    useEffect(() => {
        const callback = (value, props) => {
            switch (value) {
                case "toggleVisibility":
                    setValue(props.value === undefined ? "" : props.value);
                    break;
                default: console.error("no case was found for " + value + " in the Callback function in Input!");
            }
        }
        document.getElementById(UUID.current).callback = callback;
    }, [props])

    return (
        <Container id={UUID.current} className={classname}>
            {props.label !== undefined ? <Label>{props.label}</Label> : null}
            <Input
                {...props}
                className="input"
                type={type}
                name={name}
                value={value}
                title={`vul hier uw "${props.label}" in.`}
                onChange={(event) => { setValue(event.target.value) }}
            >
            </Input >
        </Container >
    )
}

const Container = styled.div`
`

const Label = styled.div`
    color: ${colors.DARK_GREEN};
    margin-left: 10px;
    margin-bottom:2px;
`

const Input = styled.input`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: calc(100% - 16px);
    outline: none;
    margin-bottom: 20px;
`

const areEqual = (prevProps, nextProps) => {
    if (nextProps.refresh) return false;
    return true;
}

const MemoInputWrapper = memo(InputWrapper, areEqual)
export default MemoInputWrapper;