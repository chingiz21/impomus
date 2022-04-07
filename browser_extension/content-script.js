window.addEventListener('load', () => {
    let arrTracks = [];
    const container = document.querySelector('.page-playlist__tracks-list > div > div');
    
    // very ugly regExp, but that was my first try
    // 1. replace all cyrillic symbols
    // 2. replace everything, starting from comma
    // 3. replace all spaces at start & end of string
    // 4. replace all double spaces inside string to ' - '
    container.childNodes.forEach(node => {
        arrTracks.push(node.textContent.replace(/[а-яА-Я]/g, '').replace(/,.*/, "").trim().replace('  ', ' - ').replace('« ', '').replace('»', ''));
    })

    chrome.runtime.sendMessage({ type: 'FROM_PAGE', tracksArr: arrTracks });
});