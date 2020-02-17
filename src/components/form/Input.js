import React from "react";
import styled from 'styled-components';

const InputWrapper = ({ index, type, name, validation = (value) => { return true }, getValues, props }) => {
    return (
        <Input
            type={type}
            name={name}
            onChange={(event) => { getValues(index, name, event.target.value, validation(event.target.value)) }}
            {...props}
        >
        </Input>
    )
}

const Input = styled.input`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    outline: none;
    margin-bottom: 20px;
`

export default InputWrapper;