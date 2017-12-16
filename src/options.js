let isCapsLock = false;
const init = function() {
    chrome.storage.local.get("enToHyMap", function(obj) {
        if(obj.length !== 0) {
            const map = JSON.parse(obj.enToHyMap);
            for(const key in map) {
                if(typeof map[key] === "string") {
                    document.getElementById(key).innerText = map[key];
                } else {
                    document.getElementById(key).innerText = map[key][0];
                    document.getElementById(key.toLocaleUpperCase()).innerText = map[key][1];
                }
            }
        }
    });
};
init();
document.getElementsByClassName("capslock")[0].addEventListener("click", function(e) {
    isCapsLock = !isCapsLock;
    const lowerKeys = document.getElementsByClassName("lower");
    const upperKeys = document.getElementsByClassName("upper");
    for(let i = 0; i < lowerKeys.length; i++) {
        if(!isCapsLock) {
            lowerKeys[i].style.display = "block";
        } else {
            lowerKeys[i].style.display = "none";
        }
    }
    for(let i = 0; i < upperKeys.length; i++) {
        if(isCapsLock) {
            upperKeys[i].style.display = "block";
        } else {
            upperKeys[i].style.display = "none";
        }
    }
})
const setCaret = function(target, position){
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(selection.focusNode, position);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}
document.getElementById("container").addEventListener("input", function(e) {
    e.target.innerText = e.target.innerText[e.target.innerText.length-1];
    setCaret(e.target, 1);
});
document.getElementById("saveKeyboard").addEventListener("click", function(e) {
    chrome.storage.local.get("enToHyMap", function(obj) {
        const map = JSON.parse(obj.enToHyMap);
        for(const key in map) {
            if(typeof map[key] === "string") {
                map[key] = document.getElementById(key).innerText;
            } else {
                map[key][0] = document.getElementById(key).innerText;
                map[key][1] = document.getElementById(key).innerText;
            }
        }
    });
});