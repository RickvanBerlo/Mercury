import React, { useEffect, useRef, memo, useState, useCallback } from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import { getEventsOfMonth } from '../stores/events/eventActions';
import { addModel, setModelActive, setModelInactive } from '../stores/models/modelActions';
import { mobilecheck } from '../utils/deviceCheck';
import IconButton from '../components/buttons/dasboard/iconButton';
import languageSelector from '../utils/languageSelector';
import UUID from '../utils/GenerateUUID';
import Event from '../components/event/event';
import colorChanger from '../utils/colorChanger';
import EventPlaceholder from '../components/event/eventPlaceholder';
import Model from '../components/model/model';
import ItemSelector from '../components/itemSelector/itemSelector';
import { useHistory } from "react-router-dom";
import { EventEditPage, EventPage, DayPage } from '../constants/pages';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import NextIcon from 'react-ionicons/lib/MdArrowForward';
import AddIcon from 'react-ionicons/lib/MdAdd';

const DEAD_ZONE_SCROLL = 150;
const MONTH_NAMES = languageSelector().MONTHS;
const DAY_NAMES = languageSelector().DAYS;
const AMOUNT_OF_EVENTS_IN_DAY_CONTAINER = 3;

const Calendar = ({ getEventsOfMonth, events, addModel, setModelActive, setModelInactive, colors }) => {
    const history = useHistory();
    const isPressing = useRef(false);
    const isDragging = useRef(false);
    const direction = useRef(undefined);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const monthContainerPositions = useRef([-100, 0, 100]);
    const changeDateModelId = useRef(UUID());

    const setMonth = (month) => {
        setCurrentMonth(languageSelector().MONTHS.findIndex((name) => name === month));
    }

    const navigateToDayPage = (date) => {
        if (!isDragging.current) {
            //passEvent({});
            //passEventsOfDay(timedEvents, allDayEvents); // bad design
            //setCurrentDay(date.getDate())
            history.push(`calendar/${date.toLocaleDateString("fr-CA")}`);
        }
    }

    const navigateToEventPage = (event) => {
        if (!isDragging.current) {
            //passEvent(event);
            history.push(`calendar/${event.startDate}/events/${event.id}`);
        }
    }

    const pushAnimNextMonth = () => {
        if (direction.current === undefined) {
            direction.current = -1;
            AnimCalendar(direction.current, monthContainerPositions);
        }
    }

    const pushAnimPreviousMonth = () => {
        if (direction.current === undefined) {
            direction.current = 1;
            AnimCalendar(direction.current, monthContainerPositions);
        }
    }

    const setNextMonth = useCallback(() => {
        if (currentMonth === 11) setCurrentYear(currentYear + 1);
        setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    },[setCurrentMonth, currentMonth, setCurrentYear, currentYear]);

    const setPreviousMonth = useCallback(() => {
        if (currentMonth === 0) setCurrentYear(currentYear - 1);
        setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    }, [setCurrentMonth, currentMonth, setCurrentYear, currentYear]);

    useEffect(() => {
        let mouseX = 0;
        let scrollmovement = 0;

        const scroll = (e) => {
            if (e.deltaY > 0) pushAnimNextMonth();
            else pushAnimPreviousMonth();
        }

        const animBegin = (e) => {
            if (e.button === 0) {
                e.preventDefault();
                isPressing.current = true;
                mouseX = mobilecheck() ? e.touches[0].pageX : e.pageX;
            }
        }

        const drag = (e) => {
            if (isPressing.current && e.button === 0) {
                e.preventDefault();
                isDragging.current = true;
                const newMouseX = mobilecheck() ? e.touches[0].pageX : e.pageX;
                const monthContainers = document.getElementsByClassName("monthContainer");
                e.toElement.style.cursor = "grab"
                Array.from(monthContainers).forEach((monthContainer, index) => {
                    monthContainer.style.transition = "none";
                    monthContainer.style.left = `calc(${monthContainerPositions.current[index]}% + ${newMouseX - mouseX}px)`;
                })
                scrollmovement = newMouseX - mouseX;
            }
        }

        const animEnd = (e) => {
            if (isPressing.current && isDragging.current && e.button === 0) {
                e.preventDefault();
                isPressing.current = false;
                direction.current = scrollmovement > DEAD_ZONE_SCROLL ? 1 : scrollmovement < -DEAD_ZONE_SCROLL ? -1 : 0;
                e.toElement.style.cursor = "pointer";
                AnimCalendar(direction.current, monthContainerPositions);
                scrollmovement = 0;
            }
        }

        const transitionEnd = (e) => {
            isDragging.current = false;
            if (e.target.offsetLeft === 0) {
                if (direction.current === 1) setPreviousMonth();
                if (direction.current === -1) setNextMonth();
                direction.current = undefined;
            }
        }

        const calendarNext = document.getElementById("calendar_next");
        const calendarPrev = document.getElementById("calendar_prev");
        const monthContainers = document.getElementsByClassName("monthContainer");
        Array.from(monthContainers).forEach(monthContainer => {
            monthContainer.addEventListener('wheel', scroll, { passive: true });
            monthContainer.addEventListener('mousedown', animBegin, false);
            monthContainer.addEventListener('mousemove', drag, false);
            monthContainer.addEventListener('mouseup', animEnd, false);
            monthContainer.addEventListener('transitionend', transitionEnd, false);
        });
        calendarNext.addEventListener("click", pushAnimNextMonth, false);
        calendarNext.addEventListener("touchend", pushAnimNextMonth, false);
        calendarPrev.addEventListener("click", pushAnimPreviousMonth, false);
        calendarPrev.addEventListener("touchend", pushAnimPreviousMonth, false);
        return () => {
            Array.from(monthContainers).forEach(monthContainer => {
                monthContainer.removeEventListener('wheel', scroll, { passive: true });
                monthContainer.removeEventListener('mousedown', animBegin, false);
                monthContainer.removeEventListener('mousemove', drag, false);
                monthContainer.removeEventListener('mouseup', animEnd, false);
                monthContainer.removeEventListener('transitionend', transitionEnd, false);
            });
            calendarNext.removeEventListener("click", pushAnimNextMonth, false);
            calendarNext.removeEventListener("touchend", pushAnimNextMonth, false);
            calendarPrev.removeEventListener("click", pushAnimPreviousMonth, false);
            calendarPrev.removeEventListener("touchend", pushAnimPreviousMonth, false);
        }
    }, [setNextMonth, setPreviousMonth, getEventsOfMonth]);

    useEffect(() => {
        getEventsOfMonth(new Date(currentYear, currentMonth, 1).toLocaleDateString("fr-CA"))
    }, [currentYear, currentMonth, getEventsOfMonth])

    useEffect(() => {
        EventEditPage.preload();
        EventPage.preload();
        DayPage.preload();
    }, [])

    useEffect(() => {
        addModel(
            changeDateModelId.current,
            <Model
                key={changeDateModelId.current}
                id={changeDateModelId.current}
                title={"selecteer een maand"}
                content={createContent(MONTH_NAMES, setCurrentYear, setMonth, colors,() => { setModelInactive(changeDateModelId.current) })}
            />
        )
    }, [setModelInactive, addModel, setCurrentMonth, setCurrentYear, colors])

    let nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    let prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    let currentMonthDate = new Date(currentYear, currentMonth, 1);
    return (
        <Container colors={colors}>
            <TopBarContainer colors={colors}>
                <FlexContainer>
                    <ButtonYear onClick={() => { setModelActive(changeDateModelId.current) }} onTouchEnd={() => { setModelActive(changeDateModelId.current) }}>
                        <Year color={colors.MAIN}>{currentYear}</Year>
                    </ButtonYear>
                </FlexContainer>
                <FlexContainer>
                    <ButtonMonth onClick={() => { setModelActive(changeDateModelId.current) }} onTouchEnd={() => { setModelActive(changeDateModelId.current) }}>
                        <Month color={colors.MAIN}>{MONTH_NAMES[currentMonth]}</Month>
                    </ButtonMonth>
                </FlexContainer>
                <ButtonContainer>
                    <RightFloat>
                        <IconButton id="calendar_prev" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                        <IconButton id="calendar_next" icon={NextIcon} fontSize="40px" color={colors.DARK_GREEN} />
                    </RightFloat>
                </ButtonContainer>
            </TopBarContainer>
            <DayNamesContainer colors={colors}>
                <DayNames>
                    {getDayNames()}
                </DayNames>
            </DayNamesContainer>

            <AnimationContainer className="monthContainer" left="-100%">
                {createMonth(events, monthContainerPositions.current[0] === 0 ? currentMonthDate : monthContainerPositions.current[0] === 100 ? nextMonthDate : prevMonthDate, navigateToDayPage, navigateToEventPage, colors)}
            </AnimationContainer>
            <AnimationContainer className="monthContainer" left="0%">
                {createMonth(events, monthContainerPositions.current[1] === 0 ? currentMonthDate : monthContainerPositions.current[1] === 100 ? nextMonthDate : prevMonthDate, navigateToDayPage, navigateToEventPage, colors)}
            </AnimationContainer>
            <AnimationContainer className="monthContainer" left="100%">
                {createMonth(events, monthContainerPositions.current[2] === 0 ? currentMonthDate : monthContainerPositions.current[2] === 100 ? nextMonthDate : prevMonthDate, navigateToDayPage, navigateToEventPage, colors)}
            </AnimationContainer>


            <AddButton colors={colors} onClick={() => { history.push(`calendar/${new Date().toLocaleDateString("fr-CA")}/createevent/00:00`); }} onTouchEnd={() => { history.push(`calendar/${new Date().toLocaleDateString("fr-CA")}/createevent/00:00`); }}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container >
    )
}

//content model
const createContent = (months, setYear, setMonth, colors, setModelInactive) => {
    const years = [];
    for (let i = new Date().getFullYear() - 50; i < new Date().getFullYear() + 50; i++) {
        years.push(i);
    }

    return (
        <div>
            <SelectorsContainer>
                <ItemSelector items={years} defaultItem={new Date().getFullYear()} callback={setYear} />
                <Bar />
                <ItemSelector items={months} defaultItem={months[new Date().getMonth()]} callback={setMonth} />
            </SelectorsContainer>
            <BottomBar>
                <Button colors={colors} onClick={setModelInactive} onTouchEnd={setModelInactive}>
                    <ButtonText color={colors.TEXT}>
                        Accepteren
                        </ButtonText>
                </Button>
            </BottomBar>
        </div>
    )
}


//this function handles the animation for the drag functionality
const AnimCalendar = (direction, monthContainerPositions) => {
    const monthContainers = document.getElementsByClassName("monthContainer");
    Array.from(monthContainers).forEach((monthContainer, index) => {
        switch (direction) {
            case 1:
                monthContainer.style.left = `${monthContainerPositions.current[index] + 100}%`;
                if ((monthContainerPositions.current[index] + 100) === 200) {
                    monthContainerPositions.current[index] = -100;
                    monthContainer.style.left = `-100%`;
                    monthContainer.style.transition = "none";
                } else {
                    monthContainerPositions.current[index] += 100;
                    monthContainer.style.transition = "left 0.5s ease-out";
                }
                break;
            case -1:
                monthContainer.style.left = `${monthContainerPositions.current[index] - 100}%`;
                if ((monthContainerPositions.current[index] - 100) === -200) {
                    monthContainerPositions.current[index] = 100;
                    monthContainer.style.left = `100%`;
                    monthContainer.style.transition = "none";
                } else {
                    monthContainerPositions.current[index] -= 100;
                    monthContainer.style.transition = "left 0.5s ease-out";
                }
                break;
            case 0:
                monthContainer.style.left = `${monthContainerPositions.current[index]}%`;
                monthContainer.style.transition = "left 0.5s ease-out";
                break;
            default: console.error("no case was found for " + direction + " in the AnimCalendar function in CalendarPage!");

        }
    })
}

//creating the header names
const getDayNames = () => {
    let names = [];
    for (let i = 0; i < DAY_NAMES.length; i++) {
        names.push(<DateName key={UUID()}>{DAY_NAMES[i]}</DateName>)
    }
    return names;
}


//creates day squares in the calendar
const createMonth = (events, currentDate, navigateToDayPage, navigateToEventPage, colors) => {
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    firstDayOfMonth.setDate(-firstDayOfMonth.getDay() + 1);
    let weeks = [];
    for (let i = 0; i < 6; i++) {
        weeks.push(
            <WeekContainer key={firstDayOfMonth.toLocaleDateString("fr-CA") + "_weekContainer"}>
                {createWeek(events, firstDayOfMonth, currentDate.getMonth(), navigateToDayPage, navigateToEventPage, colors)}
                {createWeekDate(firstDayOfMonth, colors)}
            </WeekContainer>
        )
    }
    return (
        <MonthContainer key={currentDate.toLocaleDateString("fr-CA") + "_monthContainer"}>
            {weeks}
        </MonthContainer>
    )
}

const createWeekDate = (selectedDate, colors) => {
    return (
        <WeekDate>
            {getCorrectWeekNumber(selectedDate, colors)}
        </WeekDate>)
}

const getCorrectWeekNumber = (now) => {
    let onejan = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const createWeek = (events, firstDayOfWeek, month, navigateToDayPage, navigateToEventPage, colors) => {
    return (
        <DaysContainer key={firstDayOfWeek.toLocaleDateString("fr-CA") + "_container"}>
            {createDays(events, firstDayOfWeek, month, navigateToDayPage, navigateToEventPage, colors)}
        </DaysContainer>
    )
}

const createDays = (events, firstDayOfWeek, month, navigateToDayPage, navigateToEventPage, colors) => {
    const days = [];
    const date = new Date();
    const today = date.toLocaleDateString('nl');
    for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek);
        const dayEventsObj = events[firstDayOfWeek.toLocaleDateString("fr-CA")];
        let amountofEvents = dayEventsObj === undefined ? 0 : dayEventsObj.offset;
        const navigate = () => { navigateToDayPage(date) }
        //make day
        days.push(
            <Day
                colors={colors}
                key={date.toLocaleDateString("fr-CA")}
                onClick={() => { navigateToDayPage(date) }}
                onTouchEnd={() => { navigateToDayPage(date) }}>
                {dayEventsObj !== undefined && dayEventsObj.allDayEvents.map((event, index) => {
                    if (event.startDate === firstDayOfWeek.toLocaleDateString("fr-CA") || date.getDay() === 0) {
                        if (amountofEvents < AMOUNT_OF_EVENTS_IN_DAY_CONTAINER) { amountofEvents++; return <Event key={event.id} index={amountofEvents} offset={dayEventsObj.offset} placedDate={firstDayOfWeek.toLocaleDateString("fr-CA")} props={event} navigateToEventPage={() => { navigateToEventPage(event) }} /> }
                        else if (amountofEvents === AMOUNT_OF_EVENTS_IN_DAY_CONTAINER) { amountofEvents++; return <EventPlaceholder index={amountofEvents} key={date.toLocaleDateString("fr-CA") + "_placeholder"} offset={dayEventsObj.offset} navigateToDayPage={navigate} /> }
                        else return null;
                    }
                    return null;
                })}
                {dayEventsObj !== undefined && dayEventsObj.timedEvents.map((event, index) => {
                    if (amountofEvents < AMOUNT_OF_EVENTS_IN_DAY_CONTAINER) { amountofEvents++; return <Event key={event.id} index={amountofEvents} offset={dayEventsObj.offset} placedDate={firstDayOfWeek.toLocaleDateString("fr-CA")} props={event} navigateToEventPage={() => { navigateToEventPage(event) }} /> }
                    else if (amountofEvents === AMOUNT_OF_EVENTS_IN_DAY_CONTAINER) { amountofEvents++; return <EventPlaceholder index={amountofEvents} key={date.toLocaleDateString("fr-CA")} offset={dayEventsObj.offset} navigateToDayPage={navigate} /> }
                    else return null;
                })}
                <DayNumber
                    colors={colors}
                    today={firstDayOfWeek.toLocaleDateString('nl') === today ? true : false}
                    toggle={firstDayOfWeek.getMonth() === month ? true : false}>
                    {firstDayOfWeek.getDate()}
                </DayNumber>
            </Day>
        )
        //increase day
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
    }
    return days;
}

//end square creation

const mapStateToProps = state => {
    return { 
        events: state.eventReducer.events,
        colors: state.preferencesReducer.colors     
    };
};

const mapDispatchToProps = {
    getEventsOfMonth,
    addModel,
    setModelActive,
    setModelInactive,
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-color: ${props => props.colors.PRIMARY}
`

const SelectorsContainer = styled.div`
    height: calc(100% - 120px);
    width: 100%;
    display: flex;
`

const BottomBar = styled.div`
    width: 100%;
    height: 50px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

const Bar = styled.div`
    width: 10px;
`
const Button = styled.div`
    margin: auto;
    width: 80%;
    height: 40px;
    margin-top: 10px;
    box-shadow: inset 0px 0px 10px 10px ${props => props.colors.SECONDARY};
    transition: background-color 0.3s linear;
    &:hover{
        background-color: ${props => colorChanger(props.colors.SECONDARY, -0.1)};
        cursor: pointer;
    }
    &:active{
        background-color: ${props => colorChanger(props.colors.SECONDARY, -0.2)};
    }
`

const ButtonText = styled.p`
    margin: 0;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    color: ${props => props.color}
`

const TopBarContainer = styled.div`
    height: 50px;
    width: 100vw;
    text-align: center;
    display: flex;
    background-color: ${props => props.colors.SECONDARY}
`

const Month = styled.p`
    color: ${props => props.color};
    line-height: 50px;
    font-size: 25px;
    user-select: none;
    margin: 0;
    &:hover{
        cursor: pointer;
    }
`

const RightFloat = styled.div`
    float: right;
    display: flex;
    margin-top: 10px;
    margin-right: 5%;
`

const Year = styled.p`
    color: ${props => props.color};
    line-height: 50px;
    font-size: 25px;
    user-select: none;
    margin: 0;
    &:hover{
        cursor: pointer;
    }
`
const FlexContainer = styled.div`
    flex: 1;
`
const ButtonMonth = styled.div`
    margin: auto;
    width: fit-content;
`
const ButtonYear = styled.div`
    width: fit-content;
    margin-left: 20px;
`

const DayNamesContainer = styled.div`
    position: relative;
    z-index: 1;
    height: 40px;
    width: 100vw;
    background-color: ${props => props.colors.SECONDARY};
    box-shadow: 0px 2px 2px 0px black;
`

const DayNames = styled.div`
    height: 100%;
    display: flex;
    width: calc(100vw - 15px);
`

const DateName = styled.p`
    color: gray;
    user-select: none;
    line-height: 40px;
    font-size: ${mobilecheck() ? "10px" : "18px"};
    flex: 1;
    margin: 0;
`

const WeekDate = styled.p`
    padding-top: 5px;
    color: white;
    font-size: 18px;
    user-select: none;
    word-wrap: break-word;
    white-space: pre-line;
    margin: 0;
    width: 15px;
    background-color: gray;
    
`

const WeekContainer = styled.div`
    display: flex;
    flex: 1;
`

const DaysContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`

const AddButton = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 20px;
    right: 30px;
    border-radius: 100px;
    background-color: ${props => props.colors.SECONDARY};
    box-shadow: 0px 2px 10px 0px black;
`

const Day = styled.div`
    border: 0.5px solid ${props => props.colors.BORDER};
    flex: 1;
    position: relative;
    transition: background-color 0.3s linear;
    cursor: pointer;
`

const DayNumber = styled.p`
    user-select: none;
    position: absolute;
    bottom: 2px;
    right: 5px;
    margin: 0;
    color: ${props => props.toggle ? props.today ? "white" : props.colors.TEXT : "#78787850"}
    background-color: ${props => props.today ? props.colors.MAIN : props.colors.PRIMARY};
    padding: 1px 3px;
    border-radius: 10px;
`

const ButtonContainer = styled.div`
    flex: 1;
`

const MonthContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
`

const AnimationContainer = styled.div`
    position: fixed;
    left: ${props => props.left};
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoCalendar = memo(connect(mapStateToProps, mapDispatchToProps)(Calendar), areEqual)
export default MemoCalendar;