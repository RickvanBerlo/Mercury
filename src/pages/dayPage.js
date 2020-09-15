import React, { useEffect, useCallback, memo } from "react";
import styled from 'styled-components';
import IconButton from '../components/buttons/dasboard/iconButton';
import ToggleIconButton from '../components/buttons/dasboard/toggleIconButton';
import UUID from '../utils/GenerateUUID';
import colorChanger from '../utils/colorChanger';
import CurrentTime from '../components/currentTime/currentTime';
import { datediff } from '../utils/date';
import { ParseTimeToString } from '../utils/time';
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import objectIsEmpty from '../utils/objectIsEmpty';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import EyeIcon from 'react-ionicons/lib/MdEye';
import EyeOffIcon from 'react-ionicons/lib/MdEyeOff';
import AddIcon from 'react-ionicons/lib/MdAdd';

const Day = ({ events, colors }) => {
    const history = useHistory();
    const { date } = useParams();
    const allDayEvents = getAllDayEvents(date, events);
    const timedEvents = objectIsEmpty(events) ? [] : objectIsEmpty(events[date]) ? [] : events[date].timedEvents;

    const goBack = useCallback(() => {
        history.goBack();
    }, [history])

    const goToEventEdit = (time) => {
        if(time !== undefined)
        history.push(`${date}/createevent/${time}`);
    }

    const goToEvent = (e, event) => {
        e.stopPropagation();
        e.preventDefault();
        history.push(`${event.startDate}/events/${event.id}`);
    }

    const click = (e, id) => {
        e.preventDefault();
        goToEventEdit(id);
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

    const hideAllDayEventsAnim = () => {
        document.getElementById("allDayContainer").style.maxHeight = "0px";
    }

    const showAllDayEventsAnim = () => {
        const amount = allDayEvents.length === 0 ? 1 : allDayEvents.length;
        document.getElementById("allDayContainer").style.maxHeight = `${amount * 40}px`;
    }

    const ToggleShowAllDay = (bool) => {
        if (bool) showAllDayEventsAnim();
        else hideAllDayEventsAnim();
    }

    useEffect(() => {
        const today = new Date();
        let scroll = (((today.getHours() * 180) + (today.getMinutes() * (180 / 60))) - (window.innerHeight/2));
        if(scroll < 0) scroll = 0;
        document.getElementById("dayContainer").scrollTop = scroll;
    }, [])

    return (
        <Container colors={colors}>
            <TopBar colors={colors}>
                <Title color={colors.MAIN}>{date}</Title>
                <PositionButtonLeftContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonLeftContainer>
                <PositionButtonRightContainer>
                    <ToggleIconButton id="showAllDay" iconOne={EyeIcon} iconTwo={EyeOffIcon} callback={ToggleShowAllDay} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonRightContainer>
            </TopBar>
            <AllDayContainer colors={colors} id={"allDayContainer"}>
                {placeAllDayEvents(allDayEvents, goToEvent, date, colors)}
            </AllDayContainer>
            <DayContainer id={"dayContainer"}>
                {createDayGrid(click, colors)}
                {placeTimedEvents(timedEvents, goToEvent)}
                <CurrentTime />
            </DayContainer>
            <AddButton colors={colors} onClick={(e) => {goToEventEdit()}} onTouchEnd={(e) => {goToEventEdit()}}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container>
    )
}

const getAllDayEvents = (dateOfDay, events) => {
    if (objectIsEmpty(events) || objectIsEmpty(events[dateOfDay])) return [];
    const date = new Date(dateOfDay);
    let array = events[dateOfDay].allDayEvents;
    let offset = events[dateOfDay].offset;
    while (offset > 0) {
        date.setDate(date.getDate() - 1);
        if (events[date.toLocaleDateString("fr-CA")].offset === (offset -1)) {
            array = array.concat(events[date.toLocaleDateString("fr-CA")].allDayEvents);
            offset -= events[date.toLocaleDateString("fr-CA")].allDayEvents.length;
        }
    }
    return array;
}

const createDayGrid = (click, colors) => {
    let array = [];

    for (let i = 0; i < 24; i++) {
        array.push(
            <HourContainer key={UUID()} offset={i}>
                <HourSectionsContainer>
                    {createQuarterContainers(i, click, colors)}
                </HourSectionsContainer>
                <HourNameContainer colors={colors}>
                    <HourName>{i < 10 ? "0" + i + "..00" : i + "..00"}</HourName>
                </HourNameContainer>
            </HourContainer>
        )
    }
    return array;
}

const createQuarterContainers = (hour, click, colors) => {
    let containers = [];
    for (let i = 0; i < 4; i++) {
        containers.push(
            <QuarterContainer colors={colors} key={ParseTimeToString(hour, i)} id={ParseTimeToString(hour, i)} onClick={(e) => { click(e, ParseTimeToString(hour, i)) }} onTouchEnd={(e) => { click(e, ParseTimeToString(hour, i)) }}>
            </QuarterContainer>
        )
    }
    return containers;
}

const placeTimedEvents = (events, goToEvent) => {
    let eventComponents = [];
    events.sort(sortEventsOnTime);
    const positionedEvents = caclulatePositionOfEvents(events);
    for (const key in positionedEvents){
        eventComponents.push(
            <TimedEvent 
                key={UUID()} 
                className="event" 
                color={positionedEvents[key].color} 
                offsetLeft={positionedEvents[key].offsetLeft} 
                offsetTop={positionedEvents[key].offsetTop} 
                width={positionedEvents[key].width} 
                height={positionedEvents[key].height} 
                onClick={(e) => { goToEvent(e, positionedEvents[key]) }} 
                onTouchEnd={(e) => { goToEvent(e, positionedEvents[key]) }}> 
                    <EventTitle>{positionedEvents[key].title}</EventTitle>
            </TimedEvent >
        )
    }
    return eventComponents;
}

const sortEventsOnTime = (first, second) => {
    return diffBetweenTime(second.startTime, first.startTime)
}

const placeAllDayEvents = (events, goToEvent, selectedDay, colors) => {
    let eventComponents = [];

    for (let i = 0; i < events.length; i++) {
        eventComponents.push(
            <AllDayEvent colors={colors} key={events[i].id} onClick={(e) => { goToEvent(e, events[i]) }} onTouchEnd={(e) => { goToEvent(e, events[i]) }}>
                <ColorBubble color={events[i].color}></ColorBubble>
                <AllDayEventTitle color={colors.TEXT}>{events[i].title} ({datediff(events[i].startDate, selectedDay) + 1}/{datediff(events[i].startDate, events[i].endDate) + 1})</AllDayEventTitle>
            </AllDayEvent>
        )
    }
    if (eventComponents.length === 0) {
        eventComponents.push(<Text color={colors.MAIN} key={UUID()}>geen events gevonden...</Text>)
    }

    return eventComponents;
}

const diffBetweenTime = (startTime, endTime) => {
    const start = startTime.split(':');
    const end = endTime.split(':');
    return ((parseInt(end[0]) * 60) + (parseInt(end[1]))) - ((parseInt(start[0]) * 60) + (parseInt(start[1])));
}

const caclulatePositionOfEvents = (events) => {
    const sortedEvents = {};

    events.forEach((event) => {
        const collisionEvents = [];
        for (const key in sortedEvents) {
            //top half
            if (event.startTime.localeCompare(sortedEvents[key].startTime) < 0 && event.endTime.localeCompare(sortedEvents[key].startTime) > 0) collisionEvents.push(sortedEvents[key]);
            //bottom half
            if (event.startTime.localeCompare(sortedEvents[key].endTime) < 0 && event.endTime.localeCompare(sortedEvents[key].endTime) >= 0) collisionEvents.push(sortedEvents[key]);
            //inside
            else if (event.startTime.localeCompare(sortedEvents[key].startTime) > 0 && event.endTime.localeCompare(sortedEvents[key].endTime) < 0) collisionEvents.push(sortedEvents[key]);
            //outside
            else if (event.startTime.localeCompare(sortedEvents[key].startTime) < 0 && event.endTime.localeCompare(sortedEvents[key].endTime) > 0) collisionEvents.push(sortedEvents[key]);
            //same
            else if (event.startTime.localeCompare(sortedEvents[key].startTime) === 0 && event.endTime.localeCompare(sortedEvents[key].endTime) === 0) collisionEvents.push(sortedEvents[key]);
        }
        const sortedCollisionEvents = collisionEvents.sort((eventA, eventB) => {
            return eventA.startTime.localeCompare(eventB.startTime);
        });
        collisionEvents.push(event);
        let width = 100 / sortedCollisionEvents.length;
        sortedCollisionEvents.forEach((collisionEvent, index) => {
            if(sortedEvents[collisionEvent.id] === undefined){
                let offsetLeft = width * index;
                if (sortedCollisionEvents[index - 1] && sortedCollisionEvents[index - 1].offsetLeft > 0){
                    offsetLeft = 0; 
                }
                sortedEvents[collisionEvent.id] = {
                    ...event,
                    offsetTop: diffBetweenTime("00:00", event.startTime) * 3,
                    offsetLeft: offsetLeft,
                    height: diffBetweenTime(event.startTime, event.endTime) * 3,
                    width: width
                }

                if (sortedCollisionEvents[index - 1]) sortedEvents[sortedCollisionEvents[index - 1].id].width = width;
            }
        })
    })
    return sortedEvents;
}

const mapStateToProps = state => {
    return {
        events: state.eventReducer.events,
        colors: state.preferencesReducer.colors  
    };
};

const mapDispatchToProps = {
}


const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${props => props.colors.PRIMARY};
`

const AllDayContainer = styled.div`
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    box-shadow: 0px 3px 6px -1px black;
    z-index: 1;
    max-height: 0;
    overflow: hidden;
    background-color: ${props => props.colors.SECONDARY};
    transition: max-height 0.2s linear;

`

const AllDayEvent = styled.div`
    text-align: center;
    display: flex;
    height: 30px;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 8px;
    margin-bottom: 2px;
    border-radius: 5px;
    transition: background-color 0.3s linear;
    box-shadow: inset 0px 0px 5px 5px white;
    &:hover{
        background-color: ${props => colorChanger(props.colors.SECONDARY, -0.1)}
        cursor: pointer;
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: white;
        }
        &:active{
            background-color: ${props => colorChanger(props.colors.SECONDARY, -0.1)}
        }
    }
`

const ColorBubble = styled.div`
    width: 10px;
    height: 10px;
    background-color: ${props => props.color};
    margin-left: 20px;
    margin-right: 6px;
    margin-top: 10px;
    margin-bottom: 2px;
    border-radius: 20px;
`

const TimedEvent = styled.div`
    position: absolute;
    width: calc(${props => props.width}% - 26px);
    text-align: center;
    height: ${props => props.height}px;
    background-color: ${props => props.color};
    margin-top: ${props => props.offsetTop}px;
    margin-left: calc(${props => props.offsetLeft}% + 3px);
    margin-right: 3px;
    border-radius: 5px;
    transition: background-color 0.3s linear;
    box-shadow: 0px 1px 2px 0px black;
    &:hover{
        background-color: ${props => colorChanger(props.color, -0.2)}
        cursor: pointer;
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${props => colorChanger(props.color, -0.2)};
        }
        &:active{
            background-color: ${props => colorChanger(props.color, -0.2)}
    }
`

const AllDayEventTitle = styled.p`
    color: ${props => props.color};
    margin: 0;
    font-size: 20px;
    height: 100%;
    padding-top: 2px;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
`

const EventTitle = styled.p`
    color: white;
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

const PositionButtonLeftContainer = styled.div`
    position: absolute;
    top: 5px;
    left: 10px;
`

const PositionButtonRightContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 10px;
`

const HourName = styled.div`
    position: relative;
    width: 10px;
    font-size: 20px;
    word-wrap: break-word;
    color: white;
    margin: auto;
    top: 50%;
    transform: translate(0%, -50%);
`

const QuarterContainer = styled.div`
    width: 100%;
    height: calc(25% - 1px);
    border-bottom: 1px solid ${props => props.colors.BORDER};
    transition: background-color 0.3s linear;
    display: flex;
    &:hover{
        background-color: ${props => colorChanger(props.colors.PRIMARY, -0.1)}
    }

`

const HourSectionsContainer = styled.div`
    width: calc(100% - 20px);
`

const HourNameContainer = styled.div`
    width: 20px;
    background-color: #7A7A7A;
    border-bottom: 1px solid ${props => props.colors.BORDER};
    white-space: pre-line;
`

const HourContainer = styled.div`
    min-height: 180px;
    width: 100%;
    display: flex;
    position: absolute;
    top: ${props => props.offset * 180}px;
`

const Title = styled.p`
    font-size: 25px;
    width: 100%;
    line-height: 50px;
    text-align:center;
    margin: 0;
    color: ${props => props.color};
`

const Text = styled.p`
    font-size: 18px;
    width: 100%;
    line-height: 40px;
    text-align:center;
    margin: 0;
    color: ${props => props.color};
`

const TopBar = styled.div`
    position: relative;
    z-index: 2;
    width: 100vw;
    height: 50px;
    background-color: ${props => props.colors.SECONDARY};
    box-shadow: 0px 2px 5px 0px black;
`

const DayContainer = styled.div`
    position:absolute;
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
    background-color: ${props => props.colors.SECONDARY};
    box-shadow: 0px 2px 10px 0px black;
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoDay = memo(connect(mapStateToProps, mapDispatchToProps)(Day), areEqual)
export default MemoDay;