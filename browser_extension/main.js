/*----------------------------------------------------------Slider Part------------------------------------------------------------------------------ */

let offset = 0;
const sliderLine = document.querySelector('.slider-line');
const btnNext = document.querySelectorAll('.btnNext');
const btnPrev = document.querySelectorAll('.btnPrev');

btnNext.forEach((btn) => {
    btn.addEventListener('click', () => {
        offset += 400;
        if (offset > 1200) {
            offset = 0;
        }
        sliderLine.style.left = -offset + 'px';
    })
})

btnPrev.forEach((btn) => {
    btn.addEventListener('click', () => {
        offset -= 400;
        if (offset < 0) {
            offset = -1200;
        }
        sliderLine.style.left = -offset + 'px';
    })
})

/*---------------------------------------------------------------------------------------------------------------------------------------- */




/*------------------------------------------------------Tile choose---------------------------------------------------------------------------------- */

// const yandexTile = document.querySelector('.yandex-tile');
// const vkTile = document.querySelector('.vk-tile');
// let tile = 'yandex';

// yandexTile.addEventListener('click', () => {
//     yandexTile.classList.toggle('chosen');
//     tile = 'yandex';
//     console.log(tile);
// })


// vkTile.addEventListener('click', () => {
//     vkTile.classList.toggle('chosen');
//     tile = 'vk';
//     console.log(tile)
// })

/*---------------------------------------------------------------------------------------------------------------------------------------- */




/*----------------------------------------------------------Copy button logic------------------------------------------------------------------------------ */

const copyBtn = document.querySelector('.copy-btn');

function copyText() {
    let copyText = document.getElementById('tracks-textarea');

    copyText.select();

    document.execCommand('copy');
}

copyBtn.addEventListener('click', () => {
    copyText();
})

/*---------------------------------------------------------------------------------------------------------------------------------------- */




/*------------------------------------------------------------Parsing logic---------------------------------------------------------------------------- */
const parseBtn = document.querySelector('.btn-parse');
const textArea = document.getElementById('tracks-textarea');
let arrTracks = [];

var port = chrome.extension.connect({
    name: "comm"
});


port.onMessage.addListener(msg => {
    // console.log('message received: ' + JSON.stringify(msg.tracksArr));
    arrTracks = msg.tracksArr;
})



parseBtn.addEventListener('click', () => {
    arrTracks.forEach(item => {
        textArea.value += item + "\n";
    })
})