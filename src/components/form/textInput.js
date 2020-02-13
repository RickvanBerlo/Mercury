import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

const TextInputWrapper = ({ index, validation = (value) => { return true }, getValid, props }) => {
    const [text, setText] = useState("");
    const [valid, setValid] = useState(validation(text));

    useEffect(() => {
        getValid(index, valid);
    }, [valid])

    return (
        <TextInput
            type="text"
            onChange={(event) => { changeText(event, setText, setValid, validation) }}
            {...props}
        >
        </TextInput>
    )
}

const changeText = (event, setText, setValid, validation) => {
    setValid(validation(event.target.value));
    setText(event.target.value);
}

const TextInput = styled.input`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    outline: none;
    margin-bottom: 20px;
`

export default TextInputWrapper;