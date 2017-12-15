const contextMenuItem = {
  "id": "wiktionary",
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
      "1": ["է", "Է"],
      "2": ["թ", "Թ"],
      "3": ["փ", "Փ"],
      "4": ["ձ", "Ձ"],
      "5": ["ջ", "Ջ"],
      "6": ["ւ", "Ւ"],
      "7": ["և", "և"],
      "8": ["ր", "Ր"],
      "9": ["չ", "Չ"],
      "0": ["ճ", "Ճ"],
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
  chrome.browserAction.setBadgeText({
    text: (changes['isArmenian'].newValue) ? "HY" : ""
  });
});
