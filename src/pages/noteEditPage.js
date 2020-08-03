import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { removeNote, replace, add } from '../stores/notes/noteActions';
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import FormBuilder from '../utils/formBuilder';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import TrashIcon from 'react-ionicons/lib/MdTrash';

const NoteEdit = ({ removeNote, add, replace, history, note }) => {
    console.log(history);
    const goBack = useCallback(() => {
        history.push(pageNames.NOTES.toLowerCase());
    }, [history])

    const goRemove = useCallback(() => {
        removeNote(note.id);
        goBack();
    }, [goBack, note, removeNote])

    const onSubmit = (event, values) => {
        event.preventDefault();
        note.id === undefined ? add(values) : replace(values);
        history.push(pageNames.NOTES.toLowerCase());
    }

    useEffect(() => {
        const backButton = document.getElementById("goBack");
        const removeButton = document.getElementById("remove");
        backButton.addEventListener("click", goBack, false);
        backButton.addEventListener("touchend", goBack, false);
        note.id && removeButton.addEventListener("click", goRemove, false);
        note.id && removeButton.addEventListener("touchend", goRemove, false);
        return () => {
            backButton.removeEventListener("click", goBack, false);
            backButton.removeEventListener("touchend", goBack, false);
            note.id && removeButton.removeEventListener("click", goRemove, false);
            note.id && removeButton.removeEventListener("touchend", goRemove, false);
        }
    }, [goBack, goRemove, note]);

    return (
        <Container>
            <TopBar>
                <Title>{note.id === undefined ? "Toevoegen" : "Veranderen"}</Title>
                <PositionButtonContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionButtonContainer>
                {note.id && <RightButtonContainer>
                    <IconButton id="remove" icon={TrashIcon} fontSize="35px" color={colors.DARK_GREEN} />
                </RightButtonContainer>}
            </TopBar>
            <EventContainer>
                {buildForm(onSubmit, note)}
            </EventContainer>
        </Container>
    )
}

const buildForm = (onSubmit, note) => {
    const builder = new FormBuilder();
    builder.addHiddenInput("id", { value: note.id, required: false });
    builder.addTextInput("title", { value: note.title, required: true, placeholder: "Title", label: "Titel" });
    builder.addTextEditorInput("description", { value: note.description, required: true, placeholder: "Description", rows: "10", label: "Beschrijving" });
    return builder.getForm("NoteForm", "Verzenden", onSubmit);
}

const mapStateToProps = state => {
    return { note: state.noteReducer.passedNote };
};

const mapDispatchToProps = {
    removeNote,
    replace,
    add
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteEdit);