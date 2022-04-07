const router = require('express').Router();

router.get('/import', (req, res) => {
    const fs = new FIleSystemCustom('tracks.txt');

    let arr = fs.createTracksArr();

    res.send(arr);
})

module.exports = router;