document.getElementById('submit').addEventListener("click", function(event) {
  const word = document.getElementById('wiktsearchtext').value;
  const url = "https://hy.wiktionary.org/w/api.php?";

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
    
    const el = document.createElement( 'html' );
    el.innerHTML = data.parse.text["*"];
    const basicReplacments = data.parse.text["*"].replace(/<a [^>]+>([\s\S]*?)(?=<\/a>)<\/a>/gi, '$1')
                                                  .replace()
                                                  .replace()
                                                  .replace()

    $('#output').html(basicReplacments);
    
  }); 

  document.getElementById('wiktsearchtext').value = "";
  event.preventDefault();
});