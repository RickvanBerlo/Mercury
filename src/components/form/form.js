import React, { useState, useEffect, cloneElement } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

import SubmitButton from './submitButton';


const FormWrapper = ({ submitButtonName, elements }) => {
    const [submitButtonEnable, setSubmitButtonEnable] = useState(false);
    const [validations, setvalidations] = useState(new Array(elements.length));

    const getValid = (index, valid) => {
        let tmpValidations = validations
        tmpValidations[index] = valid;
        setvalidations(tmpValidations);
    }

    useEffect(() => {
        let enable = true;
        validations.forEach((valid) => {
            if (!valid) enable = false;
        })
        setSubmitButtonEnable(enable);
    }, [validations])

    return (
        <Form >
            {elements.map((element, index) => {
                return cloneElement(element, { key: index, getValid: getValid }, null);
            })}
            <SubmitButton name={submitButtonName} submitButtonEnable={submitButtonEnable} />
        </Form>
    )
}


const Form = styled.form`
`

export default FormWrapper;