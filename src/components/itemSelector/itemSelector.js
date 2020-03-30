import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import GenerateUUID from '../../utils/GenerateUUID';


const ItemSelector = ({ items, defaultItem, callback, toggle = undefined, marginBottom }) => {
    const [selectedItem, setSelectedItem] = useState(defaultItem);
    const ID = GenerateUUID();

    useEffect(() => {
        if (toggle) {
            console.log(ID);
            setSelectedItem(defaultItem);
            const Selector = document.getElementById(ID);
            Selector.scrollTop = (items.indexOf(defaultItem) * 50) - 125;
        }
    }, [toggle])

    useEffect(() => {
        callback(selectedItem);
    }, [selectedItem])

    const createItems = () => {
        return items.map((item) => {
            return (<Item key={GenerateUUID()} onClick={() => { setSelectedItem(item) }} onTouchEnd={() => { setSelectedItem(item) }}>
                <Name toggle={selectedItem === item}>{item}</Name>
            </Item>)
        })

    }

    return (
        <div>
            <SelectorContainer id={ID} marginBottom={marginBottom}>
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