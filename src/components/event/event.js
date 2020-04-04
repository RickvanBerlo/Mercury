import React from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import colorChanger from '../../utils/colorChanger';
import { pageNames } from '../../constants/pages';
import { datediff } from '../../utils/date';

const Event = ({ setCurrentPage, offset, props }) => {

    const goToEvent = (e) => {
        setCurrentPage(pageNames.EVENT, { props: props });
        e.stopPropagation();
    }

    return (
        <Container onClick={goToEvent} offset={offset} width={datediff(props.startDate, props.endDate)}><Title>{props.title}ddddddddddddddddddddd</Title></Container>
    )

}

const Container = styled.div`
    position: relative;
    margin-top: ${props => ((props.offset * 23)) + 3}px;
    margin-left: 3px;
    height: 20px;
    width: calc(100% + (${props => props.width} * 100%) - 6px);
    background-color: ${colors.RED}
    border-radius: 5px;
    z-index: 1;
    display: flex;
    transition: background-color 0.3s linear;
    &:hover{
        background-color: ${colorChanger(colors.RED, -0.2)}
        cursor: pointer;
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colors.RED};
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
`


export default Event;