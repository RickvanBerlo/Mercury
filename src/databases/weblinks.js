import requestBuilder from '../utils/requestBuilder';
import config from '../constants/config';
import header from '../constants/requestHeader';
import method from '../constants/requestMethod';
import repositories from '../constants/repositories';

export const getWeblinks = () => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.WEBLINKS)
        .addMethod(method.GET)
        .addHeaders(header.JSON)
        .send();
}

export const getWeblink = (id) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.WEBLINKS)
        .addMethod(method.GET)
        .addHeaders(header.JSON)
        .addURLExtendion(id)
        .send();
}

export const replaceWeblink = (data) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.WEBLINKS)
        .addMethod(method.PUT)
        .addHeaders(header.JSON)
        .addURLExtendion(data.id)
        .addBodyJson(data)
        .send();
}

export const deleteWeblink = (id) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.WEBLINKS)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .addURLExtendion(id)
        .send();
}

export const addWeblink = (props) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.WEBLINKS)
        .addMethod(method.POST)
        .addHeaders(header.JSON)
        .addBodyJson(props)
        .send();
}

export const deleteWeblinks = () => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.WEBLINKS)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .send();
}


