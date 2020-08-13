import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from 'styled-components';
import colors from '../../constants/colors';
import colorChanger from '../../utils/colorChanger';

const EventPlaceholder = ({ navigateToDayPage, offset }) => {
    const [height, setHeight] = useState(window.outerHeight < 1000 ? window.outerHeight / 50 : 20);

    const goToDay = (e) => {
        navigateToDayPage();
        e.stopPropagation();
    }

    const resizeHeight = (e) => {
        if (e.target.outerHeight < 1000) setHeight(e.target.outerHeight / 50);
    }

    useEffect(() => {
        window.addEventListener("resize", resizeHeight);
        return () => {
            window.removeEventListener("resize", resizeHeight);
        }
    }, [])

    return (
        <Container onClick={goToDay} height={height} offset={offset}><Title height={height}>...</Title></Container>
    )

}

const fadein = keyframes`
  from { 
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const Container = styled.div`
    position: relative;
    margin-top: ${props => ((props.offset * 23)) + 3}px;
    margin-left: 3px;
    height: 16%;
    width: calc(100%  - 6px);
    background-color: ${colors.RED}
    border-radius: 5px;
    z-index: 1;
    opacity: 0;
    display: flex;
    transition: background-color 0.3s linear;
    box-shadow: 0px 1px 2px 0px ${colors.BLACK};
    animation: ${props => css`${fadein} 0.4s linear ${Math.random() * 0.4}s forwards`};
    &:hover{
        background-color: ${colorChanger(colors.RED, -0.2)}
        cursor: pointer;
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colorChanger(colors.RED, -0.2)};
        }
        &:active{
            background-color: ${colorChanger(colors.RED, -0.2)}
    }
`

const Title = styled.p`
    flex: 1;
    color: ${colors.WHITE}
    margin: 0;
    width: 1px;
    height: 100%;
    text-align: left;
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${props => props.height - 2}px;
`


export default EventPlaceholder;