import React, { useState, cloneElement, useRef } from "react";
import styled from 'styled-components';

import SubmitButton from './submitButton';


const FormWrapper = ({ submitButtonName, elements, onSubmit }) => {
    const validations = useRef(new Array(elements.length).fill(false));
    const values = useRef({});
    const [enableSubmit, setEnableSubmit] = useState(CheckIfAllAreValid(validations.current));

    const getValues = (index, name, value, valid) => {
        let tmpValidations = validations.current;
        let tmpValues = values.current;
        tmpValidations[index] = valid;
        tmpValues[name] = value;

        validations.current = tmpValidations
        values.current = tmpValues;
        setEnableSubmit(CheckIfAllAreValid(validations.current));
    }

    return (
        <Form onSubmit={(event) => { handleSubmit(event, values.current, onSubmit) }}>
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