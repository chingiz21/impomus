const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const { json } = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios');
const Youtube = require('../impomus/src/ServiceFactory/Youtube.js');
const FIleSystemCustom = require('../impomus/src/core/FileSystem.js');
const spotifyRoute = require('./routes/spotify');
const youtubeRoute = require('./routes/youtube');

const servicesRoute = require('./routes/services');

dotenv.config();



const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));


app.use(express.json());

app.use('/api', servicesRoute);

app.use('/spotify', spotifyRoute);

app.use('/youtube', youtubeRoute);

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