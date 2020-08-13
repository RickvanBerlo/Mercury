import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import Model from '../model/model';
import ColorSelector from '../itemSelector/colorSelector';
import generateUUID from '../../utils/GenerateUUID';
import { connect } from "react-redux";
import { addModel, setModelActive, setModelInactive } from '../../stores/models/modelActions';

const ColorPickerWrapper = ({ name, getValues, refresh, classname, addModel, setModelActive, setModelInactive, props }) => {
    const [value, setValue] = useState(props.value === undefined ? colors.RED : props.value);
    const storedValue = useRef(value);
    const UUID = useRef(generateUUID());
    const colorPickerModelId = useRef(generateUUID());

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props])

    useEffect(() => {
        if (refresh)
            setValue(colors.RED);
    }, [refresh]);

    const actionSetModelActive = useCallback(() => {
        setModelActive(colorPickerModelId.current)
    }, [setModelActive])

    const actionSetModelInactive = useCallback(() => {
        setModelInactive(colorPickerModelId.current)
    }, [setModelInactive])

    useEffect(() => {
        const callback = (value) => {
            switch (value) {
                case "toggleVisibility":
                    setValue(colors.RED);
                    break;
                default: console.error("no case was found for " + value + " in the Callback function in ColorPicker!");
            }
        }
        document.getElementById(UUID.current).callback = callback;
        const colorPicker = document.getElementById(name);
        colorPicker.addEventListener("click", actionSetModelActive, false);
        return () => {
            colorPicker.removeEventListener("click", actionSetModelActive, false);
        }
    }, [props, name, actionSetModelActive])

    useEffect(() => {
        storedValue.current = value;
    }, [value])

    useEffect(() => {
        const modelOnsubmit = (newValue) => {
            setValue(newValue);
            actionSetModelInactive();
        }

        addModel(
            colorPickerModelId.current,
            <Model
                key={colorPickerModelId.current}
                id={colorPickerModelId.current}
                title="Selecteer een kleur"
                content={createContent(storedValue.current, modelOnsubmit)}
            />
        )
    }, [addModel, actionSetModelInactive])

    return (
        <Container id={UUID.current} className={classname}>
            <HiddenInput
                {...props}
                type="text"
                name={name}
                value={value}
                onChange={(event) => { setValue(event.target.value) }}
            >
            </HiddenInput >
            <StyledColorPicker id={name} className="input" title={`Selecteer een kleur.`}>
                <Color color={value} />
            </StyledColorPicker>
            <Label>: {props.label}</Label>
        </Container >
    )
}

const createContent = (value, modelOnsubmit) => {
    return (
        <div>
            <ColorSelector items={createItems()} defaultItem={value} callback={modelOnsubmit} marginBottom={"20px"} />
        </div>
    )
}

const createItems = () => {
    let array = [];
    array.push(colors.RED);
    array.push(colors.BLUE);
    array.push(colors.GREEN);
    array.push(colors.YELLOW);
    array.push(colors.PURPLE);
    array.push(colors.ORANGE);
    array.push(colors.AQUA);
    array.push(colors.PINK);
    return array;
}

const mapDispatchToProps = {
    addModel,
    setModelActive,
    setModelInactive
}

const Container = styled.div`
    margin-bottom: 20px;
    display: flex;
`

const Label = styled.div`
    font: 18px 'Open Sans Bold',sans-serif;  
    line-height: 35px;
    margin: 0;
    margin-left: 5px;
`

const HiddenInput = styled.input.attrs({ type: 'text' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledColorPicker = styled.div`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: 20px;
    outline: none;
    &:hover{
        cursor: pointer;
    }
`

const Color = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${props => props.color};
    border-radius: 20px;
`

const areEqual = (prevProps, nextProps) => {
    if (nextProps.refresh) return false;
    return true;
}

const MemoColorPickerWrapper = memo(connect(null, mapDispatchToProps)(ColorPickerWrapper), areEqual)
export default MemoColorPickerWrapper;