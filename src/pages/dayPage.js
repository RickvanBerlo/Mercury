import React, { useEffect, useCallback, memo } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
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

const Day = ({ events }) => {
    const history = useHistory();
    const { date } = useParams();
    const allDayEvents = getAllDayEvents(date, events);

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
        <Container>
            <TopBar>
                <Title>{date}</Title>
                <PositionButtonLeftContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonLeftContainer>
                <PositionButtonRightContainer>
                    <ToggleIconButton id="showAllDay" iconOne={EyeIcon} iconTwo={EyeOffIcon} callback={ToggleShowAllDay} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonRightContainer>
            </TopBar>
            <AllDayContainer id={"allDayContainer"}>
                {placeAllDayEvents(allDayEvents, goToEvent, date)}
            </AllDayContainer>
            <DayContainer id={"dayContainer"}>
                {createDayGrid(click)}
                {placeTimedEvents(objectIsEmpty(events) ? [] : events[date].timedEvents, goToEvent)}
                <CurrentTime />
            </DayContainer>
            <AddButton onClick={(e) => {goToEventEdit()}} onTouchEnd={(e) => {goToEventEdit()}}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container>
    )
}

const getAllDayEvents = (dateOfDay, events) => {
    if (objectIsEmpty(events)) return [];
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

const createDayGrid = (click) => {
    let array = [];

    for (let i = 0; i < 24; i++) {
        array.push(
            <HourContainer key={UUID()} offset={i}>
                <HourSectionsContainer>
                    {createQuarterContainers(i, click)}
                </HourSectionsContainer>
                <HourNameContainer>
                    <HourName>{i < 10 ? "0" + i + "..00" : i + "..00"}</HourName>
                </HourNameContainer>
            </HourContainer>
        )
    }
    return array;
}

const createQuarterContainers = (hour, click) => {
    let containers = [];
    for (let i = 0; i < 4; i++) {
        containers.push(
            <QuarterContainer key={ParseTimeToString(hour, i)} id={ParseTimeToString(hour, i)} onClick={(e) => { click(e, ParseTimeToString(hour, i)) }} onTouchEnd={(e) => { click(e, ParseTimeToString(hour, i)) }}>
            </QuarterContainer>
        )
    }
    return containers;
}

const placeTimedEvents = (events, goToEvent) => {
    let eventComponents = [];
    events.sort(sortEventsOnTime)
    for (let i = 0; i < events.length; i++) {
        const placement = caclulatePositionOfEvent(events, events[i]);
        eventComponents.push(<TimedEvent key={UUID()} className="event" color={events[i].color} offsetLeft={placement.offsetLeft} offsetTop={placement.offsetTop} width={placement.width} height={placement.height} onClick={(e) => { goToEvent(e, events[i]) }} onTouchEnd={(e) => { goToEvent(e, events[i]) }}> <EventTitle>{events[i].title}</EventTitle></TimedEvent >)
    }
    return eventComponents;
}

const sortEventsOnTime = (first, second) => {
    return diffBetweenTime(second.startTime, first.startTime)
}

const placeAllDayEvents = (events, goToEvent, selectedDay) => {
    let eventComponents = [];

    for (let i = 0; i < events.length; i++) {
        eventComponents.push(
            <AllDayEvent key={events[i].id} onClick={(e) => { goToEvent(e, events[i]) }} onTouchEnd={(e) => { goToEvent(e, events[i]) }}>
                <ColorBubble color={events[i].color}></ColorBubble>
                <AllDayEventTitle>{events[i].title} ({datediff(events[i].startDate, selectedDay) + 1}/{datediff(events[i].startDate, events[i].endDate) + 1})</AllDayEventTitle>
            </AllDayEvent>
        )
    }
    if (eventComponents.length === 0) {
        eventComponents.push(<Text key={UUID()}>geen events gevonden...</Text>)
    }

    return eventComponents;
}

const diffBetweenTime = (startTime, endTime) => {
    const start = startTime.split(':');
    const end = endTime.split(':');
    return ((parseInt(end[0]) * 60) + (parseInt(end[1]))) - ((parseInt(start[0]) * 60) + (parseInt(start[1])));
}

const caclulatePositionOfEvent = (events, event) => {
    let offsetTop = diffBetweenTime("00:00", event.startTime) * 3;
    let offsetLeft = undefined;
    let height = diffBetweenTime(event.startTime, event.endTime) * 3;
    if (height < 25) height = 25;
    let width = undefined;

    const collisionEvents = events.filter((storedEvent) => {
        //top half
        if (event.startTime.localeCompare(storedEvent.startTime) < 0 && event.endTime.localeCompare(storedEvent.startTime) > 0) return true;
        //bottom half
        else if (event.startTime.localeCompare(storedEvent.endTime) < 0 && event.endTime.localeCompare(storedEvent.endTime) > 0) return true;
        //inside
        else if (event.startTime.localeCompare(storedEvent.startTime) > 0 && event.endTime.localeCompare(storedEvent.endTime) < 0) return true;
        //outside
        else if (event.startTime.localeCompare(storedEvent.startTime) < 0 && event.endTime.localeCompare(storedEvent.endTime) > 0) return true;
        //same
        else if (event.startTime.localeCompare(storedEvent.startTime) === 0 && event.endTime.localeCompare(storedEvent.endTime) === 0) return true;
        else return false;
    }).sort((eventA, eventB) => {
        return eventA.startTime.localeCompare(eventB.startTime);
    });
    width = 100 / collisionEvents.length;
    collisionEvents.forEach((storedEvent, index) => {
        if (storedEvent.id === event.id) offsetLeft = width * index;
    })
    return { offsetTop, offsetLeft, height, width };
}

const mapStateToProps = state => {
    return {
        events: state.eventReducer.events,
    };
};

const mapDispatchToProps = {
}


const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const AllDayContainer = styled.div`
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    box-shadow: 0px 3px 6px -1px ${colors.BLACK};
    z-index: 1;
    max-height: 0;
    overflow: hidden;
    background-color: ${colors.WHITE};
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
    box-shadow: inset 0px 0px 5px 5px ${colors.WHITE};
    &:hover{
        background-color: ${colorChanger(colors.LIGHT_GRAY, -0.2)}
        cursor: pointer;
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colors.WHITE};
        }
        &:active{
            background-color: ${colorChanger(colors.LIGHT_GRAY, -0.2)}
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
    box-shadow: 0px 1px 2px 0px ${colors.BLACK};
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
    color: ${colors.BLACK}
    margin: 0;
    font-size: 20px;
    height: 100%;
    padding-top: 2px;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
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
    &:hover{
        background-color: ${colors.LIGHT_GRAY}
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
    color: ${colors.DARK_GREEN};
`

const Text = styled.p`
    font-size: 18px;
    width: 100%;
    line-height: 40px;
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
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 10px 0px ${colors.BLACK};
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoDay = memo(connect(mapStateToProps, mapDispatchToProps)(Day), areEqual)
export default MemoDay;