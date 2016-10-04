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
  var urlList = document.getElementById("urlList");
  var urlListString = "";
  for (var i = 0; i < urls.length; i++) {
    console.log(urls[i]);
    var url = urls[i] + ' \n';
    urlListString += url;
  }
  urlList.innerHTML = urlListString;
}

var currUrl;
var savedUrls = [];

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var currentUrl = document.getElementById('currentUrl');
    var newContent = document.createTextNode(url);
    currentUrl.appendChild(newContent);
    currUrl = url;
  });
  chrome.storage.sync.get('urls', function(result) {
    console.log("Stringi "  + JSON.stringify(result));
    savedUrls = result;
    console.log("getting urls: " + JSON.stringify(result.urls));
    // showSavedUrls(savedUrls);
  });
  document.getElementById('clearButton').addEventListener("click", function(){
    console.log("Clearing clicked");
    chrome.storage.sync.clear();
    urlList.innerHTML = "";
  });
  document.getElementById('saveButton').addEventListener("click", function(){
    console.log("Button clicked");
    if (!currUrl) {
      console.log("Error: No URL to save.");
      return;
    }
    var localList = [];
    localList.push(currUrl);
    // savedUrls.push(currUrl);
    console.log("currUrl: " + currUrl);
    chrome.storage.sync.set({'urls' : localList}, function() {
        console.log('Data successfully saved to the storage!');
    });
    showSavedUrls(localList);
  });
})
