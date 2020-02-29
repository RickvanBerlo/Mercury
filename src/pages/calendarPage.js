import React, { useEffect, useReducer } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';
import { easings, tween } from '../utils/scrollAnimation';
import screenResolution from '../utils/screenResolution';
import IconButton from '../components/buttons/dasboard/iconButton';
import languageSelector from '../utils/languageSelector';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import NextIcon from 'react-ionicons/lib/MdArrowForward';

const reducer = (state, action) => {
    switch (action.type) {
        case 'nextMonth':
            state.selectedDate.setMonth(state.selectedDate.getMonth() + 1);
            return { ...state, currentMonth: state.selectedDate.getMonth(), currentYear: state.selectedDate.getFullYear() };
        case 'prevMonth':
            state.selectedDate.setMonth(state.selectedDate.getMonth() - 1);
            return { ...state, currentMonth: state.selectedDate.getMonth(), currentYear: state.selectedDate.getFullYear() };
        default:
            throw new Error();
    }
}

const Calendar = () => {
    const initialState = { currentMonth: new Date().getMonth(), currentYear: new Date().getFullYear(), selectedDate: new Date(), screenWidth: screenResolution().width, months: languageSelector().MONTHS };
    const [state, dispatch] = useReducer(reducer, initialState);

    const scroll = (e) => {
        if (e.deltaY > 0) nextMonth();
        else previousMonth();
    }

    const nextMonth = () => {
        let w = document.getElementById("monthsContainer");
        tween(state.screenWidth, state.screenWidth + state.screenWidth, 500, easings.easeInOutCubic, w, () => { dispatch({ type: 'nextMonth' }) });

    }

    const previousMonth = () => {
        let w = document.getElementById("monthsContainer");
        tween(state.screenWidth, 0, 500, easings.easeInOutCubic, w, () => { dispatch({ type: 'prevMonth' }) });
    }

    useEffect(() => {
        let calendarNext = document.getElementById("calendar_next");
        let calendarPrev = document.getElementById("calendar_prev");
        window.addEventListener('wheel', scroll, false);
        calendarNext.addEventListener("click", nextMonth, false);
        calendarNext.addEventListener("touchend", nextMonth, false);
        calendarPrev.addEventListener("click", previousMonth, false);
        calendarPrev.addEventListener("touchend", previousMonth, false);
        return () => {
            window.removeEventListener('wheel', scroll, false);
            calendarNext.removeEventListener("click", nextMonth, false);
            calendarNext.removeEventListener("touchend", nextMonth, false);
            calendarPrev.removeEventListener("click", previousMonth, false);
            calendarPrev.removeEventListener("touchend", previousMonth, false);
        }
    }, []);

    useEffect(() => {
        document.getElementById("monthsContainer").scrollLeft = state.screenWidth;
    }, [state])
    return (
        <Container>
            <TopBarContainer>
                <Button>
                    <Year>{state.currentYear}</Year>
                </Button>
                <Button>
                    <Month>{state.months[state.currentMonth]}</Month>
                </Button>
                <ButtonContainer>
                    <RightFloat>
                        <IconButton id="calendar_prev" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                        <IconButton id="calendar_next" icon={NextIcon} fontSize="40px" color={colors.DARK_GREEN} />
                    </RightFloat>
                </ButtonContainer>
            </TopBarContainer>
            <DateNamesContainer>
                <DateNames>
                    <DateName>Maandag</DateName>
                    <DateName>Dinsdag</DateName>
                    <DateName>Woensdag</DateName>
                    <DateName>Donderdag</DateName>
                    <DateName>Vrijdag</DateName>
                    <DateName>Zaterdag</DateName>
                    <DateName>Zondag</DateName>
                </DateNames>
            </DateNamesContainer>
            <MonthsContainer id="monthsContainer">
                {createAllMonths(state.currentYear, state.currentMonth)}
            </MonthsContainer>
        </Container>
    )
}

const createAllMonths = (currentYear, currentMonth) => {
    let months = [];
    let firstDayOfSelectedYearAndMonth = new Date(currentYear, currentMonth, 1);
    firstDayOfSelectedYearAndMonth.setMonth(firstDayOfSelectedYearAndMonth.getMonth() - 1);
    for (let i = -1; i < 2; i++) {
        months.push(
            <MonthContainer key={i}>
                <DaysContainer>
                    {createMonth(firstDayOfSelectedYearAndMonth)}
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

const createMonth = (selectedDate) => {
    let grid = [];
    let firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const month = selectedDate.getMonth();
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + 1);
    for (let i = 0; i < 6; i++) {
        grid.push(
            <WeekContainer key={i}>
                {createDays(firstDayOfMonth, month)}
            </WeekContainer>
        )
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 7);
    }
    return grid;
}

const createDays = (begin, month) => {
    let days = [];
    let firstDayOfThisWeek = new Date(begin);
    let today = new Date().toLocaleDateString('nl');

    for (let i = 0; i < 7; i++) {
        let day = firstDayOfThisWeek.getDate();
        days.push(<Day key={i}><DayNumber today={firstDayOfThisWeek.toLocaleDateString('nl') === today ? true : false} toggle={firstDayOfThisWeek.getMonth() === month ? true : false}>{day}</DayNumber></Day>)
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
    margin-left: 20px;
    float: left;
    &:hover{
        cursor: pointer;
    }
`

const Button = styled.div`
    flex: 1;
`
const DateNamesContainer = styled.div`
    height: 40px;
    width: 100vw;
    background-color: ${colors.WHITE};
    box-shadow: 0 4px 2px -2px gray;
`

const DateNames = styled.div`
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
    scroll-direction: horizontal;
    white-space: nowrap;
    overflow-x: auto;
    display: flex;
    height: calc(100vh - 90px);
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`
export default Calendar;