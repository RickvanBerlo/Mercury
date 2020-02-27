import React, { useState } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('nl'));
    return (
        <Container>
            <SelectedDateContainer>
                <SelectedDateButton>
                    <SelectedDate>{selectedDate}</SelectedDate>
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
            <WeekDates>
                <WeekDate>1</WeekDate>
                <WeekDate>2</WeekDate>
                <WeekDate>3</WeekDate>
                <WeekDate>4</WeekDate>
                <WeekDate>5</WeekDate>
            </WeekDates>
            <MonthContainer>
                {createGrid()}
            </MonthContainer>
        </Container>
    )
}

const createGrid = () => {
    let grid = [];
    for (let i = 0; i < 5; i++) {
        grid.push(
            <WeekContainer key={i}>
                <Day></Day>
                <Day></Day>
                <Day></Day>
                <Day></Day>
                <Day></Day>
                <Day></Day>
                <Day></Day>
            </WeekContainer>
        )
    }
    return grid;
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
    line-height: 40px;
    font-size: ${mobilecheck() ? "10px" : "18px"};
    flex: 1;
    margin: 0;
`

const WeekDates = styled.div`
    height: calc(100vh - 90px);
    width: 15px;
    display: flex;
    float: right;
    flex-direction: column;
    background-color: ${colors.GRAY}
`

const WeekDate = styled.p`
    color: ${colors.WHITE};
    font-size: 18px;
    flex: 1;
    margin: 0;
    margin-top: 5px;
    
`

const MonthContainer = styled.div`
    position: absolute;
    z-index: -1;
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
`
export default Calendar;