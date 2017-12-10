const init = function() {
    chrome.storage.local.get("enToHyMap", function(obj) {
        if(obj.length !== 0) {
            const map = JSON.parse(obj["enToHyMap"]);
            for(const key in map) {
                if(typeof map[key] === "string") {
                    document.getElementById(key).innerText = map[key];
                } else {
                    document.getElementById(key).innerText = map[key][0];
                    document.getElementById(key).innerText = map[key][1];
                }
            }
        }
    });
};
init();
document.getElementById("saveKeyboard").addEventListener("click", function(e) {
    chrome.storage.local.get("enToHyMap", function(obj) {
        const map = JSON.parse(obj["enToHyMap"]);
        for(const key in map) {
            if(typeof map[key] === "string") {
                map[key] = document.getElementById(key).innerText;
            } else {
                map[key][0] = document.getElementById(key).innerText;
                map[key][1] = document.getElementById(key).innerText;
            }
        }
    })
});