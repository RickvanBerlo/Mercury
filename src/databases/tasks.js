import requestBuilder from '../utils/requestBuilder';
import config from '../constants/config';
import header from '../constants/requestHeader';
import method from '../constants/requestMethod';
import repositories from '../constants/repositories';

export const addTask = (props) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.TASKS)
        .addMethod(method.POST)
        .addHeaders(header.JSON)
        .addBodyJson(props)
        .send();
}

export const getTasksOfToday = (props) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.TASKS)
        .addMethod(method.GET)
        .send();
}

export const replaceTask = (data) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.TASKS)
        .addMethod(method.PUT)
        .addHeaders(header.JSON)
        .addURLExtendion(data.id)
        .addBodyJson(data)
        .send();
}