const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const spotifyRoute = require('./routes/spotify');
const youtubeRoute = require('./routes/youtube');
const fileRoute = require('./routes/fileSystem');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/spotify', spotifyRoute);

app.use('/youtube', youtubeRoute);

app.use('/file', fileRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})