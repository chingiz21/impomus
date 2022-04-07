const router = require('express').Router();
const dotenv = require('dotenv');
const spotifyWebApi = require('spotify-web-api-node');
dotenv.config();
const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
};

router.get('/login', (req, res) => {
    var scope = 'user-read-email \
                 user-read-private \
                 playlist-read-private';

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: credentials.clientId,
        scope: scope,
        redirect_uri: credentials.redirectUri,
    });

    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

router.post('/token', (req, res) => {
    let spotifyApi = new spotifyWebApi(credentials)
    const code = req.query.code

    spotifyApi.authorizationCodeGrant(code).then((data) => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400)
        })
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi(credentials);

    spotifyApi.refreshAccessToken()
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch(e => {
            console.log(e);
            res.sendStatus(400);
        })
})

module.exports = router;