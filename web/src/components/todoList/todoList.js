import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import colors from '../../constants/colors';
import styled , { css, keyframes }from 'styled-components';
import { add,getTasksOfToday, replaceTask } from '../../stores/tasks/taskActions';

import AddIcon from 'react-ionicons/lib/MdAdd';

const StyledIcon = styled(AddIcon)`
    height: 40px;
`

const TodoList = ({ tasks, add, replaceTask, getTasksOfToday}) => {
    const [edit, setEdit] = useState(false);
    const changeToEdit = () => {
        setEdit(true);
    }

    const changeTask = (id) => {
        const task = tasks[id];
        task.executed = !task.executed;
        replaceTask(task);
    }

    useEffect(() => {
        getTasksOfToday();
    },[getTasksOfToday])

    useEffect(() => {
        const addTask = (e) => {
            add({ title: document.getElementById("taskInput").value, executed: false });
            setEdit(false);
        }

        const taskInput = document.getElementById("taskInput");
        if(edit){
            taskInput.addEventListener('change', addTask, false);
        }
        return () => {
            if(edit){
                taskInput.removeEventListener('change', addTask, false);
            }
        }
    }, [edit, add])

    return (
        <Container>
            <Title>Todo</Title>
            <Hr/>
            <div>
                {createTasks(tasks, changeTask, false)}
            </div>
            {
            edit ?
                <TodoTaskContainer onClick={changeToEdit}>
                    <StyledIcon fontSize="25" color={colors.WHITE} />
                    <TextInput id="taskInput" type="text" autoFocus />
                </TodoTaskContainer>
            :
                <TodoTaskContainer onClick={changeToEdit}>
                    <StyledIcon fontSize="25" color={colors.WHITE} />
                    <CreateText>Aanmaken taak</CreateText>
                </TodoTaskContainer>
            }
            <Hr />
            <div>
                {createTasks(tasks, changeTask, true)}
            </div>
        </Container>
    )
}

const createTasks = (tasks, changeTask, executed) => {
    const array = [];

    for (const key in tasks) {
        if (tasks[key].executed === executed){
        array.push(
            <TodoTaskContainer key={"task_" + tasks[key].id} onClick={(e) => { changeTask(tasks[key].id) }}>
                <HiddenCheckbox name="executed" type="checkbox" onClick={(e) => { changeTask(tasks[key].id)}} />
                <StyledCheckbox checked={tasks[key].executed} className="input" title={`Toggle het vlak aan of uit.`}>
                    <Icon viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                    </Icon>
                </StyledCheckbox>
                <CreateText checked={tasks[key].executed}>{tasks[key].title}</CreateText>
            </TodoTaskContainer>
        )
        }
    }

    return array
}

const fadein = keyframes`
  from { 
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const Container = styled.div`
    position: absolute;
    right: 0;
    top: 10%;
    width: 300px;
    padding-bottom: 10px;
    background-color: #0000001a;
    backdrop-filter: blur(10px);
    z-index: 1;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 1px solid #7f7f7f40;
    animation ${fadein} 0.2s linear forwards;
`

const TextInput = styled.input`
    flex: 1;
    text-align: center;
    background-color: transparent;
    border: 0;
    color: white;
    font-size: 16px;
    &:focus{
        outline: none;
    }
`

const Title = styled.h2`
    color: ${colors.WHITE};
    font-size: 25px;
    margin-top: 15px;
    margin-bottom: 10px;
`

const Hr = styled.hr`
    margin: auto;
    width: 85%;
    background-color: white;
    border: 1px solid #9494944d;
`

const TodoTaskContainer = styled.div`
    margin: auto;
    height: 40px;
    width: 80%;
    display: flex;
    &:hover{
        cursor:pointer;
    }
`

const CreateText = styled.p`
    flex: 1;
    line-height: 40px;
    margin: 0px;
    color: ${props => props.checked ? "#7a7a7a40" : colors.WHITE};
    font-size: 20px;
    ${props => props.checked === true && css`
        &:before{
        content: '';
        width: 100%;
        height: 1px;
        background: #a1a1a173;
        display: block;
        position: relative;
        top: 50%;
    }
    `}
`

const Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
    transition: visibilty 0.3s linear;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const StyledCheckbox = styled.div`
    width: ${props => props.checked ? "24px" : "20px"};
    margin: auto;
    height: ${props => props.checked ? "24px" : "20px"};
    background: ${props => props.checked ? "#abaeae61" : colors.TRANSPARENT};
    border: ${props => props.checked ? `none` : css`2px solid ${colors.WHITE}`};
    border-radius: 5px;
    transition: all 0.3s;
    ${Icon} {
        visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }
`

const mapStateToProps = state => {
    return { tasks: state.taskReducer.tasks};
};

const mapDispatchToProps = {
    add,
    getTasksOfToday,
    replaceTask
}

const areEqual = (prevProps, nextProps) => {
    return true;
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(TodoList), areEqual);