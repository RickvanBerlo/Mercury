import React, { useState, cloneElement, useRef, useEffect } from "react";
import styled from 'styled-components';

import SubmitButton from './submitButton';


const FormWrapper = ({ name, submitButtonName, elements, onSubmit, props }) => {
    const validations = useRef(new Array(elements.length).fill(false));
    const [values, setValues] = useState({});
    const [enableSubmit, setEnableSubmit] = useState(CheckIfAllAreValid(validations.current));
    const [refresh, setRefresh] = useState(false);
    const dependencies = useRef([]);
    const inputs = useRef([]);

    const getValues = (index, name, value, valid) => {
        let tmpValidations = validations.current;
        let tmpValues = values;
        tmpValidations[index] = valid;
        tmpValues[name] = value;

        validations.current = tmpValidations;
        setValues({ ...tmpValues });
        setEnableSubmit(CheckIfAllAreValid(validations.current));
        if (inputs.current.length !== 0)
            checkDependencies(name, value, dependencies.current, inputs.current);
        if (refresh)
            setRefresh(false);
    }

    const handleSubmit = (event) => {
        onSubmit(event, { ...values });
        if (props.reset) {
            setRefresh(true);
        }
    }

    useEffect(() => {
        inputs.current = document.getElementsByClassName(name);
    }, [name])

    return (
        <Form onSubmit={handleSubmit}>
            {elements.map((element, index) => {
                if (!dependencies.current[index])
                    dependencies.current[index] = element.props.props.dependencies;
                return cloneElement(element, { key: index, getValues: getValues, refresh: refresh, classname: name }, null);
            })}
            <SubmitButton name={submitButtonName} submitButtonEnable={enableSubmit} />
        </Form>
    )
}

const checkDependencies = (name, value, dependencies, inputs) => {
    dependencies.forEach((inputDependencies, index) => {
        if (inputDependencies !== undefined) {
            inputDependencies.forEach((dependency) => {
                if (dependency.valueOf === name) {
                    dependency.functions.forEach((f) => {
                        f(value, inputs[index]);
                    })
                }
            })
        }
    })
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