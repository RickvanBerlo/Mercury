import React, { useEffect, useReducer, useRef } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';
import { easings, tween } from '../utils/scrollAnimation';
import screenResolution from '../utils/screenResolution';
import IconButton from '../components/buttons/dasboard/iconButton';
import languageSelector from '../utils/languageSelector';
import { pageNames } from '../constants/pages';
import MonthSelector from '../components/monthSelector/monthSelector';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import NextIcon from 'react-ionicons/lib/MdArrowForward';

const initialState = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selectedDate: new Date(),
    monthNames: languageSelector().MONTHS,
    dayNames: languageSelector().DAYS,
    months: null,
    monthSelectorToggle: null,
};
const initMonths = 24;
const initDeadZoneScroll = 0.2;

const reducer = (state, action) => {
    switch (action.type) {
        case 'nextMonth':
            state.selectedDate.setMonth(state.selectedDate.getMonth() + 1);
            return { ...state, currentMonth: state.selectedDate.getMonth(), currentYear: state.selectedDate.getFullYear() };
        case 'prevMonth':
            state.selectedDate.setMonth(state.selectedDate.getMonth() - 1);
            return { ...state, currentMonth: state.selectedDate.getMonth(), currentYear: state.selectedDate.getFullYear() };
        case 'createMonths':
            return { ...state, months: createAllMonths(new Date().getFullYear(), new Date().getMonth(), action.navigateToDayPage) }
        case 'newMonth':
            return { ...state, months: createAllMonths(action.year, action.month, action.navigateToDayPage), currentYear: action.year, currentMonth: action.month, monthSelectorToggle: false, selectedDate: new Date(action.year, action.month, 1) };
        case 'openMonthSelector':
            return { ...state, monthSelectorToggle: true }
        default:
            throw new Error();
    }
}

const Calendar = ({ setCurrentPage }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const isAnimRunning = useRef(false);
    const isDragging = useRef(false);
    const isPressing = useRef(false);
    let width = window.innerWidth;
    let mouseX = null;
    let currentposition = initMonths / 2;

    const scroll = (e) => {
        if (e.deltaY > 0) nextMonth();
        else previousMonth();
    }

    const nextMonth = () => {
        if (!isAnimRunning.current) {
            const monthContainer = document.getElementById("monthsContainer");
            if (monthContainer.scrollLeft !== (width * (initMonths - 1))) {
                isAnimRunning.current = true;
                tween(monthContainer.scrollLeft, monthContainer.scrollLeft + width, 500, easings.easeInOutCubic, monthContainer, () => { isAnimRunning.current = false; dispatch({ type: 'nextMonth' }) });
            }
        }
    }

    const previousMonth = () => {
        if (!isAnimRunning.current) {
            const monthContainer = document.getElementById("monthsContainer");
            if (monthContainer.scrollLeft !== 0) {
                isAnimRunning.current = true;
                tween(monthContainer.scrollLeft, monthContainer.scrollLeft - width, 500, easings.easeInOutCubic, monthContainer, () => { isAnimRunning.current = false; dispatch({ type: 'prevMonth' }) });
            }
        }
    }

    const startDrag = (e) => {
        e.preventDefault();
        const monthContainer = document.getElementById("monthsContainer");
        currentposition = Math.round(monthContainer.scrollLeft / width);
        mouseX = mobilecheck() ? e.touches[0].pageX : e.pageX;
        isPressing.current = true;
    }

    const moveDrag = (e) => {
        e.preventDefault();
        if (isPressing.current) {
            isDragging.current = true;
            const monthContainer = document.getElementById("monthsContainer");

            const newMouseX = mobilecheck() ? e.touches[0].pageX : e.pageX;
            monthContainer.scrollLeft = monthContainer.scrollLeft + (mouseX - newMouseX);
            mouseX = newMouseX;
        }
    }

    const endDrag = (e) => {
        e.preventDefault();
        if (isPressing.current && isDragging.current) {
            const monthContainer = document.getElementById("monthsContainer");
            let direction = null;
            let nextposition = currentposition;
            if ((monthContainer.scrollLeft / width) - currentposition > initDeadZoneScroll) direction = true;
            if ((monthContainer.scrollLeft / width) - currentposition < -initDeadZoneScroll) direction = false;
            if (direction != null) direction ? nextposition += 1 : nextposition -= 1;
            currentposition = nextposition;
            tween(
                monthContainer.scrollLeft,
                nextposition * width, 500,
                easings.easeOutCubic,
                monthContainer,
                () => {
                    isAnimRunning.current = false;
                    if (direction != null)
                        dispatch({ type: direction ? 'nextMonth' : 'prevMonth' })
                }
            );
            isPressing.current = false;
            isDragging.current = false;
        }
    }

    const changeWidth = () => {
        width = window.innerWidth;
        const monthContainer = document.getElementById("monthsContainer");
        monthContainer.scrollLeft = (currentposition * width);
    }

    const navigateToDayPage = (day) => {
        if (!isDragging.current) {
            setCurrentPage(pageNames.HOME);
        }
    }

    const CallbackMonthSelector = (newYear, newMonth) => {
        dispatch({ type: "newMonth", month: newMonth, year: newYear, navigateToDayPage: navigateToDayPage })
    }


    useEffect(() => {
        const calendarNext = document.getElementById("calendar_next");
        const calendarPrev = document.getElementById("calendar_prev");
        const monthContainer = document.getElementById("monthsContainer");
        monthContainer.addEventListener('wheel', scroll, false);
        calendarNext.addEventListener("click", nextMonth, false);
        calendarNext.addEventListener("touchend", nextMonth, false);
        calendarPrev.addEventListener("click", previousMonth, false);
        calendarPrev.addEventListener("touchend", previousMonth, false);
        monthContainer.addEventListener("touchstart", startDrag, false);
        monthContainer.addEventListener("touchmove", moveDrag, false);
        window.addEventListener("touchend", endDrag, false);
        window.addEventListener('resize', changeWidth, false);
        dispatch({ type: 'createMonths', navigateToDayPage: navigateToDayPage })
        return () => {
            monthContainer.removeEventListener('wheel', scroll, false);
            calendarNext.removeEventListener("click", nextMonth, false);
            calendarNext.removeEventListener("touchend", nextMonth, false);
            calendarPrev.removeEventListener("click", previousMonth, false);
            calendarPrev.removeEventListener("touchend", previousMonth, false);
            monthContainer.removeEventListener("touchstart", startDrag, false);
            monthContainer.removeEventListener("touchmove", moveDrag, false);
            window.removeEventListener("touchend", endDrag, false);
            window.removeEventListener('resize', changeWidth, false);
        }
    }, []);

    useEffect(() => {
        const monthContainer = document.getElementById("monthsContainer");
        monthContainer.scrollLeft = width * (initMonths / 2);
    }, [state.months])

    return (
        <Container>
            <MonthSelector enable={state.monthSelectorToggle} currentMonth={state.currentMonth} currentYear={state.currentYear} callback={CallbackMonthSelector} />
            <TopBarContainer>
                <FlexContainer>
                    <ButtonYear onClick={() => { dispatch({ type: "openMonthSelector" }) }} onTouchEnd={() => { dispatch({ type: "openMonthSelector" }) }}>
                        <Year>{state.currentYear}</Year>
                    </ButtonYear>
                </FlexContainer>
                <FlexContainer>
                    <ButtonMonth onClick={() => { dispatch({ type: "openMonthSelector" }) }} onTouchEnd={() => { dispatch({ type: "openMonthSelector" }) }}>
                        <Month>{state.monthNames[state.currentMonth]}</Month>
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
                    {getDayNames(state)}
                </DayNames>
            </DayNamesContainer>
            <MonthsContainer id="monthsContainer">
                {state.months}
            </MonthsContainer>
        </Container >
    )
}

const getDayNames = (state) => {
    let names = [];
    for (let i = 0; i < state.dayNames.length; i++) {
        names.push(<DateName key={i}>{state.dayNames[i]}</DateName>)
    }
    return names;
}

const createAllMonths = (currentYear, currentMonth, callback) => {
    let months = [];
    let firstDayOfSelectedYearAndMonth = new Date(currentYear, currentMonth, 1);
    firstDayOfSelectedYearAndMonth.setMonth(firstDayOfSelectedYearAndMonth.getMonth() - initMonths / 2);
    for (let i = -initMonths / 2; i < initMonths / 2; i++) {
        months.push(
            <MonthContainer key={i}>
                <DaysContainer>
                    {createMonth(firstDayOfSelectedYearAndMonth, callback)}
                </DaysContainer>
                <WeekDates>
                    {createWeekDates(firstDayOfSelectedYearAndMonth)}
                </WeekDates>
            </MonthContainer>
        )
        firstDayOfSelectedYearAndMonth.setMonth(firstDayOfSelectedYearAndMonth.getMonth() + 1);
    }
    return months;
}

const createWeekDates = (selectedDate) => {
    let weekDates = [];
    let firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    for (let i = 0; i < 6; i++) {
        weekDates.push(<WeekDate key={i}>{getCorrectWeekNumber(firstDay)}</WeekDate>);
        firstDay.setDate(firstDay.getDate() + 7);
    }
    return weekDates;
}

const getCorrectWeekNumber = (now) => {
    let onejan = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const createMonth = (selectedDate, callback) => {
    let grid = [];
    let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const month = selectedDate.getMonth();
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
    for (let i = 0; i < 6; i++) {
        grid.push(
            <WeekContainer key={i}>
                {createDays(firstDayOfMonth, month, callback)}
            </WeekContainer>
        )
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 7);
    }
    return grid;
}

const createDays = (begin, month, callback) => {
    let days = [];
    let firstDayOfThisWeek = new Date(begin);
    let today = new Date().toLocaleDateString('nl');

    for (let i = 0; i < 7; i++) {
        let day = firstDayOfThisWeek.getDate();
        days.push(<Day key={i} onClick={() => { callback(firstDayOfThisWeek) }} onTouchEnd={() => { callback(firstDayOfThisWeek) }}><DayNumber today={firstDayOfThisWeek.toLocaleDateString('nl') === today ? true : false} toggle={firstDayOfThisWeek.getMonth() === month ? true : false}>{day}</DayNumber></Day>)
        firstDayOfThisWeek.setDate(firstDayOfThisWeek.getDate() + 1);
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

const WeekDates = styled.div`
    height: calc(100vh - 90px);
    width: 15px;
    display: flex;
    flex-direction: column;
    white-space: pre-line;
    background-color: ${colors.GRAY}
`

const WeekDate = styled.p`
    color: ${colors.WHITE};
    font-size: 18px;
    user-select: none;
    word-wrap: break-word;
    flex: 1;
    margin: 0;
    margin-top: 5px;
    
`

const DaysContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100vw - 15px);
    height: calc(100vh - 90px);
    background-color: ${colors.WHITE};
`

const WeekContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
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
    position: relative;
    display: flex;
`

const MonthsContainer = styled.div`
    white-space: nowrap;
    overflow-x: auto;
    display: flex;
    height: calc(100vh - 90px);
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`
export default Calendar;