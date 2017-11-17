document.getElementById('submit').addEventListener("click", function(event) {
  const word = document.getElementById('wiktsearchtext').value;
  const url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20json%20WHERE%20url%3D%22https%3A%2F%2Fhy.wiktionary.org%2Fw%2Fapi.php%3Faction%3Dparse%26page%3D" + word + "%26prop%3Dtext%26format%3Djson%26mobileformat%3Dtrue%26noimages%3Dtrue%22&format=json&diagnostics=true&callback=?";

  $.getJSON(url, function(data) {
    $('#output').html(processDataFromWiktionary(data.query.results.parse.text["_"]))
  });

  document.getElementById('wiktsearchtext').value = "";
  event.preventDefault();
});
