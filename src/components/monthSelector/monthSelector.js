import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import colors from '../../constants/colors';
import languageSelector from '../../utils/languageSelector';
import GenerateUUID from '../../utils/GenerateUUID';
import Model from '../model/model';
import ItemSelector from '../itemSelector/itemSelector';

const INIT_ITEM_HEIGHT = 60;

const MonthSelector = ({ enable, currentMonth, currentYear, callback }) => {
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [send, setSend] = useState(false);
    const months = languageSelector().MONTHS;
    const years = [];

    for (let i = 1920; i < 2100; i++) {
        years.push(i);
    }

    useEffect(() => {
        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);
    }, [enable])

    useEffect(() => {
        if (send) {
            callback(selectedYear, selectedMonth);
            setSend(false);
        }
    }, [send, callback, selectedYear, selectedMonth])

    const setMonth = (month) => {
        setSelectedMonth(months.indexOf(month));
    }

    const createContent = () => {
        return (
            <Container>
                <SelectorsContainer>
                    <ItemSelector items={years} defaultItem={selectedYear} callback={setSelectedYear} toggle={enable} />
                    <Bar />
                    <ItemSelector items={months} defaultItem={months[selectedMonth]} callback={setMonth} toggle={enable} />
                </SelectorsContainer>
                <BottomBar>
                    <Button onClick={() => { setSend(true) }} onTouchEnd={() => { setSend(true) }}>
                        <ButtonText>
                            Accepteren
                        </ButtonText>
                    </Button>
                </BottomBar>
            </Container>
        )
    }

    return (
        <Model toggle={enable} setToggle={() => { setSend(true) }} title={"selecteer een maand"} content={createContent()} />
    )
}

const Container = styled.div`
`

const Item = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: ${INIT_ITEM_HEIGHT}px;  
    transition: background-color 0.3s linear;
    &:hover{
        cursor: pointer;
    }
`

const Name = styled.p`
    margin: 0;
    color: ${colors.DARK_GREEN}
    line-height: 60px;
    text-align: center;
    font-size: ${props => props.toggle ? "30px" : "20px"}
    text-decoration: ${props => props.toggle ? "underline" : "none"};
    transition: font-size 0.3s linear;
    user-select: none;
    &:hover{
        font-size: 30px;
    }
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
    text-align: center;
    color: ${colors.DARK_GREEN}
`

export default MonthSelector;