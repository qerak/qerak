const boxTemplate = `<div id="HyText-tooltip-wrap" style="left: {{{X}}}px; top: {{{Y}}}px;">
<img id="HyText-tooltip-pin" style="float:right;width:24px;height:24px;" src="` + chrome.runtime.getURL("resources/pin.png") + `"></img>
{{{TEXT}}}</div>`;
let isPined = false;
const getSelectionCoords = function() {
  let sel = window.getSelection();
  let range;
  let rects;
  let rect;
  let x = 0;
  let y = 0;
  range = sel.getRangeAt(0).cloneRange();
    const span = window.document.createElement("span");
    if (span.getClientRects) {
      span.appendChild( window.document.createTextNode("\u200b") );
      range.insertNode(span);
      rect = span.getClientRects()[0];
      x = rect.left;
      y = rect.top;
      const spanParent = span.parentNode;
      spanParent.removeChild(span);
      spanParent.normalize();
    }
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { x: x + scrollLeft, y: y + scrollTop};
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(!document.getElementById('HyText-tooltip-wrap')) {
      const formatedBox = boxTemplate.replace('{{{X}}}', getSelectionCoords().x)
      .replace('{{{Y}}}', getSelectionCoords().y)
      .replace('{{{TEXT}}}', request);
      const parser = new DOMParser();
      const nodeToInsert = parser.parseFromString(formatedBox, "text/html");
      const wrap = nodeToInsert.getElementById('HyText-tooltip-wrap');
      document.getElementsByTagName("body")[0].appendChild(wrap);
      if(wrap.getBoundingClientRect().bottom > document.documentElement.clientHeight) {
        wrap.style.top = (parseFloat(wrap.style.top) - wrap.getBoundingClientRect().height) + "px";
      }
      if(wrap.getBoundingClientRect().right > document.documentElement.clientWidth) {
        wrap.style.left = (parseFloat(wrap.style.left) - wrap.getBoundingClientRect().width) + "px";
      }
    } else if(document.getElementById('qerak-searchform')) {
      console.log(54)
      document.getElementById('HyText-tooltip-wrap').innerHTML = request;
      chrome.storage.local.set({failBoxValue: 'qerakfailBoxValue'});
    }
  });

let offX;
let offY;
document.addEventListener('click', function(e) {
  if(e.target.id === 'HyText-tooltip-pin') {
    if(isPined) {
      e.target.style = "float: right; width: 24px; height: 24px;";
    } else {
      e.target.style = "background: rgba(0, 0, 0, 0.2);box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 5px; float: right; width: 24px; height: 24px;";
    }
    isPined = !isPined;
  }
  if(document.getElementById('HyText-tooltip-wrap')) {
    let isInside = false;
    e.path.forEach(element => {
      if(element.id === 'HyText-tooltip-wrap') {
        isInside = true;
        return;
      }
    });
    if(!isInside && !isPined) {
      document.getElementById('HyText-tooltip-wrap').outerHTML = "";
    }
  }
});

const moveElement = function(e){
  const div = document.getElementById('HyText-tooltip-wrap');
  div.style.position = 'absolute';
  div.style.top = (e.clientY-offY) + 'px';
  div.style.left = (e.clientX-offX) + 'px';
};

document.addEventListener('mousedown', function(e){
  let isInside = false;
  e.path.forEach(element => {
    if(element.id === 'HyText-tooltip-wrap') {
      isInside = true;
      return;
    }
  });
  if(isInside) {
    const div = document.getElementById('HyText-tooltip-wrap');
    offY = e.clientY-parseInt(div.offsetTop);
    offX = e.clientX-parseInt(div.offsetLeft);
    window.addEventListener('mousemove', moveElement, true);
  }
}, false);

window.addEventListener('mouseup', function(){
  window.removeEventListener('mousemove', moveElement, true);
}, false);

document.getElementsByTagName("body")[0].addEventListener("submit", function(event) {
  if(event.target.id === "qerak-searchform") {
    event.preventDefault();
    chrome.storage.local.set({failBoxValue: document.getElementById('wiktsearchtext').value});
  }
});