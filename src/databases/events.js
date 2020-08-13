import requestBuilder from '../utils/requestBuilder';
import config from '../constants/config';
import header from '../constants/requestHeader';
import method from '../constants/requestMethod';
import repositories from '../constants/repositories';

export const getEventsOfMonth = (month) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.EVENTS)
        .addMethod(method.GET)
        .addURLParams({ month: month })
        .send();
}

export const getEvent = (id) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.EVENTS)
        .addMethod(method.GET)
        .addHeaders(header.JSON)
        .addURLExtendion(id)
        .send();
}

export const replaceEvent = (data) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.EVENTS)
        .addMethod(method.PUT)
        .addHeaders(header.JSON)
        .addURLExtendion(data.id)
        .addBodyJson(data)
        .send();
}

export const deleteEvent = (id) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.EVENTS)
        .addMethod(method.DELETE)
        .addURLExtendion(id)
        .send();
}

export const addEvent = (props) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.EVENTS)
        .addMethod(method.POST)
        .addHeaders(header.JSON)
        .addBodyJson(props)
        .send();
}


