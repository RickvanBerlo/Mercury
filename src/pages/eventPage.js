import React, { useEffect, memo, useCallback } from "react";
import styled from 'styled-components';
import IconButton from '../components/buttons/dasboard/iconButton';
import { connect } from "react-redux";
import { deleteEvent, passEvent } from '../stores/events/eventActions';
import { useHistory, useParams } from "react-router-dom";
import objectIsEmpty from '../utils/objectIsEmpty';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import TrashIcon from 'react-ionicons/lib/MdTrash';
import EditIcon from 'react-ionicons/lib/MdBuild';
import CalendarIcon from 'react-ionicons/lib/MdCalendar';
import ClockIcon from 'react-ionicons/lib/MdClock';
import DescriptionIcon from 'react-ionicons/lib/MdList';


const Event = ({ events, deleteEvent, passEvent, colors }) => {
    const { id } = useParams();
    const history = useHistory();

    let event = {};
    if (!objectIsEmpty(events))
        event = events[id];

    const goBack = useCallback(() => {
        history.goBack();
    }, [history])

    const goRemove = useCallback(() => {
        passEvent(event);
        deleteEvent(event.id);
        history.goBack();
    }, [history, deleteEvent, event, passEvent])

    const goEdit = useCallback(() => {
        history.push(`${id}/eventedit`);
    }, [history, id])

    useEffect(() => {

        const backButton = document.getElementById("goBack");
        const EditButton = document.getElementById("edit");
        const RemoveButton = document.getElementById("remove");
        backButton.addEventListener("click", goBack, false);
        backButton.addEventListener("touchend", goBack, false);
        EditButton.addEventListener("click", goEdit, false);
        EditButton.addEventListener("touchend", goEdit, false);
        RemoveButton.addEventListener("click", goRemove, false);
        RemoveButton.addEventListener("touchend", goRemove, false);
        return () => {
            backButton.removeEventListener("click", goBack, false);
            backButton.removeEventListener("touchend", goBack, false);
            EditButton.removeEventListener("click", goEdit, false);
            EditButton.removeEventListener("touchend", goEdit, false);
            RemoveButton.removeEventListener("click", goRemove, false);
            RemoveButton.removeEventListener("touchend", goRemove, false);
        }
    }, [history, goBack, goEdit, goRemove]);

    return (
        <Container colors={colors}>
            <TopBar colors={colors}>
                <Title color={colors.MAIN}>{event.title}</Title>
                <LeftButtonContainer>
                    <IconButton id="goBack" icon={PreviousIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </LeftButtonContainer>
                <RightButtonContainer>
                    <Spacing><IconButton id="edit" icon={EditIcon} fontSize="35px" color={colors.DARK_GREEN} /></Spacing>
                    <Spacing><IconButton id="remove" icon={TrashIcon} fontSize="35px" color={colors.DARK_GREEN} /></Spacing>
                </RightButtonContainer>
            </TopBar>
            <ContentContainer>
                <SpacingContainer>
                    <CalendarIcon id="calendar" fontSize="35px" color={colors.MAIN} style={{ position: "absolute", paddingTop: "13px" }} />
                    <Seperator color={colors.TEXT}>-</Seperator>
                    <TextContainer>
                        <Text color={colors.TEXT}>{event.startDate}</Text>
                        <Text color={colors.TEXT}>{event.endDate}</Text>
                    </TextContainer>
                </SpacingContainer>
                <SpacingContainer>
                    <ClockIcon id="clock" fontSize="35px" color={colors.MAIN} style={{ position: "absolute", paddingTop: "13px" }} />
                    <Seperator color={colors.TEXT}>-</Seperator>
                    <TextContainer>
                        <Text color={colors.TEXT}>{event.startTime}</Text>
                        <Text color={colors.TEXT}>{event.endTime}</Text>
                    </TextContainer>
                </SpacingContainer>
                <DescriptionContainer>
                    <DescriptionIcon id="description" fontSize="35px" color={colors.MAIN} style={{ paddingTop: "13px" }} />
                    <Description color={colors.TEXT} dangerouslySetInnerHTML={{ __html: event.description }}></Description>
                </DescriptionContainer>
            </ContentContainer>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        events: state.eventReducer.events,
        colors: state.preferencesReducer.colors  
    };
};

const mapDispatchToProps = {
    deleteEvent,
    passEvent
}

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: ${props => props.colors.PRIMARY}
`

const Seperator = styled.p`
    position: absolute;
    left: 50%;
    color: ${props => props.color}
`

const LeftButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    left: 10px;
`

const DescriptionContainer = styled.div`
    height: 500px;
    max-width: 800px;
    padding-right: 5%;
    padding-left: 5%;
    margin:  auto;
    display: flex;
`

const Description = styled.div`
    margin: 0;
    color: ${props => props.color};
    font-size: 20px;
    padding-left: 53px;
    white-space: pre;
`

const TextContainer = styled.div`
    padding-top: 20px; 
    display: flex;
    width: 95%;
    padding-left: 5%;
`

const Text = styled.p`
    margin: 0;
    color: ${props => props.color};
    font-size: 20px;
    text-align: center;
    flex: 1;
`

const ContentContainer = styled.div`
    width: 100vw;
`

const SpacingContainer = styled.div`
    height: 50px;
    max-width: 800px;
    padding-right: 5%;
    padding-left: 5%;
    margin:  auto;
`

const Spacing = styled.div`
    margin-top: 3px;
    margin-left: 10px;
`

const RightButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 10px;
    display: flex;
`

const Title = styled.p`
    font-size: 25px;
    width: 100%;
    line-height: 50px;
    text-align:center;
    margin: 0;
    color: ${props => props.color};
`

const TopBar = styled.div`
    position: relative;
    z-index: 2;
    width: 100vw;
    height: 50px;
    background-color: ${props => props.colors.SECONDARY};
    box-shadow: 0px 2px 5px 0px black;
`
const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoEvent = memo(connect(mapStateToProps, mapDispatchToProps)(Event), areEqual)
export default MemoEvent;