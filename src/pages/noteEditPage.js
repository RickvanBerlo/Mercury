import React, { useCallback, useEffect } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import FormBuilder from '../utils/formBuilder';
import GenerateUUID from "../utils/GenerateUUID";

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import TrashIcon from 'react-ionicons/lib/MdTrash';

const NoteEdit = ({ storage, setCurrentPage, props = {} }) => {

    const goBack = useCallback(() => {
        setCurrentPage(pageNames.NOTES);
    }, [setCurrentPage])

    const goRemove = useCallback(() => {
        storage.shared.removeNote(props);
        goBack();
    }, [goBack, storage, props])

    const onSubmit = (event, values) => {
        event.preventDefault();
        props.id === undefined ? storage.shared.addNote(values) : storage.shared.editNote(values);
        setCurrentPage(pageNames.NOTES);
    }

    useEffect(() => {
        const backButton = document.getElementById("goBack");
        const removeButton = document.getElementById("remove");
        backButton.addEventListener("click", goBack, false);
        backButton.addEventListener("touchend", goBack, false);
        props.id && removeButton.addEventListener("click", goRemove, false);
        props.id && removeButton.addEventListener("touchend", goRemove, false);
        return () => {
            backButton.removeEventListener("click", goBack, false);
            backButton.removeEventListener("touchend", goBack, false);
            props.id && removeButton.removeEventListener("click", goRemove, false);
            props.id && removeButton.removeEventListener("touchend", goRemove, false);
        }
    }, [goBack, goRemove, props]);

    return (
        <Container>
            <TopBar>
                <Title>{props.id === undefined ? "Toevoegen" : "Veranderen"}</Title>
                <PositionButtonContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonContainer>
                {props.id && <RightButtonContainer>
                    <IconButton id="remove" icon={TrashIcon} fontSize="35px" color={colors.DARK_GREEN} />
                </RightButtonContainer>}
            </TopBar>
            <EventContainer>
                {buildForm(onSubmit, props)}
            </EventContainer>
        </Container>
    )
}

const buildForm = (onSubmit, props) => {
    const builder = new FormBuilder();
    builder.addHiddenInput("id", { value: props.id === undefined ? GenerateUUID() : props.id, required: true });
    builder.addTextInput("title", { value: props.title, required: true, placeholder: "Title", label: "Titel" });
    builder.addTextEditorInput("description", { value: props.description, required: true, placeholder: "Description", rows: "10", label: "Beschrijving" });
    return builder.getForm("NoteForm", "Verzenden", onSubmit);
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

const RightButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 10px;
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

export default NoteEdit;