import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';
import { easings, tween } from '../utils/scrollAnimation';
import screenResolution from '../utils/screenResolution';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import NextIcon from 'react-ionicons/lib/MdArrowForward';

const Calendar = () => {
    let scrollwidth = useRef(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    let width = screenResolution().width;

    useEffect(() => {
        let item = document.getElementById("monthsContainer");
        window.addEventListener('wheel', function (e) {
            let item = document.getElementById("monthsContainer");
            if (e.deltaY > 0) item.scrollLeft += 10;
            else item.scrollLeft -= 10;
        });
        item.style.right = "0px";
    }, []);

    return (
        <Container>
            <ButtonContainer>
                <StyledPreviousIcon fontSize="40px" color={colors.DARK_GREEN} onClick={() => { previousMonth(scrollwidth, width) }} />
                <StyledNextIcon fontSize="40px" color={colors.DARK_GREEN} onClick={() => { nextMonth(scrollwidth, width) }} />
            </ButtonContainer>
            <SelectedDateContainer>
                <SelectedDateButton>
                    <SelectedDate>{selectedDate.toLocaleDateString('nl')}</SelectedDate>
                </SelectedDateButton>
            </SelectedDateContainer>
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
                {createAllMonths(selectedDate)}
            </MonthsContainer>
        </Container>
    )
}

const createAllMonths = (selectedDate) => {
    let months = [];
    let firstDayOfSelectedYearAndMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    firstDayOfSelectedYearAndMonth.setMonth(firstDayOfSelectedYearAndMonth.getMonth() - 12);
    for (let i = -12; i < 12; i++) {
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

const nextMonth = (scrollwidth, width) => {
    let w = document.getElementById("monthsContainer");
    tween(scrollwidth.current, scrollwidth.current + width, 1000, easings.easeInOutCubic, w);
    scrollwidth.current = scrollwidth.current + width;
}

const previousMonth = (scrollwidth, width) => {
    let w = document.getElementById("monthsContainer");
    tween(scrollwidth.current, scrollwidth.current - width, 1000, easings.easeInOutCubic, w);
    scrollwidth.current = scrollwidth.current - width;
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
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay() + 1);
    for (let i = 0; i < 6; i++) {
        grid.push(
            <WeekContainer key={i}>
                {createDays(firstDayOfMonth)}
            </WeekContainer>
        )
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 7);
    }
    return grid;
}

const createDays = (begin) => {
    let days = [];
    let firstDayOfThisWeek = new Date(begin);

    for (let i = 0; i < 7; i++) {
        days.push(<Day key={i}><DayNumber>{firstDayOfThisWeek.getDate()}</DayNumber></Day>)
        firstDayOfThisWeek.setDate(firstDayOfThisWeek.getDate() + 1);
    }
    return days;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const SelectedDateContainer = styled.div`
    height: 50px;
    width: calc(100vw - 15px);
    background-color: ${colors.WHITE};
    text-align: center;
`

const SelectedDate = styled.p`
    color: ${colors.DARK_GREEN};
    line-height: 50px;
    font-size: 25px;
    user-select: none;
    margin: 0;
`

const SelectedDateButton = styled.div`
    width: 200px;
    margin:auto;
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
    bottom: 0;
    right: 5px;
    margin: 0;
`

const ButtonContainer = styled.div`
    position: absolute;
    z-index: 2;
    right: 15px;
    top: 5px;
`

const StyledNextIcon = styled(NextIcon)`
    transition: background-color 0.2s linear;
    box-shadow: inset 0px 0px 10px 10px ${colors.WHITE};
    -webkit-tap-highlight-color: transparent;
    &:hover{
        background-color: ${colors.GRAY}
        cursor: pointer;
    }
    &:active{
        background-color: ${colors.DARK_GRAY};
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colors.WHITE};
        }
        &:active{
            background-color: ${colors.GRAY};
        }
    }
`

const StyledPreviousIcon = styled(PreviousIcon)`
    transition: background-color 0.2s linear;
    box-shadow: inset 0px 0px 10px 10px ${colors.WHITE};
    -webkit-tap-highlight-color: transparent;
    &:hover{
        background-color: ${colors.GRAY}
        cursor: pointer;
    }
    &:active{
        background-color: ${colors.DARK_GRAY};
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colors.WHITE};
        }
        &:active{
            background-color: ${colors.GRAY};
        }
    }
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