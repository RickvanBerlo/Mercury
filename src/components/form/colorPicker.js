import React, { memo, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import Model from '../model/model';
import ColorSelector from '../itemSelector/colorSelector';
import generateUUID from '../../utils/GenerateUUID';

const ColorPickerWrapper = ({ name, getValues, refresh, classname, props }) => {
    const [value, setValue] = useState(props.value === undefined ? colors.RED : props.value);
    const [toggle, setToggle] = useState(null);
    const UUID = useRef(generateUUID());

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props])

    useEffect(() => {
        if (refresh)
            setValue("00:00");
    }, [refresh]);

    useEffect(() => {
        const changeToggle = () => {
            setToggle(!toggle);
        }

        const callback = (value) => {
            switch (value) {
                case "toggleVisibility":
                    setValue(colors.RED);
                    setToggle(null);
                    break;
                default: console.error("no case was found for " + value + " in the Callback function in ColorPicker!");
            }
        }
        document.getElementById(UUID.current).callback = callback;
        const colorPicker = document.getElementById(name);
        colorPicker.addEventListener("click", changeToggle, false);
        return () => {
            colorPicker.removeEventListener("click", changeToggle, false);
        }
    }, [props, name, toggle])

    const modelOnsubmit = (newValue) => {
        setValue(newValue);
        setToggle(!toggle);
    }

    const createContent = () => {
        return (
            <div>
                <ColorSelector items={createItems()} defaultItem={value} callback={modelOnsubmit} toggle={toggle} marginBottom={"20px"} />
            </div>
        )
    }

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
            <Model
                toggle={toggle}
                setToggle={setToggle}
                title="Selecteer een kleur"
                content={createContent()}
            />
        </Container >
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

const MemoColorPickerWrapper = memo(ColorPickerWrapper, areEqual)
export default MemoColorPickerWrapper;