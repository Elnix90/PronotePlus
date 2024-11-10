let isBlocking = true;

browser.storage.sync.get('blocking', function(data) {
  isBlocking = data.blocking !== undefined ? data.blocking : true;
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getState") {
    sendResponse({blocking: isBlocking});
  } else if (request.action === "setState") {
    isBlocking = request.blocking;
    browser.storage.sync.set({blocking: isBlocking});
    browser.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        browser.tabs.sendMessage(tab.id, {action: "updateState", blocking: isBlocking});
      });
    });
  }
});
