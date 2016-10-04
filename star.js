// star.js
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    var title = tab.title;

    callback({"url": url, "title": title});
  });
}

function showSavedUrls(urls) {
  var urlList = document.getElementById("urlList");
  var urlListString = "";
  for (var i = 0; i < urls.length; i++) {
    var url;
    if (urls[i].title) {
      url = urls[i].title + ' \n'
    } else {
      url = urls[i].string + ' \n';
    }
    urlListString += url;
  }
  urlList.innerHTML = urlListString;
}

var currUrl;
var savedUrls;

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(result) {
    var currentUrl = document.getElementById('currentUrl');
    var newContent = document.createTextNode(result.url);
    currentUrl.appendChild(newContent);
    currUrl = result;
  });
  chrome.storage.sync.get("urls", function(result) {
    if (!result.urls) {
      savedUrls = [];
    } else {
      savedUrls = result.urls;
      showSavedUrls(savedUrls);
    }
  });
  document.getElementById('clearButton').addEventListener("click", function(){
    chrome.storage.sync.remove("urls");
    savedUrls=[];
    showSavedUrls(savedUrls);
  });
  document.getElementById('saveButton').addEventListener("click", function(){
    if (!currUrl.url) {
      console.log('Error: No URL to save.');
      return;
    }
    url = {};
    url.string = currUrl.url;
    url.title = currUrl.title;
    url.time = (new Date(new Date().getTime())).toString();
    var found = false;
    for(var i = 0; i < savedUrls.length; i++) {
      if (savedUrls[i].string === url.string) {
          found = true;
          break;
      }
    }
    if (found) {
      console.log(url.string + ' is already saved');
    } else {
      savedUrls.push(url);
    }
    chrome.storage.sync.set({"urls": savedUrls}, function() {
        console.log('Data successfully saved to the storage!');
      });
    showSavedUrls(savedUrls);
  });
});
