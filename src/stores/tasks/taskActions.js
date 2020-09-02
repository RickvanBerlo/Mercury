import * as database from '../../databases/tasks';
import actions from './taskNames';

export const add = (task) => {
    return {
        type: actions.ADD_TASK,
        payload: database.addTask(task).then(response => response.json())
    }
}

export const getTasksOfToday = () => {
    return {
        type: actions.GET_TASKS_OF_TODAY,
        payload: database.getTasksOfToday().then(response => response.json())
    }
}

export const replaceTask = (task) => {
    return {
        type: actions.REPLACE_TASK,
        payload: database.replaceTask(task).then(response => response.json())
    }
}