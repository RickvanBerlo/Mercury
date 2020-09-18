import store from '../stores/store';

class RequestBuilder {
    #url
    #properties
    #promise

    constructor(url, repository) {
        const state = store.getState();
        const accessToken = state.keycloakReducer.keycloak.token;

        this.#url = url + repository;
        this.#properties = { headers: { Authorization: "Bearer " + accessToken}};
    }

    addURLExtendion(path) {
        this.#url += ("/" + path);
        return this;
    }

    addURLParams(params) {
        let string = "";
        let first = true;
        for (const key in params) {
            let preChar = '&'
            if (first) preChar = "?"
            string += (preChar + key + "=" + params[key])
        }
        this.#url += string;
        return this;
    }

    addMethod(method) {
        this.#properties.method = method;
        return this;
    }

    addFormdata(formdata) {
        this.#properties.body = formdata;
        return this;
    }

    addHeaders(header) {
        this.#properties.headers = {...this.#properties.headers, ...header};
        return this;
    }

    addBodyJson(object) {
        this.#properties.body = JSON.stringify(object)
        return this;
    }

    addBodyString(string) {
        this.#properties.body = string;
        return this;
    }

    logData() {
        console.log(this.#properties);
        return this;
    }

    addEntycpe(enctype) {
        this.#properties.enctype = enctype;
        return this;
    }

    send() {
        return fetch(this.#url, this.#properties);
    }
}


export default RequestBuilder;