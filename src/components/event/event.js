import React, { useEffect, useState, memo } from "react";
import styled, { css, keyframes } from 'styled-components';
import colors from '../../constants/colors';
import colorChanger from '../../utils/colorChanger';
import { datediff, parseDateYMD } from '../../utils/date';

const Event = ({ navigateToEventPage, placedDate, offset, props }) => {
    const [height, setHeight] = useState(window.outerHeight < 1000 ? window.outerHeight / 50 : 20);

    const goToEvent = (e) => {
        navigateToEventPage();
        e.stopPropagation();
    }

    const calculateWidth = () => {
        if (datediff(placedDate, props.endDate) > (6 - parseDateYMD(placedDate).getDay())) return (6 - parseDateYMD(placedDate).getDay());
        return datediff(placedDate, props.endDate);
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
        <Container onClick={goToEvent} height={height} offset={offset} width={calculateWidth()} color={props.color}><Title height={height}>{props.title}</Title></Container>
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
    margin-top: ${props => ((props.offset * 21)) + 3}px;
    margin-left: 3px;
    height: 16%;
    width: calc(100% + (${props => props.width} * 100%) - 6px);
    background-color: ${props => props.color};
    border-radius: 5px;
    z-index: 1;
    display: flex;
    opacity: 0;
    transition: background-color 0.3s linear;
    box-shadow: 0px 1px 2px 0px ${colors.BLACK};
    animation: ${props => css`${fadein} 0.4s linear ${Math.random() * 0.4}s forwards`};
    &:hover{
        background-color: ${props => colorChanger(props.color, -0.2)};
        cursor: pointer;
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${props => colorChanger(props.color, -0.2)};
        }
        &:active{
            background-color: ${props => colorChanger(props.color, -0.2)};
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
const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoEvent = memo(Event, areEqual)
export default MemoEvent;