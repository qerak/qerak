let isCapsLock = false;
let isShiftPressed = false;
document.addEventListener('keydown', function(event) {
  isCapsLock = event.getModifierState && event.getModifierState("CapsLock");
  isShiftPressed = event.getModifierState && event.getModifierState("Shift");
});

//Ստեղնաշարի դասավորվածությունը համապատասխանում է «Arman High Foundation»-ի կողմից ստեղծված և տարածվող Հայերեն հնչյունակազմական UNICODE ստեղնաշարին:
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
    "r": ["ր", "Ր"],
    "s": ["ս", "Ս"],
    "t": ["տ", "Տ"],
    "u": ["ու", "Ու"],
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
    "7": ["և", "Եվ"],
    "8": ["ռ", "Ռ"],
    "9": ["չ", "Չ"],
    "0": ["ճ", "Ճ"],
    "!": "Է",
    "@": "Թ",
    "#": "Փ",
    "$": "Ձ",
    "%": "Ջ",
    "^": "Ւ",
    "&": "Եվ",
    "*": "Ռ",
    "(": "Չ",
    ")": "Ճ",
    "`": "՝",
    "-": "-",
    "=": "ժ",
    "[": "խ",
    "]": "ծ",
    "\\": "շ",
    ";": ";",
    "'": "՚",
    ",": ",",
    ".": ".",
    "/": "/",
    "~": "՜",
    "_": "()",
    "+": "Ժ",
    "{": "Խ",
    "}": "Ծ",
    "|": "Շ",
    ":": ":",
    "\"": "՛",
    "<": "«",
    ">": "»",
    "?": "՞"
  },
  convert: function(text) {
    let result = "";
    let j;
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
