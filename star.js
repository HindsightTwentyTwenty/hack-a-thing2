// star.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('got message');
    if( request.action === "clicked_browser_action" ) {
      var starContainer = document.getElementById('starContainer');
      var newContent = document.createTextNode(request.url);
      starContainer.appendChild(newContent);
    }
  }
);
