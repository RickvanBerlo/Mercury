import React from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';

import AddIcon from 'react-ionicons/lib/MdAdd';
import ListIcon from 'react-ionicons/lib/MdList';

const Notes = ({ storage, setCurrentPage }) => {
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
    const goToEditNote = () => {
        setCurrentPage(pageNames.NOTEEDIT);
    }

    return (
        <Container>
            {areThereNotes(storage.shared.getNotes()) === false && <NoItemsIcon id={"noItemIcon"} fontSize={"150px"} color={colors.LIGHT_GRAY} onClick={goToEditNote}></NoItemsIcon>}
            {createNotes(storage.shared.getNotes())}
            <AddButton onClick={goToEditNote}>
                <IconButton id="calendar_prev" icon={AddIcon} fontSize="60px" color={colors.DARK_GREEN} round={true} />
            </AddButton>
        </Container>
    )
}

const areThereNotes = (notes) => {
    for (const note in notes) {
        return true;
    }
    return false;
}

const createNotes = (notes) => {
    return (
        <ScrollVerticalContainer>

        </ScrollVerticalContainer>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const ScrollVerticalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${colors.WHITE}
`

const AddButton = styled.div`
    position: absolute;
    z-index: 3;
    bottom: 20px;
    right: 30px;
    border-radius: 100px;
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 10px 0px ${colors.BLACK};
`

export default Notes;