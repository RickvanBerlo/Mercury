import React, { useState, cloneElement } from "react";
import styled from 'styled-components';

import SubmitButton from './submitButton';


const FormWrapper = ({ submitButtonName, elements, onSubmit }) => {
    const [validations, setvalidations] = useState(new Array(elements.length).fill(false));
    const [values, setvalues] = useState(new Array(elements.length).fill(""));
    const [enableSubmit, setEnableSubmit] = useState(CheckIfAllAreValid(validations));

    const getValues = (index, value, valid) => {
        let tmpValidations = validations;
        let tmpValues = values;

        tmpValidations[index] = valid;
        tmpValues[index] = value;

        setvalidations(tmpValidations);
        setvalues(tmpValues);
        setEnableSubmit(CheckIfAllAreValid(validations));
    }

    return (
        <Form onSubmit={(event) => { handleSubmit(event, values, onSubmit) }}>
            {elements.map((element, index) => {
                return cloneElement(element, { key: index, getValues: getValues }, null);
            })}
            <SubmitButton name={submitButtonName} submitButtonEnable={enableSubmit} />
        </Form>
    )
}

const handleSubmit = (event, values, onSubmit) => {
    onSubmit(event, values);
}

const CheckIfAllAreValid = (validations) => {
    let enable = true;
    validations.forEach((valid) => {
        if (!valid) enable = false;
    })
    return enable;
};


const Form = styled.form`
`

export default FormWrapper;