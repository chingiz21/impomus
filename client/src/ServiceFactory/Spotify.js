import { Request } from "../core/Request";

export class Spotify extends Request {

    fetchParams = {
        method: 'GET',
        headers: {}
    };

    postParams = {
        method: 'POST',
        headers: {}
    };

    constructor() {
        super('https://api.spotify.com/v1');
    }

    async searchAndAddTrack(i, length, tracks, params) {
        if (i > length) return;

        setTimeout(() => {
            this.searchTrack(tracks[i], params.token).then(res => this.addTrackToPlaylist(params));
            this.searchAndAddTrack(i+1, length, tracks, params);
        }, 100);
    }


    getUserPlaylistList = (userId, params) => {
        return this.makeRequest(`users/${userId}/playlists`, params);
    }

    getPlaylist(playlistId, params) {
        return this.makeRequest(`playlists/${playlistId}`, params);
    }


    // {track}: "Und ich rauch - Dante YN"
    async searchTrack(track, params) {
        // Result: "track:Und%20ich%20rauch+artist:Dante%20YN"
        let q = "track:" + track.replace(' - ', '+artist:').replace(/\s/g, '%20') + "&type=track";
        // {params}: {
        //method: "GET",
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        // token: accessToken
        // }
        return await this.makeRequest(`/search?q=${q}`, params)
            .then(response => {
                return response.json();
            })
            .then(res => {
                return res.tracks.items
            })
    }

    async createPlaylist(params) {
        return await fetch(`/users/${params.userId}/playlists`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${params.token}`
            },
            body: {
                "name": `${params.playlistName}`,
                "description": `${params.description}`,
                "public": false
            }
        })
        .then(response => {
            if (response.ok){
                return `Playlist created`;
            }
            return `Fail with creating playlist`;
        })
    }

    async addTrackToPlaylist(params) {
        return await fetch(`/users/${params.userId}/playlists/${params.playlistId}/tracks?uri=${params.trackUri}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${params.token}`
            }
        })
        .then(response => {
            if (response.ok) {
                return `Track added`;
            }
            return `Fail with adding track`;
        })
    }


}