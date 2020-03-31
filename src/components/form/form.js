import React, { useState, cloneElement, useRef } from "react";
import styled from 'styled-components';

import SubmitButton from './submitButton';


const FormWrapper = ({ submitButtonName, elements, onSubmit, props }) => {
    const validations = useRef(new Array(elements.length).fill(false));
    const [values, setValues] = useState({});
    const [enableSubmit, setEnableSubmit] = useState(CheckIfAllAreValid(validations.current));
    const [refresh, setRefresh] = useState(false);

    const getValues = (index, name, value, valid) => {
        let tmpValidations = validations.current;
        let tmpValues = values;
        tmpValidations[index] = valid;
        tmpValues[name] = value;

        validations.current = tmpValidations;
        setValues({ ...tmpValues });
        setEnableSubmit(CheckIfAllAreValid(validations.current));
        if (refresh)
            setRefresh(false);
    }

    // const getDependencyValues = (name) => {
    //     const dependencyValues = []
    //     if (props.dependencies[name]) {
    //         props.dependencies[name].forEach(element => {
    //             dependencyValues.push(values[element]);
    //         })
    //     }
    //     return dependencyValues;
    // }

    const handleSubmit = (event) => {
        onSubmit(event, { ...values });
        if (props.reset) {
            setRefresh(true);
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            {elements.map((element, index) => {
                return cloneElement(element, { key: index, getValues: getValues, refresh: refresh }, null);
                // dependencyValues: getDependencyValues(element.props.name)
            })}
            <SubmitButton name={submitButtonName} submitButtonEnable={enableSubmit} />
        </Form>
    )
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