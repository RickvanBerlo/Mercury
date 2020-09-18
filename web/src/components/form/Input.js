import React, { memo, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import colorChanger from "../../utils/colorChanger";
import generateUUID from '../../utils/GenerateUUID';

const InputWrapper = ({ type, name, getValues, refresh, classname, colors, darkmode, props }) => {
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
        const callback = (value) => {
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
            {props.label !== undefined ? <Label color={colors.MAIN}>{props.label}</Label> : null}
            <Input
                {...props}
                className="input"
                colors={colors}
                darkmode={darkmode}
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

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors,
        darkmode: state.preferencesReducer.darkmode
    };
};

const Container = styled.div`
`

const Label = styled.div`
    color: ${props => props.color};
    margin-left: 10px;
    margin-bottom:2px;
`

const Input = styled.input`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid ${props => colorChanger(props.colors.SECONDARY, -0.3)};
    border-radius: 5px;
    padding: 8px;
    width: calc(100% - 16px);
    outline: none;
    margin-bottom: 20px;
    background-color: ${props => props.colors.SECONDARY}
    caret-color: ${props => props.colors.TEXT};
    color: ${props => props.colors.TEXT};
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
        -webkit-transition-delay: 9999s;
    }
    &::-webkit-calendar-picker-indicator {
        filter: ${props => props.darkmode? "invert(1)" : "none"};
    }
`

const areEqual = (prevProps, nextProps) => {
    if (nextProps.refresh) return false;
    return true;
}

const MemoInputWrapper = memo(connect(mapStateToProps, undefined)(InputWrapper), areEqual)
export default MemoInputWrapper;