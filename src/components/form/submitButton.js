import React from "react";
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

const SubmitButton = styled.input`
    background-color: ${colors.WHITE};
    opacity: ${props => props.disabled ? 0.3 : 1}
    min-height: 40px;
    border-radius: 10px;
    padding: 5px 20px;
    margin-bottom: 10px;
    color: ${colors.BLACK}
    outline: none;
    font: 18px 'Open Sans Bold',sans-serif;
    transition: opacity 0.2s linear;
`

export default SubmitButtonWrapper;