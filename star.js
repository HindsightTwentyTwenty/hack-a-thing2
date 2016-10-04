// star.js
// followed tutorial from: https://developer.chrome.com/extensions/getstarted
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    callback(url);
  });
}
function showSavedUrls(urls) {
  console.log("Trying to save");
  var savedUrlContainer = document.getElementById("starContainer");
  // console.log("urls.data: " + urls.data);
  for (var i = 0; i < urls.data.length; i++) {
    console.log(urls.data[i].currUrl);
    var url = document.createTextNode(urls.data[i].currUrl + '\n');
    savedUrlContainer.appendChild(url);
  }
}

var currUrl;
var savedUrls;
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var currentUrl = document.getElementById('currentUrl');
    var newContent = document.createTextNode(url);
    currentUrl.appendChild(newContent);
    currUrl = url;
  });
  chrome.storage.sync.get(function(urls) {
    savedUrls = urls;
    console.log("getting urls: " + urls);
    showSavedUrls(savedUrls);
  });
  document.getElementById('saveButton').addEventListener("click", function(){
    console.log("Button clicked");
    if (!currUrl) {
      console.log("Error: No URL to save.");
      return;
    }
    // http://stackoverflow.com/questions/27879835/adding-new-objects-to-chrome-local-storage
    // chrome.storage.sync.get(function(urls) {
    //   if (Object.keys(urls).length > 0 && urls.data) {
    //       urls.data.push({currUrl: currUrl});
    //   } else {
    //       urls.data = [{currUrl: currUrl}];
    //   }
    savedUrls.data.push({currUrl: currUrl});
    console.log("currUrl: " + currUrl);
    chrome.storage.sync.set(savedUrls, function() {
        console.log('Data successfully saved to the storage!');
    });
    showSavedUrls(savedUrls);
  });
})
