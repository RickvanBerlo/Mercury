import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { removeNote, replace, add, passNote } from '../stores/notes/noteActions';
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import FormBuilder from '../utils/formBuilder';
import { useParams, useHistory } from 'react-router-dom';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import TrashIcon from 'react-ionicons/lib/MdTrash';

const NoteEdit = ({ removeNote, add, replace, notes, passNote }) => {
    const history = useHistory();
    const { id } = useParams();

    let note = id === undefined ? {} :  notes[id]; 
    if(note === undefined) note = {};

    const goBack = useCallback(() => {
        history.goBack();
    }, [history])

    const goRemove = useCallback(() => {
        passNote(note);
        removeNote(note.id);
        goBack();
    }, [goBack, note, removeNote, passNote])

    const onSubmit = (event, values) => {
        event.preventDefault();
        console.log(values);
        note.id === undefined ? add(values) : replace(values);
        goBack();
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
    return { notes: state.noteReducer.notes };
};

const mapDispatchToProps = {
    removeNote,
    replace,
    add,
    passNote
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