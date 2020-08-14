import React, { useCallback, useEffect, memo } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import FormBuilder from '../utils/formBuilder';
import dependencieFunctions from '../components/form/dependencies/dependencieFunctions';
import { connect } from "react-redux";
import { addEvent, replaceEvent } from '../stores/events/eventActions';
import { pageNames } from '../constants/pages';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';

const EventEdit = ({ addEvent, replaceEvent, history, event, selectedDay }) => {

    const goBack = useCallback(() => {

        history.goBack();
    }, [history])

    const onSubmit = (e, values) => {
        e.preventDefault();
        console.log(values);
        if (Object.keys(event).length === 0) addEvent(values);
        else replaceEvent(values);
        history.push(pageNames.CALENDAR.toLowerCase());
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
                <Title>{event.id === undefined ? "Toevoegen" : "Veranderen"}</Title>
                <PositionButtonContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonContainer>
            </TopBar>
            <EventContainer>
                {buildForm(onSubmit, selectedDay === undefined ? new Date() : selectedDay, event)}
            </EventContainer>
        </Container>
    )
}

const buildForm = (onSubmit, selectedDay, event) => {
    const value = selectedDay.toLocaleDateString('en-CA');
    const builder = new FormBuilder();
    builder.addHiddenInput("id", { value: event.id, required: false });
    builder.addTextInput("title", { value: event.title, required: true, placeholder: "Title", label: "Titel" });
    builder.addDateInput("startDate", { required: true, value: event.startDate === undefined ? value : event.startDate, label: "Start datum", dependencies: [{ valueOf: "endDate", functions: [dependencieFunctions.dateInput.largerThen, disableToggleTime] }] });
    builder.addDateInput("endDate", { required: true, value: event.endDate === undefined ? value : event.endDate, label: "Eind datum", dependencies: [{ valueOf: "startDate", functions: [dependencieFunctions.dateInput.smallerThen, disableToggleTime] }] });
    builder.addCheckboxInput("hasTime", { label: "Tijdsindeling", value: true, dependencies: [{ valueOf: "startTime", functions: [dependencieFunctions.timePicker.toggleVisibility] }, { valueOf: "endTime", functions: [dependencieFunctions.timePicker.toggleVisibility] }] });
    builder.addTimeInput("startTime", { value: event.startTime, label: "Begin tijd", dependencies: [{ valueOf: "endTime", functions: [dependencieFunctions.timePicker.largerThen] }] });
    builder.addTimeInput("endTime", { value: event.endTime, label: "Eind tijd", dependencies: [{ valueOf: "startTime", functions: [dependencieFunctions.timePicker.smallerThen] }] });
    builder.addColorInput("color", { value: event.color, label: "Kleur", });
    builder.addTextEditorInput("description", { value: event.description, required: true, placeholder: "Description", rows: "10", label: "Beschrijving" });
    return builder.getForm("eventForm", "Verzenden", onSubmit);
}

const disableToggleTime = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    let bool = true;
    if (new Date(dependencyValue).getTime() !== new Date(objectValue).getTime()) bool = false;
    dependencieFunctions.checkbox.hideCheckbox(bool, objectValue, inputs["hasTime"], changeValidation, inputs);
}

const mapStateToProps = state => {
    return { event: state.eventReducer.passedEvent, selectedDay: new Date(state.eventReducer.currentYear, state.eventReducer.currentMonth, state.eventReducer.currentDay) };
};

const mapDispatchToProps = {
    addEvent,
    replaceEvent
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
const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoEventEdit = memo(connect(mapStateToProps, mapDispatchToProps)(EventEdit), areEqual)
export default MemoEventEdit;