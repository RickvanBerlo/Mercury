import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from 'styled-components';
import colors from '../../constants/colors';
import GenerateUUID from '../../utils/GenerateUUID';


const ColorSelector = ({ items, defaultItem, callback, marginBottom }) => {
    const [selectedItem, setSelectedItem] = useState(defaultItem);

    const ID = useRef(GenerateUUID());

    useEffect(() => {
        const Selector = document.getElementById(ID.current);
        Selector.scrollTop = (items.indexOf(selectedItem) * 50) - 125;

    }, [selectedItem, items])

    useEffect(() => {
        if (defaultItem !== selectedItem) {
            callback(selectedItem);
        }
    }, [selectedItem, defaultItem, callback])

    const createItems = () => {
        return items.map((item) => {
            return (<Item key={GenerateUUID()} onClick={() => { setSelectedItem(item) }} onTouchEnd={() => { setSelectedItem(item) }}>
                <Color color={item} selected={item === selectedItem}></Color>
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
const pulse = keyframes`
  from { 
    height: 20px;
    width: 20px;
  }
  50% {
    height: 30px;
    width: 30px;
  }
  to {
    height: 20px;
    width: 20px;
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
    width: ${props => props.selected ? "30px" : "20px"};
    height: ${props => props.selected ? "30px" : "20px"};
    transition: all 0.3s linear;
    &:hover{
        animation: ${props => props.selected ? "none" : css`${pulse} 1s linear infinite`};
    }
`

export default ColorSelector;