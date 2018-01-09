const contextMenuItem = {
  "id": "qerakMenu",
  "title": "Դիտել բառի բացատրությունը",
  "contexts": ["selection"]
};
chrome.runtime.onInstalled.addListener(function(details) {
  if(details.reason == "install"){
    chrome.storage.local.set({"enToHyMap": JSON.stringify({
      "a": ["ա", "Ա"],
      "b": ["բ", "Բ"],
      "c": ["ց", "Ց"],
      "d": ["դ", "Դ"],
      "e": ["ե", "Ե"],
      "f": ["ֆ", "Ֆ"],
      "g": ["գ", "Գ"],
      "h": ["հ", "Հ"],
      "i": ["ի", "Ի"],
      "j": ["յ", "Յ"],
      "k": ["կ", "Կ"],
      "l": ["լ", "Լ"],
      "m": ["մ", "Մ"],
      "n": ["ն", "Ն"],
      "o": ["օ", "Օ"],
      "p": ["պ", "Պ"],
      "q": ["ք", "Ք"],
      "r": ["ռ", "Ռ"],
      "s": ["ս", "Ս"],
      "t": ["տ", "Տ"],
      "u": ["ւ", "Ւ"],
      "v": ["վ", "Վ"],
      "w": ["ո", "Ո"],
      "x": ["ղ", "Ղ"],
      "y": ["ը", "Ը"],
      "z": ["զ", "Զ"],
      "1": "է",
      "2": "թ",
      "3": "փ",
      "4": "ձ",
      "5": "ջ",
      "6": "ւ",
      "7": "և",
      "8": "ր",
      "9": "չ",
      "0": "ճ",
      "!": "Է",
      "@": "Թ",
      "#": "Փ",
      "$": "Ձ",
      "%": "Ջ",
      "^": "Ւ",
      "&": "և",
      "*": "Ր",
      "(": "Չ",
      ")": "Ճ",
      "`": "՝",
      "-": "-",
      "=": "ժ",
      "[": "խ",
      "]": "ծ",
      "\\": "շ",
      ";": "․",
      "'": "՛",
      ",": ",",
      ".": ".",
      "/": "/",
      "~": "՜",
      "_": "—",
      "+": "Ժ",
      "{": "Խ",
      "}": "Ծ",
      "|": "Շ",
      ":": "։",
      "\"": "՚",
      "<": "«",
      ">": "»",
      "?": "՞"
    })})
  }
});
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
  if(changes['isArmenian']) {
    chrome.browserAction.setBadgeText({
      text: (changes['isArmenian'].newValue) ? "HY" : ""
    });
  }
});

chrome.storage.onChanged.addListener(function(changes) {
  console.log(575)
  chrome.storage.local.get('failBoxValue', function(items){
    if(items.failBoxValue !== 'qerakfailBoxValue') {
      console.log(55)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        processDataFromWiktionary(items.failBoxValue, function(processedData) {
          chrome.tabs.sendMessage(tabs[0].id, processedData, function(response) {
            //TODO
          });
        });
      });
    }
  })
});