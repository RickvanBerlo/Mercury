import React, { useState, cloneElement, useRef, useEffect } from "react";
import styled from 'styled-components';

import SubmitButton from './submitButton';


const FormWrapper = ({ name, submitButtonName, elements, onSubmit, props }) => {
    const validations = useRef({});
    const [values, setValues] = useState({});
    const [enableSubmit, setEnableSubmit] = useState(CheckIfAllAreValid(validations.current));
    const [refresh, setRefresh] = useState(false);
    const dependencies = useRef({});
    const inputs = useRef({});

    const getValues = (name, value, valid) => {
        let tmpValidations = validations.current;
        let tmpValues = values;
        tmpValidations[name] = valid;
        tmpValues[name] = value;

        validations.current = tmpValidations;
        setValues({ ...tmpValues });
        setEnableSubmit(CheckIfAllAreValid(validations.current));

        if (inputs.current.length !== 0 && dependencies.current.length !== 0)
            checkDependencies(name, value);
        if (refresh)
            setRefresh(false);
    }

    const handleSubmit = (event) => {
        onSubmit(event, { ...values });
        if (props.reset) {
            setRefresh(true);
        }
    }

    const changeValidation = (name) => {
        return (value) => {
            validations.current[name] = value;
            setEnableSubmit(CheckIfAllAreValid(validations.current));
        }
    }

    const checkDependencies = (name, value) => {
        for (const key in dependencies.current) {
            dependencies.current[key].forEach((dependency) => {
                dependency.functions.forEach((f) => {
                    if (dependency.valueOf === name) {
                        if (dependencies.current[name].some((dependency) => { return dependency.valueOf === key })) {
                            f(values[key], value, inputs.current[dependency.valueOf], changeValidation(dependency.valueOf), inputs.current)
                        }
                    } else if (name === key) {
                        f(value, values[dependency.valueOf], inputs.current[dependency.valueOf], changeValidation(dependency.valueOf), inputs.current)
                    }
                })
            })
        }
    }

    useEffect(() => {
        elements.forEach((element) => {
            if (element.props.props.dependencies !== undefined)
                dependencies.current[element.props.name] = element.props.props.dependencies;
        });
    }, [elements])

    useEffect(() => {
        const tmpElements = document.getElementsByClassName(name);
        elements.forEach((element, index) => {
            inputs.current[element.props.name] = tmpElements[index];
        });
    }, [name, elements])

    return (
        <Form onSubmit={handleSubmit}>
            {elements.map((element, index) => {
                return cloneElement(element, { key: `${index}${name}`, getValues: getValues, refresh: refresh, classname: name }, null);
            })}
            <SubmitButton name={submitButtonName} submitButtonEnable={enableSubmit} />
        </Form>
    )
}

const CheckIfAllAreValid = (validations) => {
    let enable = true;
    for (const key in validations) {
        if (!validations[key]) enable = false;
    }
    return enable;
};


const Form = styled.form`
`

export default FormWrapper;