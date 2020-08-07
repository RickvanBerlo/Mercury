import React, { useState, cloneElement, useRef, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

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
            <FlexContainer>
                <SubmitButton name={submitButtonName} submitButtonEnable={enableSubmit} />
                {props.onDelete !== undefined && <Spacer />}
                {props.onDelete !== undefined && <DeleteButton onClick={props.onDelete}><DeleteButtonText>Delete</DeleteButtonText></DeleteButton>}
            </FlexContainer>
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

const FlexContainer = styled.div`
    display: flex;
`

const Spacer = styled.div`
    flex: 1;
`

const DeleteButtonText = styled.p`
    text-align: center;
    margin: auto;
    line-height: 40px;
`

const DeleteButton = styled.div`
    background-color: ${colors.WHITE};
    height: 37px;
    border-radius: 10px;
    color: ${colors.BLACK}
    border-width: 2px;
    border-style: outset;
    border-color: ${colors.GRAY}
    border-image: initial;
    flex: 1;
    min-width: 150px;
    font: 18px 'Open Sans Bold',sans-serif;
    &:active{
        border-style: inset;
    }
    &:hover{
        cursor: pointer;
    }
`

export default FormWrapper;