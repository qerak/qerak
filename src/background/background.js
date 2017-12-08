const contextMenuItem = {
  "id": "wiktionary",
  "title": "Դիտել բառի բացատրությունը",
  "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickedData) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    processDataFromWiktionary(clickedData.selectionText, function(processedData) {
      chrome.tabs.sendMessage(tabs[0].id, processedData, function(response) {
        //TODO
      });
    });
  });
});

chrome.commands.onCommand.addListener(function(command) {
  if(command === "toggleHyKeys") {
    chrome.storage.local.get('isArmenian', function(item){
      chrome.storage.local.set({isArmenian: !item.isArmenian});
    });
  }
});


chrome.storage.local.get('isArmenian', function(item){
  if(item.isArmenian) {
    chrome.browserAction.setBadgeText({
      text: "HY"
    });
  }
});

chrome.storage.onChanged.addListener(function(changes) {
  chrome.browserAction.setBadgeText({
    text: (changes['isArmenian'].newValue) ? "HY" : ""
  });
});
