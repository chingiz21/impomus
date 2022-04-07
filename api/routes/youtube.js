const router = require('express').Router();
const dotenv = require('dotenv');
const { google } = require('googleapis');
const Youtube = require('../core/Youtube');
dotenv.config();

let tracks;
let playlist;

router.use('/login', (req, res) => {
    playlist = req.body;

    tracks = playlist.tracks.items.map(item =>
        `${item.track.artists[0].name} - ${item.track.name}`
    );

    const oauth2Client = new google.auth.OAuth2(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUTUBE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI
    );

    const scopes = [
        'https://www.googleapis.com/auth/youtube'
    ];

    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    });

    let userCredential = null;

    res.send({ authorizationUrl });
});

router.use('/import', async (req, res) => {
    let code = req.query.code;
    let youtube = new Youtube('https://www.googleapis.com/youtube/v3/');

    const arrLength = tracks.length;

    const oauth2Client = new google.auth.OAuth2(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUTUBE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI
    );

    const token = await oauth2Client.getToken(code)
        .then(response => {
            return response.tokens.access_token;
        })
        .catch(e => console.error(e.json()));

    try {

        youtube.createPlaylist(playlist.name, playlist.description, token).then(() => youtube.searchAndAddTrack(0, arrLength, tracks, token)).then(response => {
            res.redirect('http://localhost:3000/playlists');
        })

        /* ---------------------EXAMPLE OF SEARCHING TRACK--------------------- */
        // youtube.searchTrack("Patience - Nas", token)
        //   .then(response => console.log(response.data))
        //   .catch(e => res.send(e));
        /*-----------------------------------------------------------------------------*/

        /* ---------------------EXAMPLE OF SEARCHING & ADDING TRACK--------------------- */

        // youtube.searchTrack("Hoodrich Pablo Juan - We don't luv em", token)
        //   .then(res => {
        //     youtube.addTrack(res, playlistId, token).catch(e => console.error(e));
        //   })
        //   .catch(e => console.error(e));

        /*-----------------------------------------------------------------------------*/
        /* ---------------------EXAMPLE OF ADDING TRACK--------------------- */

        // youtube.addTrack({"kind":"youtube#video","videoId":"0KmS5gk4ve4"}, playlistId token)
        //   .then(res => console.log(res))
        //   .catch(e => console.error(e));
        /*-----------------------------------------------------------------------------*/

    } catch (error) {
        console.error(error);
    }
})


module.exports = router;