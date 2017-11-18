const processDataFromWiktionary = function(word) {
    const processedData = {};
    const url = "https://hy.wiktionary.org/w/api.php?";
    $.getJSON(url, {
        "action": "parse",
        "format": "json",
        "page": word,
        "prop": "text|categories|links|externallinks|sections",
        "wrapoutputclass": "mw-parser-output",
        "disablelimitreport": 1,
        "disableeditsection": 1
    }, function(data) {
        processedData.output = data;
    }); 
    return processedData;
};