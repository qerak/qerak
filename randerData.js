const boxTemplate = '<div id="HyText-tooltip-wrap" style="left: {{{X}}}px; top: {{{Y}}}px;">{{{TEXT}}}</div>';
const getSelectionCoords = function() {
    let sel = window.document.selection
    let range;
    let rects
    let rect;
    let x = 0;
    let y = 0;
    if (sel) {
        if (sel.type !== "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }
                x = rect.left;
                y = rect.top;
            }
            if (x === 0 && y === 0) {
                var span = window.document.createElement("span");
                if (span.getClientRects) {
                    span.appendChild( window.document.createTextNode("\u200b") );
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);
                    spanParent.normalize();
                }
            }
        }
    }
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { x: x + scrollLeft, y: y + scrollTop};
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(!document.getElementById('HyText-tooltip-wrap')) {
            const formatedBox = boxTemplate.replace('{{{X}}}', getSelectionCoords().x)
                                            .replace('{{{Y}}}', getSelectionCoords().y)
                                            .replace('{{{TEXT}}}', request);
            const parser = new DOMParser();
            const nodeToInsert = parser.parseFromString(formatedBox, "text/html");
            document.getElementsByTagName("body")[0].appendChild(nodeToInsert.getElementById('HyText-tooltip-wrap'));
        }
        sendResponse(document);
    });

document.addEventListener('click', function(e) {
    if(document.getElementById('HyText-tooltip-wrap')) {
        let isInside = false;
        e.path.forEach(element => {
            if(element.id === 'HyText-tooltip-wrap') {
                isInside = true;
                return;
            }
        });
        if(!isInside) {
            document.getElementById('HyText-tooltip-wrap').outerHTML = "";
        }
    }
})