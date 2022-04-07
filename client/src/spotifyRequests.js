// Getting access token from localStorage, if it's empty, make request to server to get & return as promise

import axios from "axios";

export default function spotifyRequests(code) {
    if (localStorage.getItem('access_token') === null || undefined) {
        return axios
            .post("http://localhost:5000/spotify/token", null, {
                params: {
                    code
                }
            })
            .then((response) => {
                window.history.pushState({}, null, "/playlists");
                localStorage.setItem("access_token", response.data.accessToken);
                // localStorage.setItem("refresh_token", response.data.refreshToken);
                // localStorage.setItem("expires_in", response.data.expiresIn);
                return response.data.accessToken;
            })
    };

    let promise = new Promise((res, rej) => {
        res(localStorage.getItem('access_token'))
    })

    return promise;
}