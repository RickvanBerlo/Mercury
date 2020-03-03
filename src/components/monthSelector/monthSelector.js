import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import colors from '../../constants/colors';
import languageSelector from '../../utils/languageSelector';

const INIT_ITEM_HEIGHT = 60;

const MonthSelector = ({ enable, currentMonth, currentYear, callback }) => {
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isDragging, setIsDragging] = useState(false);
    const [send, setSend] = useState(false);
    const months = languageSelector().MONTHS;
    const years = [];

    for (let i = 1920; i < 2100; i++) {
        years.push(i);
    }

    useEffect(() => {
        const yearSelector = document.getElementById("yearSelector");
        const monthSelector = document.getElementById("monthSelector");
        monthSelector.scrollTop = (selectedMonth - 2) * INIT_ITEM_HEIGHT;
        yearSelector.scrollTop = (selectedYear - 1922) * INIT_ITEM_HEIGHT;
        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);
    }, [enable])

    useEffect(() => {
        const yearSelector = document.getElementById("yearSelector");
        const monthSelector = document.getElementById("monthSelector");
        monthSelector.addEventListener("touchmove", onDrag, false);
        yearSelector.addEventListener("touchmove", onDrag, false);
        window.addEventListener("touchend", onEnd, false);
        return () => {
            monthSelector.removeEventListener("touchmove", onDrag, false);
            yearSelector.removeEventListener("touchmove", onDrag, false);
            window.removeEventListener("touchend", onEnd, false);
        }
    }, [])

    useEffect(() => {
        if (send) {
            callback(selectedYear, selectedMonth);
            setSend(false);
        }
    }, [send])

    const setYear = (year) => {
        if (!isDragging)
            setSelectedYear(year);
    }

    const setMonth = (month) => {
        if (!isDragging)
            setSelectedMonth(month);
    }

    const onDrag = () => {
        setIsDragging(true);
    }

    const onEnd = () => {
        setIsDragging(false);
    }

    return (
        <Container enable={enable}>
            <MiddleContainer enable={enable}>
                <TopBar>
                    <Title>Selecteer uw datum</Title>
                </TopBar>
                <SelectorsContainer>
                    <Bar />
                    <SelectorContainer id="yearSelector">
                        {createYears(years, selectedYear, setYear)}
                    </SelectorContainer>
                    <Bar />
                    <SelectorContainer id="monthSelector">
                        {createMonths(months, selectedMonth, setMonth)}
                    </SelectorContainer>
                    <Bar />
                </SelectorsContainer>
                <BottomBar>
                    <Button onClick={() => { setSend(true) }} onTouchEnd={() => { setSend(true) }}>
                        <ButtonText>
                            Accepteren
                        </ButtonText>
                    </Button>
                </BottomBar>
            </MiddleContainer>
        </Container >
    )
}

const createYears = (names, selected, callback) => {
    const years = [];

    for (let i = 0; i < names.length; i++) {
        years.push(
            <Item key={i} onClick={() => { callback(names[i]) }} onTouchEnd={() => { callback(names[i]) }}>
                <Name toggle={i === selected - 1920}>{names[i]}</Name>
            </Item>
        )
    }
    return years;
}

const createMonths = (names, selected, callback) => {
    const months = [];

    for (let i = 0; i < names.length; i++) {
        months.push(
            <Item key={i} onClick={() => { callback(i) }} onTouchEnd={() => { callback(i) }}>
                <Name toggle={i === selected}>{names[i]}</Name>
            </Item>
        )
    }
    return months;
}

const Show = keyframes`
    from{
        top: -45%;
    }
    to {
        top 10%;
    }
`
const Hide = keyframes`
    from{
        top: 10%;
    }
    to {
        top -45%;
    }
`

const Container = styled.div`
    position: absolute;
    z-index: 2;
    height: 100vh;
    width: 100vw;
    background-color: ${colors.TRANSPARENT};
    visibility: ${props => props.enable ? "visible" : "hidden"}
    transition: visibility 0.1s ${props => props.enable ? "0s" : "0.5s"} linear;
`

const Title = styled.p`
    margin: 0;
    font-size: 25px;
    padding-top: 15px;
    height: 100%;
    user-select: none;
    color: ${colors.DARK_GREEN}
`

const Item = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: ${INIT_ITEM_HEIGHT}px;
    font-size: 20px;
    transition: background-color 0.3s linear;
    &:hover{
        cursor: pointer;
    }
`

const Name = styled.p`
    margin: 0;
    color: ${colors.DARK_GREEN}
    line-height: 60px;
    font-size: ${props => props.toggle ? "30px" : "20px"}
    text-decoration: ${props => props.toggle ? "underline" : "none"};
    transition: font-size 0.3s linear;
    user-select: none;
    &:hover{
        font-size: 30px;
    }
`

const TopBar = styled.div`
    width: 100%;
    height: 60px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`

const SelectorsContainer = styled.div`
    height: calc(100% - 120px);
    width: 100%;
    display: flex;
`

const BottomBar = styled.div`
    width: 100%;
    height: 60px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

const MiddleContainer = styled.div`
    position: relative;
    top: -45%;
    width: 500px;
    height: 400px;
    margin: auto;
    max-width: 80%;
    border-radius: 20px;
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
    animation: ${props => props.enable == null ? `none` : props.enable ? css`${Show} 0.6s ease-out forwards` : css`${Hide} 0.5s ease-in forwards`};
`

const Bar = styled.div`
    flex:1;
`

const SelectorContainer = styled.div`
    position: relative;
    z-index: 100;
    flex: 5;
    box-shadow: inset 0px 0px 10px 0px ${colors.BLACK};
    overflow: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`

const Button = styled.div`
    margin: auto;
    width: 80%;
    height: 40px;
    margin-top: 10px;
    box-shadow: inset 0px 0px 10px 10px ${colors.WHITE};
    transition: background-color 0.3s linear;
    &:hover{
        background-color: ${colors.DARK_WHITE}
        cursor: pointer;
    }
    &:active{
        background-color: ${colors.ACTIVE_COLOR};
    }
    @media (max-width: 767px) {
        &:hover{
            background-color: ${colors.WHITE};
        }
        &:active{
            background-color: ${colors.DARK_WHITE};
        }
    }
`

const ButtonText = styled.p`
    margin: 0;
    font-size: 20px;
    line-height: 40px;
    color: ${colors.DARK_GREEN}
`

export default MonthSelector;