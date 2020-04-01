import React, { useState, memo, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

const CheckboxWrapper = ({ index, name, getValues, refresh, classname, props }) => {
    const [check, setCheck] = useState(props.checked !== undefined ? props.checked : false);

    useEffect(() => {
        if (refresh)
            setCheck(false);
    }, [refresh]);

    getValues(index, name, check, true);

    return (
        <Container className={classname}>
            <Label>
                <CheckboxContainer>
                    <HiddenCheckbox type="checkbox" {...props} checked={props.checked} onChange={(event) => {
                        getValues(index, name, event.target.checked, true); setCheck(event.target.checked)
                    }} />
                    <StyledCheckbox checked={check} title={`Toggle de knop "${props.label}" aan of uit`}>
                        <Icon viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                        </Icon>
                    </StyledCheckbox>
                </CheckboxContainer>
                <Name title={`Toggle de knop "${props.label}" aan of uit`}>: {props.label === undefined ? "no Label" : props.label}</Name>
            </Label>
        </Container >
    )
}


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
    background: ${props => props.checked ? colors.DARK_GREEN : colors.LIGHT_GRAY};
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
`

const areEqual = (prevProps, nextProps) => {
    if (nextProps.refresh) return false;
    return true;
}

const MemoCheckboxWrapper = memo(CheckboxWrapper, areEqual)
export default MemoCheckboxWrapper;