function processDataFromWiktionary(word, callback) {
    const url = "https://hy.wiktionary.org/w/api.php?";
    let processedData = "Ցավոք չհաջողվեց որևէ բան գտնել ։/";
    const t0 = performance.now();
    word = findRootWord(word);
    const t1 = performance.now();
    console.log("Call to findRootWord took " + (t1 - t0) + " milliseconds.")
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
            console.log('as')
            const el = document.createElement( 'html' );
            el.innerHTML = data.parse.text["*"];
            const basicReplacments = data.parse.text["*"].replace(/<a [^>]+>([\s\S]*?)(?=<\/a>)<\/a>/gi, '$1')
                                                        .replace()
                                                        .replace()
                                                        .replace()
            processedData = basicReplacments;
        }
        callback(processedData);
    })
};