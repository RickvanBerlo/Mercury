import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { getNotes, passNote } from '../stores/notes/noteActions';
import styled, { keyframes, css } from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';
import UUID from '../utils/GenerateUUID';
import '../css/notesPage.css';

import AddIcon from 'react-ionicons/lib/MdAdd';
import ListIcon from 'react-ionicons/lib/MdList';

const Notes = ({ notes, getNotes, passNote, history }) => {
    const [amountOfRows, setAmountOfRows] = useState(window.innerWidth > 1300 ? 4 : window.innerWidth > 900 ? 3 : 2);

    useEffect(() => {
        getNotes();
    }, [getNotes])

    const NoItemsIcon = styled(ListIcon)`
        margin: 0;
        position: absolute;
        z-index: 1;
        top: 50%;
        left: 50%;
        opacity: 1;
        transform: translate(-50%, -50%);
        animation: ${props => props.show ? fadeout : fadein} 0.4s linear forwards;
        &:hover{
            cursor:pointer;
        }
    `
    const goToEditNote = (note = undefined) => {
        passNote(note);
        history.push(pageNames.NOTEEDIT.toLowerCase());
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
            <NoItemsIcon show={areThereNotes(notes)} id={"noItemIcon"} fontSize={"150px"} color={colors.LIGHT_GRAY} onClick={goToEditNote}></NoItemsIcon>
            {createNotes(notes, amountOfRows, goToEditNote)}
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
    let i = 0;

    for (const key in notes) {
        notesComponents[divider].push(createNote(notes[key], goToEditNote, i));
        divider++;
        i++;
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

const createNote = (note, goToEditNote, delay) => {
    return (
        <NoteContainer key={UUID()} delay={delay}>
            <Title onClick={(e) => { goToEditNote(note) }}>{note.title}</Title>
            <Description className="description" dangerouslySetInnerHTML={{ __html: note.description }} />
        </NoteContainer >
    )
}

const mapStateToProps = state => {
    return { notes: state.noteReducer.notes };
};

const mapDispatchToProps = {
    getNotes,
    passNote
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

const fadein = keyframes`
  from { 
    opacity: 0
  }
  to {
    opacity: 1
  }
`
const fadeout = keyframes`
  from { 
    opacity: 1
  }
  to {
    opacity: 0
  }
`

const fadein_enlarge = keyframes`
  from { 
    opacity: 0;
    transform: scale(0,0);
  }
  to {
    opacity: 1;
    transform: scale(1,1);
  }
`

const NoteContainer = styled.div`
    width: 95%;
    max-width: 95%;
    margin-left: 10px;
    opacity: 0;
    margin-top: 10px;
    border: 1px solid ${colors.GRAY};
    box-shadow: 0px 1.5px 3px 0px ${colors.BLACK};
    border-radius: 10px;
    animation: ${props => css`${fadein_enlarge} 0.4s linear ${props.delay * 0.1}s forwards`};
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

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoNotes = memo(connect(mapStateToProps, mapDispatchToProps)(Notes), areEqual)
export default MemoNotes;