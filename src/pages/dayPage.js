import React, { useEffect, useCallback, useRef } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import UUID from '../utils/GenerateUUID';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import AddIcon from 'react-ionicons/lib/MdAdd';

const Day = ({ setCurrentPage, selectedDay = new Date() }) => {
    let scroll = useRef(false);
    const isdragging = useRef(false);
    const beginTime = useRef("00:00");
    const endTime = useRef("00:00");

    const goBack = useCallback(() => {
        setCurrentPage(pageNames.CALENDAR, { selectedDay: selectedDay });
    }, [setCurrentPage, selectedDay])

    const setScroll = () => {
        scroll.current = true;
    }

    const goToEvent = () => {
        if (!scroll.current)
            setCurrentPage(pageNames.EVENT, { selectedDay: selectedDay, props: { beginTime: beginTime.current, endTime: endTime.current } });
        scroll.current = false;
    }

    const click = (e, id) => {
        e.preventDefault();
        beginTime.current = id;
        endTime.current = id;
        goToEvent();
    }

    const startDrag = (e, id) => {
        e.preventDefault();
        isdragging.current = true;
        document.getElementById(id).style.backgroundColor = colors.LIGHT_GRAY;
        beginTime.current = id;
    }

    const drag = (e, id) => {
        e.preventDefault();
        if (isdragging.current)
            document.getElementById(id).style.backgroundColor = colors.LIGHT_GRAY;
    }

    const endDrag = (e, id) => {
        e.preventDefault();
        if (isdragging.current) {
            isdragging.current = false;
            endTime.current = id;
            goToEvent();
        }
    }

    useEffect(() => {
        const backButton = document.getElementById("goBack");
        backButton.addEventListener("click", goBack, false);
        backButton.addEventListener("touchend", goBack, false);
        return () => {
            backButton.removeEventListener("click", goBack, false);
            backButton.removeEventListener("touchend", goBack, false);
        }
    }, [goBack]);

    useEffect(() => {
        window.addEventListener("touchmove", setScroll, false);
        return () => {
            window.removeEventListener("touchmove", setScroll, false);
        }
    }, [])

    return (
        <Container>
            <TopBar>
                <Title>{selectedDay.toLocaleDateString('nl')}</Title>
                <PositionButtonContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonContainer>
            </TopBar>
            <DayContainer>
                {createDayGrid(click, drag, startDrag, endDrag)}
            </DayContainer>
            <AddButton onClick={goToEvent} onTouchEnd={goToEvent}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container>
    )
}

const createDayGrid = (click, drag, startDrag, endDrag) => {
    let array = [];

    for (let i = 0; i < 24; i++) {
        array.push(
            <HourContainer key={UUID()}>
                <HourSectionsContainer>
                    {createQuarterContainers(i, click, drag, startDrag, endDrag)}
                </HourSectionsContainer>
                <HourNameContainer>
                    <HourName>{i < 10 ? "0" + i + "..00" : i + "..00"}</HourName>
                </HourNameContainer>
            </HourContainer>
        )
    }
    return array;
}

const createQuarterContainers = (hour, click, drag, startDrag, endDrag) => {
    let containers = [];
    for (let i = 0; i < 4; i++) {
        containers.push(<QuarterContainer key={createTime(hour, i)} id={createTime(hour, i)} onClick={(e) => { click(e, createTime(hour, i)) }} onTouchEnd={(e) => { click(e, createTime(hour, i)) }} onMouseMove={(e) => { drag(e, createTime(hour, i)) }} onMouseDown={(e) => { startDrag(e, createTime(hour, i)) }} onMouseUp={(e) => { endDrag(e, createTime(hour, i)) }} />)
    }
    return containers;
}

const createTime = (hour, quarter) => {
    return `${hour < 10 ? "0" + hour : hour}:${quarter * 15 === 0 ? "00" : quarter * 15}`;

}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`
const PositionButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    left: 10px;
`

const HourName = styled.div`
    position: relative;
    width: 10px;
    font-size: 20px;
    word-wrap: break-word;
    color: ${colors.WHITE};
    margin: auto;
    top: 50%;
    transform: translate(0%, -50%);
`

const QuarterContainer = styled.div`
    width: 100%;
    height: calc(25% - 1px);
    border-bottom: 1px solid ${colors.GRAY};
    transition: background-color 0.3s linear;
    &:hover{
        background-color: ${colors.LIGHT_GRAY}
        cursor: pointer;
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colors.WHITE};
        }
        &:active{
            background-color: ${colors.LIGHT_GRAY};
        }
    }
`

const HourSectionsContainer = styled.div`
    width: calc(100% - 20px);
`

const HourNameContainer = styled.div`
    width: 20px;
    background-color: ${colors.GRAY};
    border-bottom: 1px solid ${colors.WHITE};
    white-space: pre-line;
`

const HourContainer = styled.div`
    min-height: 150px;
    width: 100%;
    display: flex;
`

const Title = styled.p`
    font-size: 25px;
    width: 100%;
    line-height: 50px;
    text-align:center;
    margin: 0;
    color: ${colors.DARK_GREEN};
`

const TopBar = styled.div`
    position: relative;
    z-index: 2;
    width: 100vw;
    height: 50px;
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
`

const DayContainer = styled.div`
    width: 100vw;
    height: calc(100% - 50px);
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`

const AddButton = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 20px;
    right: 30px;
    border-radius: 100px;
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 10px 0px ${colors.BLACK};
`

export default Day;