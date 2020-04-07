import React, { useEffect, useCallback, useRef, memo } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import UUID from '../utils/GenerateUUID';
import colorChanger from '../utils/colorChanger';
import CurrentTime from '../components/currentTime/currentTime';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import AddIcon from 'react-ionicons/lib/MdAdd';

const Day = ({ setCurrentPage, selectedDay = new Date(), events = [] }) => {
    let scroll = useRef(false);
    const ispressedDown = useRef(false);
    const isdragging = useRef(false);
    const beginTime = useRef("00:00");
    const endTime = useRef("00:00");
    console.log("rerender")
    const goBack = useCallback(() => {
        setCurrentPage(pageNames.CALENDAR, { selectedDay: selectedDay });
    }, [setCurrentPage, selectedDay])

    const setScroll = () => {
        scroll.current = true;
    }

    const goToEventEdit = () => {
        if (!scroll.current)
            setCurrentPage(pageNames.EVENTEDIT, { selectedDay: selectedDay, props: { beginTime: beginTime.current, endTime: endTime.current } });
        scroll.current = false;
    }

    const goToEvent = (e, props) => {
        e.stopPropagation();
        e.preventDefault();
        if (!scroll.current)
            setCurrentPage(pageNames.EVENT, { selectedDay: selectedDay, props: props });
        scroll.current = false;
    }

    const click = (e, id) => {
        e.preventDefault();
        beginTime.current = id;
        endTime.current = id;
        goToEventEdit();
    }

    const startDrag = (e, id) => {
        e.preventDefault();
        ispressedDown.current = true;
        document.getElementById(id).style.backgroundColor = colors.LIGHT_GRAY;
        beginTime.current = id;
    }

    const drag = (e, id) => {
        e.preventDefault();
        if (ispressedDown.current) {
            isdragging.current = true;
            document.getElementById(id).style.backgroundColor = colors.LIGHT_GRAY;
        }
    }

    const endDrag = (e, id) => {
        e.preventDefault();
        if (isdragging.current && ispressedDown.current) {
            isdragging.current = false;
            ispressedDown.current = false;
            endTime.current = id;

            console.log("d");
            goToEventEdit();
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
        const today = new Date();
        document.getElementById("dayContainer").scrollTop = ((today.getHours() * 180) + (today.getMinutes() * (180 / 60))) - (window.screen.height / 4);
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
            <DayContainer id={"dayContainer"}>
                <CurrentTime />
                {createDayGrid(click, drag, startDrag, endDrag, events, goToEvent)}
            </DayContainer>
            <AddButton onClick={goToEventEdit} onTouchEnd={goToEventEdit}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container>
    )
}

const createDayGrid = (click, drag, startDrag, endDrag, events, goToEvent) => {
    let array = [];

    for (let i = 0; i < 24; i++) {
        array.push(
            <HourContainer key={UUID()}>
                <HourSectionsContainer>
                    {createQuarterContainers(i, click, drag, startDrag, endDrag, events, goToEvent)}
                </HourSectionsContainer>
                <HourNameContainer>
                    <HourName>{i < 10 ? "0" + i + "..00" : i + "..00"}</HourName>
                </HourNameContainer>
            </HourContainer>
        )
    }
    return array;
}

const createQuarterContainers = (hour, click, drag, startDrag, endDrag, events, goToEvent) => {
    let containers = [];
    for (let i = 0; i < 4; i++) {
        containers.push(
            <QuarterContainer key={createTime(hour, i)} id={createTime(hour, i)} onClick={(e) => { click(e, createTime(hour, i)) }} onTouchEnd={(e) => { click(e, createTime(hour, i)) }} onMouseMove={(e) => { drag(e, createTime(hour, i)) }} onMouseDown={(e) => { startDrag(e, createTime(hour, i)) }} onMouseUp={(e) => { endDrag(e, createTime(hour, i)) }}>
                {createEvents(createTime(hour, i), events, goToEvent)}
            </QuarterContainer>
        )
    }
    return containers;
}

const createEvents = (quarter, events, goToEvent) => {
    let eventComponents = [];
    for (let i = 0; i < events.length; i++) {
        if (events[i].startTime === quarter) {
            let offset = getOffset(quarter, events);
            eventComponents.push(<Event key={UUID()} className="event" offset={offset} height={diffQuarter(events[i].startTime, events[i].endTime)} onClick={(e) => { goToEvent(e, events[i]) }} onTouchEnd={(e) => { goToEvent(e, events[i]) }}><EventTitle>{events[i].title}</EventTitle></Event>)
        }
    }
    return eventComponents;
}

const getOffset = (quarter, events) => {
    let offset = 0;
    for (let i = 0; i < events.length; i++) {
        if (diffQuarter(events[i].startTime, quarter) < diffQuarter(events[i].startTime, events[i].endTime) && diffQuarter(events[i].startTime, quarter) > 0) {
            offset += 1;
        }
    }
    return offset;
}

const createTime = (hour, quarter) => {
    return `${hour < 10 ? "0" + hour : hour}:${quarter * 15 === 0 ? "00" : quarter * 15}`;
}

const diffQuarter = (startTime, endTime) => {
    const start = startTime.split(':');
    const end = endTime.split(':');
    return ((parseInt(end[0]) * 4) + (parseInt(end[1]) / 15)) - ((parseInt(start[0]) * 4) + (parseInt(start[1]) / 15));
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const Event = styled.div`
    position: relative;
    text-align: center;
    flex: 1;
    height: calc(${props => (props.height * 100) + 100}% + ${props => props.height + 1}px);
    background-color: ${colors.RED};
    margin-left: ${props => 6 + (props.offset * 6)}px;
    margin-right: ${props => 6 + (props.offset * 6)}px;
    border-radius: 5px;
    transition: background-color 0.3s linear;
    box-shadow: 0px 1px 2px 0px ${colors.BLACK};
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

const EventTitle = styled.p`
    color: ${colors.WHITE}
    margin: 0;
    width: calc(100% - 16px);
    text-align: center;
    font-size: 20px;
    height: 100%;
    padding-top: 2px;
    margin-left: 8px;
    margin-right: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
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
    display: flex;

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
    min-height: 180px;
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

const areEqual = (prevProps, nextProps) => {
    return true;
}

export default memo(Day, areEqual);