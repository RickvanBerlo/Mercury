import React, { useCallback, useEffect } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import formBuilder from '../utils/formBuilder';
import dependencieFunctions from '../components/form/dependencies/dependencieFunctions';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';

const Event = ({ storage, setCurrentPage, selectedDay = new Date(), beginTime = "00:00", endTime = "00:00", props = {} }) => {

    const goBack = useCallback(() => {
        setCurrentPage(pageNames.CALENDAR, { selectedDay: props.selectedDay });
    }, [setCurrentPage, selectedDay])

    const onSubmit = (event, values) => {
        event.preventDefault();
        console.log(storage);
        storage.shared.events.push(values);
        setCurrentPage(pageNames.CALENDAR);
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
                {buildForm(formBuilder, onSubmit, selectedDay, props)}
            </EventContainer>
        </Container>
    )
}

const buildForm = (formBuilder, onSubmit, selectedDay, props) => {
    const value = selectedDay.toLocaleDateString('en-CA');
    const builder = new formBuilder();
    builder.addTextInput("title", { value: props.title, required: true, placeholder: "Title", label: "Titel" });
    builder.addDateInput("startDate", { required: true, value: props.startDate === undefined ? value : props.startDate, label: "Start datum", dependencies: [{ valueOf: "endDate", functions: [dependencieFunctions.dateInput.largerThen] }] });
    builder.addDateInput("endDate", { required: true, value: props.endDate === undefined ? value : props.endDate, label: "Eind datum", dependencies: [{ valueOf: "startDate", functions: [dependencieFunctions.dateInput.smallerThen] }] });
    builder.addCheckboxInput("time", { label: "Tijdsindeling", value: true, dependencies: [{ valueOf: "startTime", functions: [dependencieFunctions.timePicker.toggleVisibility] }, { valueOf: "endTime", functions: [dependencieFunctions.timePicker.toggleVisibility] }] });
    builder.addTimeInput("startTime", { value: props.beginTime, label: "Begin tijd", dependencies: [{ valueOf: "endTime", functions: [dependencieFunctions.timePicker.largerThen] }] });
    builder.addTimeInput("endTime", { value: props.endTime, label: "Eind tijd", dependencies: [{ valueOf: "startTime", functions: [dependencieFunctions.timePicker.smallerThen] }] });
    builder.addTextAreaInput("description", { value: props.description, required: true, placeholder: "Description", rows: "10", label: "Beschrijving" });
    return builder.getForm("eventForm", "Verzenden", onSubmit);
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