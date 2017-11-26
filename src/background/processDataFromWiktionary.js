function processDataFromWiktionary(word, callback) {
    const url = "https://hy.wiktionary.org/w/api.php?";
    let processedData = "Ցավոք չհաջողվեց որևէ բան գտնել ։/";
    word = findRootWord(word);
    $.getJSON(url, {
        "action": "parse",
        "format": "json",
        "page": word,
        "prop": "text|categories|links|externallinks|sections",
        "wrapoutputclass": "mw-parser-output",
        "disablelimitreport": 1,
        "disableeditsection": 1,
        "disabletoc": 1
    }, function(data) {
        if(!data.error) {
            const basicReplacments = data.parse.text["*"].replace(/(<a href *= *"?)\/wiki\//g, '$1https://hy.wiktionary.org/wiki/')
                                    .replace(/<h(\d)>.+?(?=<\/h\1>)<\/h\1>\s*<h\1/g, '<h$1');
            const itemDocument = document.implementation.createHTMLDocument('Wiktionary');
            itemDocument.body.innerHTML = basicReplacments;
            
            for(let i = 0; i < itemDocument.getElementsByTagName('*').length; i++) {
                if(/^\s*$/.test(itemDocument.getElementsByTagName('*')[i].textContent)) {
                    itemDocument.getElementsByTagName('*')[i].parentNode.removeChild(itemDocument.getElementsByTagName('*')[i]);
                    i = i - 1;
                }
            }
            processedData = itemDocument.body.innerHTML;
        }
        callback(processedData);
    });
}