import React, { useEffect } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import { pageNames } from '../constants/pages';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';
import TrashIcon from 'react-ionicons/lib/MdTrash';
import EditIcon from 'react-ionicons/lib/MdBuild';
import CalendarIcon from 'react-ionicons/lib/MdCalendar';
import ClockIcon from 'react-ionicons/lib/MdClock';
import DescriptionIcon from 'react-ionicons/lib/MdList';


const Event = ({ storage, setCurrentPage, props = {} }) => {

    useEffect(() => {
        const goRemove = () => {
            storage.shared.removeEvent(props);
            setCurrentPage(pageNames.CALENDAR, { selectedDay: props.selectedDay });
        }
        const goBack = () => {
            setCurrentPage(pageNames.CALENDAR, { selectedDay: props.selectedDay });
        }
        const goEdit = () => {
            setCurrentPage(pageNames.EVENTEDIT, { selectedDay: props.selectedDay, props: props });
        }
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
    }, [setCurrentPage, props, storage]);

    return (
        <Container>
            <TopBar>
                <Title>{props.title}</Title>
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
                    <CalendarIcon id="calendar" fontSize="35px" color={colors.DARK_GREEN} style={{ position: "absolute", paddingTop: "13px" }} />
                    <TextContainer>
                        <Text>{props.startDate}</Text>
                        <Text>-</Text>
                        <Text>{props.endDate}</Text>
                    </TextContainer>
                </SpacingContainer>
                <SpacingContainer>
                    <ClockIcon id="clock" fontSize="35px" color={colors.DARK_GREEN} style={{ position: "absolute", paddingTop: "13px" }} />
                    <TextContainer>
                        <Text>{props.startTime}</Text>
                        <Text>-</Text>
                        <Text>{props.endTime}</Text>
                    </TextContainer>
                </SpacingContainer>
                <Line />
                <DescriptionContainer>
                    <DescriptionIcon id="description" fontSize="35px" color={colors.DARK_GREEN} style={{ paddingTop: "13px" }} />
                    <Description>{props.description}</Description>
                </DescriptionContainer>
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const LeftButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    left: 10px;
`
const Line = styled.div`
    height: 15px;
    border-bottom: 1px solid ${colors.GRAY};
    box-shadow: 0px 2px 2px ${colors.GRAY};
`

const DescriptionContainer = styled.div`
    height: 500px;
    max-width: 800px;
    margin:  auto;
    display: flex;
`

const Description = styled.p`
    margin: 0;
    color: ${colors.DARK_GREEN};
    font-size: 20px;
    padding-top: 20px;
    padding-left: 53px;
    white-space: pre;
`

const TextContainer = styled.div`
    padding-top: 20px; 
    display: flex;
    width: 100%;
`

const Text = styled.p`
    margin: 0;
    color: ${colors.DARK_GREEN};
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
    color: ${colors.DARK_GREEN};
`

const TopBar = styled.div`
    position: relative;
    z-index: 2;
    width: 100vw;
    height: 50px;
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
`

export default Event;