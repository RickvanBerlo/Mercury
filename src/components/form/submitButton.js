import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

const SubmitButtonWrapper = ({ name, submitButtonEnable, props }) => {

    return (
        <SubmitButton
            type="submit"
            disabled={submitButtonEnable ? "" : "disabled"}
            value={name}
            {...props}
        >
        </SubmitButton>
    )
}

const changeText = (event, setText, setValid, validation) => {
    setValid(validation(event.target.value));
    setText(event.target.value);
}

const SubmitButton = styled.input`
    background-color: ${colors.WHITE};
    min-height: 40px;
    border-radius: 10px;
    padding: 5px 20px;
    color: ${colors.BLACK}
    outline: none;
    font: 18px 'Open Sans Bold',sans-serif;
`

export default SubmitButtonWrapper;