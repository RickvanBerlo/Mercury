import React from "react";
import styled from 'styled-components';
import { connect } from "react-redux";

const SubmitButtonWrapper = ({ name, submitButtonEnable, colors, props }) => {
    return (
        <SubmitButton
            type="submit"
            colors={colors}
            disabled={submitButtonEnable ? "" : "disabled"}
            value={name}
            {...props}
        >
        </SubmitButton>
    )
}

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors
    };
};


const SubmitButton = styled.input`
    background-color: ${props => props.colors.MAIN};
    opacity: ${props => props.disabled ? 0.3 : 1}
    min-height: 40px;
    border-radius: 10px;
    padding: 5px 20px;
    margin-bottom: 10px;
    min-width: 150px;
    max-width: 150px;
    flex: 1;
    color: ${props => props.colors.TEXT};
    outline: none;
    font: 18px 'Open Sans Bold',sans-serif;
    transition: opacity 0.2s linear;
    &:hover{
        cursor: pointer;
    }
`

export default connect(mapStateToProps, undefined)(SubmitButtonWrapper);