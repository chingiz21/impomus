chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type != 'FROM_PAGE') return;

    // console.log('message received: ' + JSON.stringify(msg));
    
    chrome.extension.onConnect.addListener(port => {
        console.log('Connected');
        port.postMessage(msg);
    });

    sendResponse({
        response: "msg received(background.js)"
    });
})




