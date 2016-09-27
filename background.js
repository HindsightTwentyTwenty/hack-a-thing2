// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    // console.log(activeTab);
    chrome.tabs.sendMessage(activeTab.id, {action: "clicked_browser_action",
      url: activeTab.url});
  });
});
