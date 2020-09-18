import requestBuilder from '../utils/requestBuilder';
import config from '../constants/config';
import header from '../constants/requestHeader';
import method from '../constants/requestMethod';
import repositories from '../constants/repositories';

export const getPreferences = () => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.PREFERENCES)
        .addMethod(method.GET)
        .addHeaders(header.JSON)
        .send();
}

export const savePreferences = (preferences) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.PREFERENCES)
        .addMethod(method.POST)
        .addHeaders(header.JSON)
        .addBodyJson(preferences)
        .send();
}