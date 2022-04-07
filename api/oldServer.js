const express = require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv');
const { json } = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { google } = require('googleapis');
const axios = require('axios');
const Youtube = require('../impomus/src/ServiceFactory/Youtube.js');
const FIleSystemCustom = require('../impomus/src/core/FileSystem.js');

dotenv.config();

youtube_clientId = process.env.YOUTUBE_CLIENT_ID;
youtube_clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
youtube_redirectUrl = process.env.YOUTUBE_REDIRECT_URI;

let tracks;
let playlist;

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));


app.use(express.json());

const credentials = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:8888/playlists',
};

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/', (req, res) => {
  res.send('good');
  console.log('Hello World!')
})

app.use('/login', (req, res) => {
  var scope = 'user-read-email \
                 user-read-private';

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: credentials.clientId,
    scope: scope,
    redirect_uri: credentials.redirectUri,
  });

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.post('/token', (req, res) => {
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
})

app.post('/refresh', (req, res) => {
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
});

app.use('/youtube-auth', (req, res) => {
  playlist = req.body;

  tracks = playlist.tracks.items.map(item => 
    `${item.track.artists[0].name} - ${item.track.name}`
  );

  const oauth2Client = new google.auth.OAuth2(
    youtube_clientId,
    youtube_clientSecret,
    youtube_redirectUrl
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

  res.send({authorizationUrl});
});

app.use('/youtube-token', async (req, res) => {
  let code = req.query.code;
  let youtube = new Youtube('https://www.googleapis.com/youtube/v3/');

  const arrLength = tracks.length;

  const oauth2Client = new google.auth.OAuth2(
    youtube_clientId,
    youtube_clientSecret,
    youtube_redirectUrl
  );

  const token = await oauth2Client.getToken(code)
    .then(response => {
      return response.tokens.access_token;
    })
    .catch(e => console.error(e.json()));

  try {

    youtube.createPlaylist(playlist.name, playlist.description, token).then(() => youtube.searchAndAddTrack(0, arrLength, tracks, token)).then(response => {
      res.redirect('http://localhost:8888/playlists');
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

/*----------------------------------------------IMPORTING FROM *.txt FILE-------------------------------------------------------------*/

app.use('/file-import', (req, res) => {
  const fs = new FIleSystemCustom('tracks.txt');

  let arr = fs.createTracksArr();

 res.send(arr);
})

/*-------------------------------------------------------------------------------------------------------------------------------*/


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})