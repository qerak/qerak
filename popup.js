chrome.storage.local.get('isArmenian', function(item){
  if(item.isArmenian) {
    document.getElementById('isArmenian').checked = true;
  }
});
document.getElementById('submit').addEventListener("click", function(event) {
  const word = document.getElementById('wiktsearchtext').value;



  document.getElementById('wiktsearchtext').value = "";
  event.preventDefault();
});

document.getElementById('isArmenian').addEventListener("click", function() {
  chrome.storage.local.set({isArmenian: document.getElementById('isArmenian').checked});
});
