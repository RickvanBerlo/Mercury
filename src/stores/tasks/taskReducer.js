import actions from './taskNames';

const InitState = { tasks: {} }

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD_TASK + fulfilled):
            state.tasks[action.payload.id] = action.payload;
            return { ...state, tasks: {...state.tasks} };
        case (actions.GET_TASKS_OF_TODAY + fulfilled):
            action.payload.forEach(task => {
                state.tasks[task.id] = task
            });
            return { ...state, tasks: {...state.tasks}};
        case (actions.REPLACE_TASK + fulfilled):
            state.tasks[action.payload.id] = action.payload;
            return { ...state, tasks: { ...state.tasks } };
        default:
            return state;
    }
}