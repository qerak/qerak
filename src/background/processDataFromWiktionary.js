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
            const el = document.createElement( 'html' );
            el.innerHTML = data.parse.text["*"];
            const basicReplacments = data.parse.text["*"].replace(/(<a href *= *"?)\/wiki\//g, '$1https://hy.wiktionary.org/wiki/');
            processedData = basicReplacments;
        }
        callback(processedData);
    });
}