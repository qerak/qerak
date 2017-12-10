chrome.storage.local.get('isArmenian', function(item){
  if(item.isArmenian) {
    document.getElementById('isArmenian').checked = true;
  }
});

chrome.storage.onChanged.addListener(function(changes) {
  document.getElementById('isArmenian').checked = changes['isArmenian'].newValue;
});

document.getElementById('form').addEventListener("submit", function(event) {
  processDataFromWiktionary(document.getElementById('wiktsearchtext').value, function(data) {
    document.getElementById('output').innerHTML = data;
  });
  event.preventDefault();
});

document.getElementById('isArmenian').addEventListener("click", function() {
  chrome.storage.local.set({isArmenian: document.getElementById('isArmenian').checked});
});
