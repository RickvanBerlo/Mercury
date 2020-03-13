import React, { useState, cloneElement, useRef } from "react";
import styled from 'styled-components';

import SubmitButton from './submitButton';


const FormWrapper = ({ submitButtonName, elements, onSubmit, dependencies }) => {
    const validations = useRef(new Array(elements.length).fill(false));
    const [values, setValues] = useState({});
    const [enableSubmit, setEnableSubmit] = useState(CheckIfAllAreValid(validations.current));

    const getValues = (index, name, value, valid) => {
        let tmpValidations = validations.current;
        let tmpValues = values;
        tmpValidations[index] = valid;
        tmpValues[name] = value;

        validations.current = tmpValidations
        setValues({ ...tmpValues });
        setEnableSubmit(CheckIfAllAreValid(validations.current));
    }

    const getDependencyValues = (name) => {
        const dependencyValues = []
        if (dependencies[name]) {
            dependencies[name].forEach(element => {
                dependencyValues.push(values[element]);
            })
        }
        return dependencyValues;
    }

    return (
        <Form onSubmit={(event) => { handleSubmit(event, values, onSubmit) }}>
            {elements.map((element, index) => {
                return cloneElement(element, { key: index, getValues: getValues, dependencyValues: getDependencyValues(element.props.name) }, null);
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