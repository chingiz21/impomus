function AbstractFactory(service) {
    switch (service){
        case 'Spotify':
            return new SpotifyFactory();
        case 'Youtube':
            return new YoutubeFactory();    
    }
}

export default AbstractFactory;