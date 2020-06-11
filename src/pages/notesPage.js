import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import UUID from '../utils/GenerateUUID';
import '../css/notesPage.css';

import AddIcon from 'react-ionicons/lib/MdAdd';
import ListIcon from 'react-ionicons/lib/MdList';

const Notes = ({ storage, setCurrentPage }) => {
    const [amountOfRows, setAmountOfRows] = useState(window.innerWidth > 1300 ? 4 : window.innerWidth > 900 ? 3 : 2);

    const NoItemsIcon = styled(ListIcon)`
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &:hover{
            cursor:pointer;
        }
    `
    const goToEditNote = (note = undefined) => {
        setCurrentPage(pageNames.NOTEEDIT, { props: note });
    }

    const onResize = (e) => {
        const width = e.target.innerWidth
        setAmountOfRows(width > 1300 ? 4 : width > 900 ? 3 : 2);
    }

    useEffect(() => {
        window.addEventListener('resize', onResize, false);
        return () => {
            window.addEventListener('resize', onResize, false);
        }
    }, [])

    return (
        <Container>
            {areThereNotes(storage.shared.getNotes()) === false && <NoItemsIcon id={"noItemIcon"} fontSize={"150px"} color={colors.LIGHT_GRAY} onClick={goToEditNote}></NoItemsIcon>}
            {createNotes(storage.shared.getNotes(), amountOfRows, goToEditNote)}
            <AddButton onClick={goToEditNote}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container>
    )
}

const areThereNotes = (notes) => {
    for (const key in notes) {
        return true;
    }
    return false;
}

const createNotes = (notes, amountOfRows, goToEditNote) => {
    const notesComponents = [[], [], [], []];
    let divider = 0;

    for (const key in notes) {
        notesComponents[divider].push(createNote(notes[key], goToEditNote));
        divider++;
        if (divider === amountOfRows) divider = 0;
    }

    return (
        <ScrollVerticalContainer>
            <FlexContainers amountOfRows={amountOfRows}>{notesComponents[0]}</FlexContainers>
            <FlexContainers amountOfRows={amountOfRows}>{notesComponents[1]}</FlexContainers>
            {amountOfRows > 2 && <FlexContainers amountOfRows={amountOfRows}>{notesComponents[2]}</FlexContainers>}
            {amountOfRows > 3 && <FlexContainers amountOfRows={amountOfRows}>{notesComponents[3]}</FlexContainers>}
        </ScrollVerticalContainer>
    )
}

const createNote = (note, goToEditNote) => {
    return (
        <NoteContainer key={UUID()}>
            <Title onClick={(e) => { goToEditNote(note) }}>{note.title}</Title>
            <Description className="description" dangerouslySetInnerHTML={{ __html: note.description }} />
        </NoteContainer >
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const Title = styled.p`
    margin: 0;
    word-wrap: break-word;
    font: 20px 'Open Sans Bold',sans-serif;
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${colors.BLACK};
    &:hover {
        cursor: pointer;
    }
`

const Description = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    text-align: left;
    font: 18px 'Open Sans Bold',sans-serif;
`

const NoteContainer = styled.div`
    width: 90%;
    max-width: 90%;
    margin-left: 10px;
    margin-top: 10px;
    border: 1px solid ${colors.GRAY};
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
    border-radius: 10px;
`

const ScrollVerticalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`

const FlexContainers = styled.div`
    width: ${props => 100 / props.amountOfRows}%;
`

const AddButton = styled.div`
    position: fixed;
    z-index: 3;
    bottom: 20px;
    right: 30px;
    border-radius: 100px;
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 10px 0px ${colors.BLACK};
`

export default Notes;