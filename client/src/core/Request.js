import qs from 'qs';

export class Request {
    baseurl;

    constructor(url) {
        this.baseurl = url;
    }

    async makeRequest(endpoint, params = {}) {
        //${qs.stringify(params.data)}
        let url = `${this.baseurl}/${endpoint}`;

        const result = await fetch(url, {
            method: params.method,
            headers: {
                'Accept': params.headers.Accept,
                'Content-Type': params.headers.ContentType,
                'Authorization': `Bearer ${params.token}`
            }
        }).then(response => {
            return response.json();
        })
        .then(responseData => {
            return responseData
        })

        // if (!result.ok) {
        //     return {error: result.json()};
        // }

        return result;
    }
}