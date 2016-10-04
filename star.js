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
var savedUrls;

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    var currentUrl = document.getElementById('currentUrl');
    var newContent = document.createTextNode(url);
    currentUrl.appendChild(newContent);
    currUrl = url;
  });
  chrome.storage.sync.get("urls", function(result) {
    if (!result.urls) {
      savedUrls = [];
      console.log("No urls were saved. Creating empty array.")
    } else {
      savedUrls = result.urls;
      console.log("Getting saved urls: " + JSON.stringify(savedUrls));
      showSavedUrls(savedUrls);
    }
  });
  document.getElementById('clearButton').addEventListener("click", function(){
    chrome.storage.sync.remove("urls");
    savedUrls=[];
    showSavedUrls(savedUrls);
  });
  document.getElementById('saveButton').addEventListener("click", function(){
    if (!currUrl) {
      console.log("Error: No URL to save.");
      return;
    }
    savedUrls.push(currUrl);
    chrome.storage.sync.set({"urls": savedUrls}, function() {
        console.log('Data successfully saved to the storage!');
    });
    showSavedUrls(savedUrls);
  });
})
