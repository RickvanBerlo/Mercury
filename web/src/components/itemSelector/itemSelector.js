import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import GenerateUUID from '../../utils/GenerateUUID';


const ItemSelector = ({ items, defaultItem, callback, marginBottom }) => {
    const [selectedItem, setSelectedItem] = useState(defaultItem);
    const ID = useRef(GenerateUUID());

    useEffect(() => {
        const Selector = document.getElementById(ID.current);
        Selector.scrollTop = (items.indexOf(selectedItem) * 50) - 125;

    }, [selectedItem, items])

    useEffect(() => {
        callback(selectedItem);
    }, [selectedItem, defaultItem, callback])

    const createItems = () => {
        return items.map((item) => {
            return (<Item key={GenerateUUID()} onClick={() => { setSelectedItem(item) }} onTouchEnd={() => { setSelectedItem(item) }}>
                <Name toggle={selectedItem === item}>{item}</Name>
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

const Name = styled.p`
    margin: 0;
    color: ${colors.DARK_GREEN}
    line-height: 60px;
    font-size: ${props => props.toggle ? "30px" : "20px"}
    text-decoration: ${props => props.toggle ? "underline" : "none"};
    transition: font-size 0.3s linear;
    user-select: none;
    text-align: center;
    &:hover{
        font-size: 30px;
    }
`

export default ItemSelector;