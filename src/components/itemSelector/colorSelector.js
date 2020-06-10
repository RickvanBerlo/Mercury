import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import GenerateUUID from '../../utils/GenerateUUID';


const ColorSelector = ({ items, defaultItem, callback, toggle = undefined, marginBottom }) => {
    const [selectedItem, setSelectedItem] = useState(defaultItem);
    const currentToggleValue = useRef(toggle);
    const oldToggleValue = useRef(false);
    const ID = useRef(GenerateUUID());

    useEffect(() => {
        oldToggleValue.current = currentToggleValue.current;
        currentToggleValue.current = toggle;
    }, [toggle, oldToggleValue, currentToggleValue])

    useEffect(() => {
        if (toggle && !oldToggleValue.current) {
            oldToggleValue.current = true;
            const Selector = document.getElementById(ID.current);
            Selector.scrollTop = (items.indexOf(selectedItem) * 50) - 125;
        }
    }, [toggle, ID, selectedItem, items])

    useEffect(() => {
        if (defaultItem !== selectedItem) {
            callback(selectedItem);
        }
    }, [selectedItem, defaultItem, callback])

    const createItems = () => {
        return items.map((item) => {
            return (<Item key={GenerateUUID()} onClick={() => { setSelectedItem(item) }} onTouchEnd={() => { setSelectedItem(item) }}>
                <Color color={item}></Color>
            </Item>)
        })

    }

    return (
        <div>
            <SelectorContainer id={ID.current} marginBottom={marginBottom}>
                {createItems()}
            </SelectorContainer>
        </div>
    )
}

const SelectorContainer = styled.div`
    height: 300px;
    width: 250px;
    margin: auto;
    margin-bottom: ${props => props.marginBottom};
    box-shadow: inset 0px 0px 10px 0px ${colors.BLACK};
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }

`

const Item = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 50px;  
    transition: background-color 0.3s linear;
    &:hover{
        cursor: pointer;
    }
`

const Color = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.color};
    border-radius: 20px;
    width: 20px;
    height: 20px;
    transition: all 0.3s linear;
    &:hover{
        width: 30px;
        height: 30px;
    }
`

export default ColorSelector;