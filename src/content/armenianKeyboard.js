let isCapsLock = false;
let isShiftPressed = false;
document.addEventListener('keydown', function(event) {
  isCapsLock = event.getModifierState && event.getModifierState("CapsLock");
  isShiftPressed = event.getModifierState && event.getModifierState("Shift");
});

const enToHy = {
  map: {
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
  },
  convert: function(text) {
    let result = "";
    let j;
    console.log(isCapsLock || isShiftPressed)
    if(isCapsLock || isShiftPressed){
      j = 1;
    } else {
      j = 0;
    } 
    for(let i = 0; i < text.length; i++) {
      if(typeof this["map"][text[i]] === "string") {
        result += this["map"][text[i]];
      } else if(this["map"][text[i].toLowerCase()]) {
        result += this["map"][text[i].toLowerCase()][j];
      }
    }
    if(result === "") {
      return text;
    } else {
      return result;
    }
  }
};

chrome.storage.local.get("enToHyMap", function(obj) {
  if(obj.length !== 0) {
    enToHy.map = JSON.parse(obj.enToHyMap);
  }
});
const isContentEditable = function (target) {
  return target.contentEditable === "true";
}

const setCaret = function(target, position){
  if(target.setSelectionRange != undefined) {
    target.setSelectionRange(position, position);
  } else if(isContentEditable(target)){
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(selection.focusNode, position);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

const getCaret = function(target) {
  if(target.selectionStart !== undefined) {
    return target.selectionStart;
  }
  if(isContentEditable(target)){
    const selection = window.getSelection();
    if (selection.rangeCount) {
      return selection.getRangeAt(0).endOffset;
    }
  }
  return null;
};

const getValue = function(target){
  if(target.value !== undefined){
    return target.value;
  }

  if(isContentEditable(target)){
    const selection = window.getSelection();
    return selection.focusNode.textContent;
  }
  return null;
};

const setValue = function(target, value){
  if(target.value !== undefined) {
    target.value = value;
  } else if(isContentEditable(target)){
    const selection = window.getSelection();
    selection.focusNode.textContent = value;
  }
};

const inputEventHandler = function(e) {
  
  if(e.inputType === "insertFromPaste" || e.inputType === "deleteContentForward" || e.inputType === "deleteContentBackward") {
    return;
  }
  
  const value = getValue(e.target);
  //START: cases to skip
  if (value === null) {
    return;
  }

  const end = getCaret(e.target);
  if (end === null){
    return;
  };
  //END: cases to skip
  let start = Math.max(end - 3, 0);

  for (let i = end - 1; i >= start; --i){
    if (!/[\dA-z`~\-_=!@#$%\^\&\*\+\)\(\\\|\]\[\{\}"':;<>,\.\/\?]/.test(value[i])) {
      start = i + 1;
      break;
    }
  }
  const text = value.substring(start, end);

  const converted = enToHy.convert(text);

  setValue(e.target, value.substring(0, start) + converted + value.substring(end));
  setCaret(e.target, end - text.length + converted.length);
  ///////
}
document.addEventListener("input", function(e) {
  chrome.storage.local.get('isArmenian', function(item){
    if(item.isArmenian) {
      inputEventHandler(e);
    }
  });
});