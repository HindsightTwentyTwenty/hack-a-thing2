#Starring Webpages: Chrome extension
We built of off the following tutorial:  
https://developer.chrome.com/extensions/getstarted.

We developed a chrome extension that allows the user to save the url of the page
that they are currently viewing to local storage. We hope to expand upon this
feature in our app to allow searching through what Chrome represents as
bookmarks. While Chrome lets you save bookmarks with a simple text description,
we would also like to record the time that the user starred a page so that we
could display saved pages from a certain time period. Upon clicking the
extension icon, a small popup menu appears where the user can view a list of
saved urls as well as the option to save the current page. The urls can also be
cleared from the local storage.

Through this project, we learned how the various components of a chrome extension
fit together, how to create a popup related to a chrome extension, how to pass
messages between background and content scripts, and how to use chrome local
storage. We also re-familiarized ourselves with javascript.

While we have not yet implemented a filter of the local storage based on time,
we have saved the information necessary to complete that feature, and plan to
implement it in the future. There are still some particularities of Chrome
extensions that we need to muddle through, such as the different permissions and
capabilities of background vs. content scripts. We also (obviously) only
implemented the roughest of UIs, which will be improved upon in the future.
