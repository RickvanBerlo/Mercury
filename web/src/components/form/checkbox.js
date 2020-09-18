import React, { useState, memo, useEffect, useRef } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import generateUUID from '../../utils/GenerateUUID';

const CheckboxWrapper = ({ name, getValues, refresh, classname, colors, props }) => {
    const [check, setCheck] = useState(props.value !== undefined ? props.value : false);
    const UUID = useRef(generateUUID());

    useEffect(() => {
        if (refresh)
            setCheck(false);
    }, [refresh]);

    useEffect(() => {
        getValues(name, check, true);
    }, [check, name, getValues]);


    const callback = (value) => {
        switch (value) {
            case "toggleVisibility":
                setCheck(false);
                break;
            default: console.error("no case was found for " + value + " in the Callback function in Checkbox!");
        }
    }

    useEffect(() => {
        document.getElementById(UUID.current).callback = callback;
    }, [])

    return (
        <Container id={UUID.current} className={classname}>
            <Label>
                <CheckboxContainer>
                    <HiddenCheckbox type="checkbox" {...props} checked={check}
                        onChange={(event) => {
                            setCheck(event.target.checked)
                        }}
                    />
                    <StyledCheckbox color={colors.MAIN} checked={check} className="input" title={`Toggle het vlak aan of uit.`}>
                        <Icon viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                        </Icon>
                    </StyledCheckbox>
                </CheckboxContainer>
                <Name color={colors.TEXT} title={`Toggle de knop "${props.label}" aan of uit`}>: {props.label === undefined ? "no Label" : props.label}</Name>
            </Label>
        </Container >
    )
}

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors
    };
};

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
    transition: visibilty 0.3s linear;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
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

const StyledCheckbox = styled.div`
    width: 25px;
    margin-right: 10px;
    height: 25px;
    background: ${props => props.checked ? props.color : "gray"};
    border-radius: 5px;
    transition: all 0.3s;
    ${Icon} {
        visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }
`

const CheckboxContainer = styled.div`
`

const Container = styled.div`
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    margin-bottom: 20px;
`

const Label = styled.label`
    display: flex;
    &:hover{
        cursor: pointer;
    }
`

const Name = styled.p`
    font: 18px 'Open Sans Bold',sans-serif;  
    line-height: 25px;
    margin: 0;
    color: ${props => props.color};
`

const areEqual = (prevProps, nextProps) => {
    if (nextProps.refresh) return false;
    return true;
}

const MemoCheckboxWrapper = memo(connect(mapStateToProps, undefined)(CheckboxWrapper), areEqual)
export default MemoCheckboxWrapper;