import React, { useCallback, useEffect } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import formBuilder from '../utils/formBuilder';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';

const Event = ({ setCurrentPage, selectedDay = new Date() }) => {

    const goBack = useCallback(() => {
        setCurrentPage(pageNames.CALENDAR, { selectedDay: selectedDay });
    }, [setCurrentPage, selectedDay])

    const onSubmit = (event, values) => {
        event.preventDefault();
        console.log(values);
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

    return (
        <Container>
            <TopBar>
                <Title>{selectedDay.toLocaleDateString('nl')}</Title>
                <PositionButtonContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonContainer>
            </TopBar>
            <EventContainer>
                {buildForm(formBuilder, onSubmit, selectedDay)}
            </EventContainer>
        </Container>
    )
}

const buildForm = (formBuilder, onSubmit, selectedDay) => {
    let value = selectedDay.toLocaleDateString('en-CA');
    const builder = new formBuilder();
    builder.addTextInput("title", "Titel", undefined, { required: true, placeholder: "Title" });
    builder.addTextInput("description", "Beschrijving", undefined, { required: true, placeholder: "Description" });
    builder.addDateInput("startDate", "Start datum", undefined, { required: true, value: value });
    builder.addDateInput("endDate", "Eind datum", undefined, { required: true, value: value });
    builder.addCheckboxInput("AllDay", "Hele dag");
    builder.addTimeInput("startTime", "Begin tijd", undefined);
    builder.addTimeInput("endTime", "Eind tijd", undefined)
    return builder.getForm("Verzenden", onSubmit);
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const PositionButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    left: 10px;
`

const Title = styled.p`
    font-size: 25px;
    width: 100%;
    line-height: 50px;
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

const EventContainer = styled.div`
    margin: auto;
    margin-top: 30px;
    width: 700px;
    max-width: 80%;
    height: calc(100% - 80px);
`

export default Event;