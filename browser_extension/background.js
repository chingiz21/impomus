chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type != 'FROM_PAGE') return;

    chrome.extension.onConnect.addListener(port => {
        console.log('Connected');
        port.postMessage(msg);
    });
})