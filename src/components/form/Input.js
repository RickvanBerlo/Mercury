import React, { memo, useState } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

const InputWrapper = ({ index, label, type, name, validation = () => { return true }, getValues, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "" : props.value);

    getValues(index, name, value, validation(value))
    return (
        <Container>
            {label !== undefined ? <Label>{label}</Label> : null}
            <Input
                {...props}
                type={type}
                name={name}
                value={value}
                onChange={(event) => { getValues(index, name, event.target.value, validation(event.target.value)); setValue(event.target.value) }}
            >
            </Input >
        </Container >
    )
}

const Container = styled.div`
`

const Label = styled.div`
    color: ${colors.DARK_GREEN};
    margin-left: 10px;
    margin-bottom:2px;
`

const Input = styled.input`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: 100%;
    outline: none;
    margin-bottom: 20px;
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoInputWrapper = memo(InputWrapper, areEqual)
export default MemoInputWrapper;