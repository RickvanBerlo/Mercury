import requestBuilder from '../utils/requestBuilder';
import config from '../constants/config';
import header from '../constants/requestHeader';
import method from '../constants/requestMethod';
import repositories from '../constants/repositories';

export const getNotes = () => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.NOTES)
        .addMethod(method.GET)
        .addHeaders(header.JSON)
        .send();
}

export const getNote = (id) => {

}

export const replaceNote = (data) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.NOTES, data.id)
        .addMethod(method.PUT)
        .addHeaders(header.JSON)
        .send(data);
}

export const deleteNote = (id) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.NOTES, id)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .send();
}

export const addNote = (props) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.NOTES)
        .addMethod(method.POST)
        .addHeaders(header.JSON)
        .addBody(props)
        .send();
}

export const deleteNotes = () => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.NOTES)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .send();
}


