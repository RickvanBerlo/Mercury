class RequestBuilder {
    #url
    #properties
    #promise

    constructor(url, repository, id = "") {
        this.#url = url + repository + "/" + id;
        this.#properties = {};
    }

    addMethod(method) {
        this.#properties.method = method;
        return this;
    }

    addHeaders(header) {
        this.#properties.headers = header;
        return this;
    }

    addBody(object) {
        this.#properties.body = JSON.stringify(object)
        return this;
    }

    send() {
        return fetch(this.#url, this.#properties);
    }
}

export default RequestBuilder;