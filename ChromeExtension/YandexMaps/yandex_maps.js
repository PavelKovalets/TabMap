console.log("Hello from maps!");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message from the extension:");
        console.log(request.data);
    });