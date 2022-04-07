const axios = require('axios');

class Youtube {
    playlistId;

    _baseUrl;

    constructor(url) {
        this._baseUrl = url;
    };

    async delay(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      };

    async searchAndAddTrack(i, length, array, token) {
        if (i > length-1) {
            return;
        }

        setTimeout(() => {
            this.searchTrack(array[i], token).then((response) => this.addTrack(response, this.playlistId, token));
            this.searchAndAddTrack(i+1, length, array, token);
        }, 1000);

    }

    async createPlaylist(title, description, token) {
        try {
            return await axios.post('https://youtube.googleapis.com/youtube/v3/playlists?part=snippet', {
                'snippet': {
                    'title': title,
                    'description': description
                }
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    this.playlistId = response.data.id;
                })
        } catch (e) {
            console.error(`Error at creating playlist: ${e}`);
        }
    }

    async addTrack(track, playlistId, token) {
        await axios.post('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet',
            {
                'snippet': {
                    'playlistId': playlistId,
                    'position': 0,
                    "resourceId": track
                }
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                console.log('Track added!' + response.data.snippet.title);
            })
            .catch(e => console.error(e));
    }

    async searchTrack(query, token) {
        let formatted = query.replace(/\s/g, '%20');

        let track = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${formatted}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                return response.data.items[0].id;
            })
            .catch(e => console.error(e));

        console.log(track)

        return track;
    }
}

module.exports = Youtube;

/*-------------------------HOW TO MAKE ITERATION ASYNC---------------------------------------- */

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// function delay(ms) {
//   return new Promise(resolve => {
//     setTimeout(resolve, ms);
//   })
// }

// function createPlaylist() {
//   return delay(100).then(() => console.log('create'));
// }

// function searchTrack() {
//   return delay(100).then(() => console.log('search'));
// }

// function addTrack() {
//   return delay(100).then(() => console.log('add'));
// }

// const doAll = i => {
//     if (i > arr.length) {
//         return;
//     }

//             setTimeout(() => {
//                searchTrack().then(() => addTrack());
//                doAll(i+1);
//             }, 2000)
// }

// createPlaylist().then(() => doAll(0));