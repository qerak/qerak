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
  // if (range.getClientRects) {
  //   range.collapse(true);
  //   rects = range.getClientRects();
  //   if (rects.length > 0) {
  //     rect = rects[0];
  //   }
  //   x = rect.left;
  //   y = rect.top;
  // }
  // if (x === 0 && y === 0) {
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
  // }
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

// document.getElementsByTagName("body")[0].addEventListener("submit", function(event) {
//   if(event.target.id === "form") {
//     event.preventDefault();
//     chrome.runtime.sendMessage({failBoxValue: document.getElementById('wiktsearchtext').value}, function(response) {
//       console.log(response)
//       document.getElementById('output').innerHTML = response.response;
//     });
//   }
// });

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