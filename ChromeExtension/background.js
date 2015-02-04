chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
                hostEquals: "tab.by",
                pathContains: "result2.php"
            }
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});


chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "content_script.js"});
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("Message from a content script:" + sender.tab.url);
        console.log(request.data);
        sendResponse({info: "Message received."});
        chrome.tabs.create({url: "YandexMaps/yandex_maps.html"}, function (tab){
            //TODO Hotfix
            setTimeout(function(){
                chrome.tabs.sendMessage(tab.id, {data: request.data});
            }, 3000);
        });
    });