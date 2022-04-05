const fs = require('fs');
const readline = require('readline');

class FIleSystemCustom {

    pathToFile;

    constructor(path) {
        this.pathToFile = path;
    }

    createTracksArr() {
        let tracks = fs.readFileSync(this.pathToFile, 'utf-8').toString().split('\r\n');

        return tracks;
    }
}

module.exports = FIleSystemCustom;