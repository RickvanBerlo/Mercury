import React, { memo, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colorChanger from "../../utils/colorChanger";
import generateUUID from '../../utils/GenerateUUID';
import { connect } from "react-redux";

const TextAreaWrapper = ({ type, name, getValues, refresh, classname, colors, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "" : props.value);
    const UUID = useRef(generateUUID());

    useEffect(() => {
        if (refresh)
            setValue("");
    }, [refresh]);

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props]);

    useEffect(() => {
        const callback = (value) => {
            switch (value) {
                case "toggleVisibility":
                    setValue(props.value === undefined ? "" : props.value);
                    break;
                default: console.error("no case was found for " + value + " in the Callback function in TextArea!");
            }
        }
        document.getElementById(UUID.current).callback = callback;
    }, [props])

    return (
        <Container id={UUID.current} className={classname}>
            {props.label !== undefined ? <Label color={colors.MAIN}>{props.label}</Label> : null}
            <Input
                {...props}
                colors={colors}
                type={type}
                name={name}
                value={value}
                className="input"
                title={`vul hier uw "${props.label}" in`}
                onChange={(event) => { setValue(event.target.value) }}
            >
            </Input >
        </Container >
    )
}

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors
    };
};

const Container = styled.div`
`

const Label = styled.div`
    color: ${props => props.color};
    margin-left: 10px;
    margin-bottom:2px;
`

const Input = styled.textarea`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid ${props => colorChanger(props.colors.SECONDARY, -0.3)};
    border-radius: 5px;
    background-color: ${props => props.colors.SECONDARY}
    padding: 8px;
    width: calc(100% - 16px);
    outline: none;
    margin-bottom: 20px;
    caret-color: ${props => props.colors.TEXT};
    color: ${props => props.colors.TEXT};
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
        -webkit-transition-delay: 9999s;
    }
`

const areEqual = (prevProps, nextProps) => {
    if (nextProps.refresh) return false;
    return true;
}

const MemoTextAreaWrapper = memo(connect(mapStateToProps, undefined)(TextAreaWrapper), areEqual)
export default MemoTextAreaWrapper;