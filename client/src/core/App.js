import AbstractFactory from "../ServiceFactory/AbstractFactory";

// latest updates on Spotify.js

// NOTE! i'm thinking about creating and using classes in routes-files

const spotifyService = new AbstractFactory('Spotify');
const youtubeService = new AbstractFactory('Youtube');

