import React, { memo, useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

const InputWrapper = ({ index, type, name, getValues, refresh, classname, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "" : props.value);

    useEffect(() => {
        if (refresh)
            setValue("");
    }, [refresh]);

    getValues(index, name, value, props.validation(value))
    return (
        <Container className={classname}>
            {props.label !== undefined ? <Label>{props.label}</Label> : null}
            <Input
                {...props}
                type={type}
                name={name}
                value={value}
                title={`vul hier uw "${props.label}" in.`}
                onChange={(event) => { getValues(index, name, event.target.value, props.validation(event.target.value)); setValue(event.target.value) }}
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