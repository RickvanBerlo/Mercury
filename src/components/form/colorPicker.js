import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import styled from 'styled-components';
import Model from '../model/model';
import ColorSelector from '../itemSelector/colorSelector';
import generateUUID from '../../utils/GenerateUUID';
import colorChanger from "../../utils/colorChanger";
import { connect } from "react-redux";
import { addModel, setModelActive, setModelInactive } from '../../stores/models/modelActions';

const ColorPickerWrapper = ({ name, getValues, refresh, classname, addModel, setModelActive, setModelInactive, colors, props }) => {
    const [value, setValue] = useState(props.value === undefined ? '#CC0000' : props.value);
    const storedValue = useRef(value);
    const UUID = useRef(generateUUID());
    const colorPickerModelId = useRef(generateUUID());

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props])

    useEffect(() => {
        if (refresh)
            setValue('#CC0000');
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
                    setValue('#CC0000');
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
            <StyledColorPicker colors={colors} id={name} className="input" title={`Selecteer een kleur.`}>
                <Color color={value} />
            </StyledColorPicker>
            <Label color={colors.TEXT}>: {props.label}</Label>
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
    array.push('#CC0000');
    array.push('#0676F6');
    array.push('#7ac142');
    array.push('#ecf70c');
    array.push('#f70cd8');
    array.push('#f08f07');
    array.push('#02f6fa');
    array.push('#ff08de');
    return array;
}

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors
    };
};

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
    color: ${props => props.color}
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
    border: 1px solid ${props => colorChanger(props.colors.SECONDARY, -0.3)};
    border-radius: 5px;
    background-color: ${props => props.colors.SECONDARY}
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

const MemoColorPickerWrapper = memo(connect(mapStateToProps, mapDispatchToProps)(ColorPickerWrapper), areEqual)
export default MemoColorPickerWrapper;