document.getElementById('submit').addEventListener("click", function(event) {
  const word = document.getElementById('wiktsearchtext').value;

  jQuery('#output').html(processDataFromWiktionary(word).output)

  document.getElementById('wiktsearchtext').value = "";
  event.preventDefault();
});
