const contextMenuItem = {
    "id": "wiktionary",
    "title": "Դիտել բառի բացատրությունը",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickedData) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, clickedData.selectionText, function(response) {
          console.log(response);
        });
      });
})