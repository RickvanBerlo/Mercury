import React, { useEffect, useReducer, useRef, memo } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';
import IconButton from '../components/buttons/dasboard/iconButton';
import languageSelector from '../utils/languageSelector';
import { pageNames } from '../constants/pages';
import MonthSelector from '../components/monthSelector/monthSelector';
import UUID from '../utils/GenerateUUID';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import NextIcon from 'react-ionicons/lib/MdArrowForward';
import AddIcon from 'react-ionicons/lib/MdAdd';

const DEAD_ZONE_SCROLL = 150;
const ANIM_TIME = 520;
const MONTH_NAMES = languageSelector().MONTHS;
const DAY_NAMES = languageSelector().DAYS;

const reducer = (state, action) => {
    let date;
    switch (action.type) {
        case 'nextMonth':
            date = state.currentDate.getDate()
            if (date > 29)
                state.currentDate.setDate(date - 5);
            state.currentDate.setMonth(state.currentDate.getMonth() + 1);
            return { ...state };
        case 'prevMonth':
            date = state.currentDate.getDate()
            if (date > 29)
                state.currentDate.setDate(date - 5);
            state.currentDate.setMonth(state.currentDate.getMonth() - 1);
            return { ...state };
        case 'newMonth':
            return { ...state, monthSelectorToggle: false, currentDate: new Date(action.year, action.month, 1) };
        case 'openMonthSelector':
            return { ...state, monthSelectorToggle: true }
        default:
            throw new Error();
    }
}

const Calendar = ({ storage, setCurrentPage, selectedDay = new Date() }) => {
    const isPressing = useRef(false);
    const isDragging = useRef(false);
    let mouseX = 0;
    let scrollmovement = 0;
    const monthContainerPositions = useRef([-100, 0, 100]);
    let timeout = useRef(null);
    const initialState = (selectedDay) => {
        if (selectedDay.getDate() > 29)
            selectedDay.setDate(selectedDay.getDate() - 3);
        return ({
            currentDate: selectedDay,
            monthSelectorToggle: null,
        })
    };

    const [state, dispatch] = useReducer(reducer, initialState(selectedDay));

    const navigateToDayPage = (day) => {
        if (timeout.current === null)
            setCurrentPage(pageNames.DAY, { selectedDay: day });
    }

    const scroll = (e) => {
        if (e.deltaY > 0) goToNextMonth();
        else goToPreviousMonth();
    }

    const goToNextMonth = () => {
        if (timeout.current === null) {
            AnimCalendar(-1, monthContainerPositions);
            timeout.current = setTimeout(() => { dispatch({ type: "nextMonth" }); timeout.current = null; }, ANIM_TIME);
        }
    }

    const goToPreviousMonth = () => {
        if (timeout.current === null) {
            AnimCalendar(1, monthContainerPositions);
            timeout.current = setTimeout(() => { dispatch({ type: "prevMonth" }); timeout.current = null; }, ANIM_TIME);
        }
    }

    const animBegin = (e) => {
        e.preventDefault();
        isPressing.current = true;
        mouseX = mobilecheck() ? e.touches[0].pageX : e.pageX;
    }

    const drag = (e) => {
        e.preventDefault();
        if (isPressing.current) {
            isDragging.current = true;
            const newMouseX = mobilecheck() ? e.touches[0].pageX : e.pageX;
            const monthContainers = document.getElementsByClassName("monthContainer");
            Array.from(monthContainers).forEach((monthContainer, index) => {
                monthContainer.style.transition = "none";
                monthContainer.style.left = `calc(${monthContainerPositions.current[index]}% + ${newMouseX - mouseX}px)`;
            })
            scrollmovement = newMouseX - mouseX;
        }
    }

    const animEnd = (e) => {
        e.preventDefault();
        if (isPressing.current && isDragging.current) {
            isPressing.current = false;
            isDragging.current = false;
            const direction = scrollmovement > DEAD_ZONE_SCROLL ? 1 : scrollmovement < -DEAD_ZONE_SCROLL ? -1 : 0;
            AnimCalendar(direction, monthContainerPositions);
            scrollmovement = 0;
            timeout.current = setTimeout(() => {
                if (direction === 1) dispatch({ type: "prevMonth" });
                if (direction === -1) dispatch({ type: "nextMonth" })
                timeout.current = null;
            }, ANIM_TIME);
        }
    }

    const CallbackMonthSelector = (newYear, newMonth) => {
        dispatch({ type: "newMonth", month: newMonth, year: newYear })
    }


    useEffect(() => {
        console.log(storage.shared.events);
        const calendarNext = document.getElementById("calendar_next");
        const calendarPrev = document.getElementById("calendar_prev");
        const monthContainers = document.getElementsByClassName("monthContainer");
        Array.from(monthContainers).forEach(monthContainer => {
            monthContainer.addEventListener('wheel', scroll, false);
            monthContainer.addEventListener('mousedown', animBegin, false);
            monthContainer.addEventListener('mousemove', drag, false);
            monthContainer.addEventListener('mouseup', animEnd, false);
        });
        calendarNext.addEventListener("click", goToNextMonth, false);
        calendarNext.addEventListener("touchend", goToNextMonth, false);
        calendarPrev.addEventListener("click", goToPreviousMonth, false);
        calendarPrev.addEventListener("touchend", goToPreviousMonth, false);
        // monthContainer.addEventListener("touchstart", startDrag, false);
        // monthContainer.addEventListener("touchmove", moveDrag, false);
        // window.addEventListener("touchend", endDrag, false);
        return () => {
            Array.from(monthContainers).forEach(monthContainer => {
                monthContainer.removeEventListener('wheel', scroll, false);
                monthContainer.removeEventListener('mousedown', animBegin, false);
                monthContainer.removeEventListener('mousemove', drag, false);
                monthContainer.removeEventListener('mouseup', animEnd, false);
            });
            calendarNext.removeEventListener("click", goToNextMonth, false);
            calendarNext.removeEventListener("touchend", goToNextMonth, false);
            calendarPrev.removeEventListener("click", goToPreviousMonth, false);
            calendarPrev.removeEventListener("touchend", goToPreviousMonth, false);
            // monthContainer.removeEventListener("touchstart", startDrag, false);
            // monthContainer.removeEventListener("touchmove", moveDrag, false);
            // window.removeEventListener("touchend", endDrag, false);
        }
    }, []);

    let nextMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() + 1, state.currentDate.getDate());
    let prevMonth = new Date(state.currentDate.getFullYear(), state.currentDate.getMonth() - 1, state.currentDate.getDate());

    return (
        <Container>
            <MonthSelector enable={state.monthSelectorToggle} currentMonth={state.currentDate.getMonth()} currentYear={state.currentDate.getFullYear()} callback={CallbackMonthSelector} />
            <TopBarContainer>
                <FlexContainer>
                    <ButtonYear onClick={() => { dispatch({ type: "openMonthSelector" }) }} onTouchEnd={() => { dispatch({ type: "openMonthSelector" }) }}>
                        <Year>{state.currentDate.getFullYear()}</Year>
                    </ButtonYear>
                </FlexContainer>
                <FlexContainer>
                    <ButtonMonth onClick={() => { dispatch({ type: "openMonthSelector" }) }} onTouchEnd={() => { dispatch({ type: "openMonthSelector" }) }}>
                        <Month>{MONTH_NAMES[state.currentDate.getMonth()]}</Month>
                    </ButtonMonth>
                </FlexContainer>
                <ButtonContainer>
                    <RightFloat>
                        <IconButton id="calendar_prev" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                        <IconButton id="calendar_next" icon={NextIcon} fontSize="40px" color={colors.DARK_GREEN} />
                    </RightFloat>
                </ButtonContainer>
            </TopBarContainer>
            <DayNamesContainer>
                <DayNames>
                    {getDayNames()}
                </DayNames>
            </DayNamesContainer>

            <AnimationContainer className="monthContainer" left="-100%">
                {createMonth(monthContainerPositions.current[0] === 0 ? state.currentDate : monthContainerPositions.current[0] === 100 ? nextMonth : prevMonth, navigateToDayPage)}
            </AnimationContainer>
            <AnimationContainer className="monthContainer" left="0%">
                {createMonth(monthContainerPositions.current[1] === 0 ? state.currentDate : monthContainerPositions.current[1] === 100 ? nextMonth : prevMonth, navigateToDayPage)}
            </AnimationContainer>
            <AnimationContainer className="monthContainer" left="100%">
                {createMonth(monthContainerPositions.current[2] === 0 ? state.currentDate : monthContainerPositions.current[2] === 100 ? nextMonth : prevMonth, navigateToDayPage)}
            </AnimationContainer>


            <AddButton onClick={() => { setCurrentPage(pageNames.EVENT); }} onTouchEnd={() => { setCurrentPage(pageNames.EVENT); }}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container >
    )
}

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
        }
    })
}

const getDayNames = () => {
    let names = [];
    for (let i = 0; i < DAY_NAMES.length; i++) {
        names.push(<DateName key={UUID()}>{DAY_NAMES[i]}</DateName>)
    }
    return names;
}

const createMonth = (currentDate, callback) => {
    let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    firstDayOfMonth.setDate(-firstDayOfMonth.getDay() + 1);
    let weeks = [];
    for (let i = 0; i < 6; i++) {
        weeks.push(
            <WeekContainer key={UUID()}>
                {createWeek(firstDayOfMonth, currentDate.getMonth(), callback)}
                {createWeekDate(firstDayOfMonth)}
            </WeekContainer>
        )
    }
    return (
        <MonthContainer key={UUID()}>
            {weeks}
        </MonthContainer>
    )
}

const createWeekDate = (selectedDate) => {
    return (
        <WeekDate>
            {getCorrectWeekNumber(selectedDate)}
        </WeekDate>)
}

const getCorrectWeekNumber = (now) => {
    let onejan = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const createWeek = (firstDayOfWeek, month, callback) => {
    return (
        <DaysContainer>
            {createDays(firstDayOfWeek, month, callback)}
        </DaysContainer>
    )
}

const createDays = (firstDayOfWeek, month, callback) => {
    let days = [];
    const date = new Date();
    const today = date.toLocaleDateString('nl');
    for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek);
        days.push(
            <Day
                key={UUID()}
                onClick={() => { callback(date) }}
                onTouchEnd={() => { callback(date) }}>
                <DayNumber
                    today={firstDayOfWeek.toLocaleDateString('nl') === today ? true : false}
                    toggle={firstDayOfWeek.getMonth() === month ? true : false}>
                    {firstDayOfWeek.getDate()}
                </DayNumber>
            </Day>
        )
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
    }
    return days;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const TopBarContainer = styled.div`
    height: 50px;
    width: calc(100vw - 15px);
    background-color: ${colors.WHITE};
    text-align: center;
    display: flex;
`

const Month = styled.p`
    color: ${colors.DARK_GREEN};
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
`

const Year = styled.p`
    color: ${colors.DARK_GREEN};
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
    background-color: ${colors.WHITE};
    box-shadow: 0 4px 2px -2px gray;
`

const DayNames = styled.div`
    height: 100%;
    display: flex;
    width: calc(100vw - 15px);
    background-color: ${colors.WHITE};
`

const DateName = styled.p`
    color: ${colors.GRAY};
    user-select: none;
    line-height: 40px;
    font-size: ${mobilecheck() ? "10px" : "18px"};
    flex: 1;
    margin: 0;
`

const WeekDate = styled.p`
    padding-top: 5px;
    color: ${colors.WHITE};
    font-size: 18px;
    user-select: none;
    word-wrap: break-word;
    white-space: pre-line;
    margin: 0;
    width: 15px;
    background-color: ${colors.GRAY}
    
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
    z-index: 3;
    bottom: 20px;
    right: 30px;
    border-radius: 100px;
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 10px 0px ${colors.BLACK};
`

const Day = styled.div`
    border: 0.5px solid ${colors.LIGHT_GRAY};
    flex: 1;
    position: relative;
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

const DayNumber = styled.p`
    user-select: none;
    position: absolute;
    bottom: 2px;
    right: 5px;
    margin: 0;
    color: ${props => props.toggle ? props.today ? colors.WHITE : colors.BLACK : colors.LIGHT_GRAY}
    background-color: ${props => props.today ? colors.DARK_GREEN : colors.WHITE};
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
    if (prevProps.selectedDay === undefined) return true;
    if (prevProps.selectedDay === nextProps.selectedDay) return true;
    return false;
}

const MemoCalendar = memo(Calendar, areEqual);
export default MemoCalendar;