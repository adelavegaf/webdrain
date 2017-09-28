let currentUrl = '';
let currentUpdateDate = null;
let currentWindowId = 0;

chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        if (chrome.runtime.lastError) {
            console.warn('runtime error', chrome.runtime.lastError);
            // remove currentUrl and currentWindowId?
            return;
        }
        setCurrentUrl(tab.url, 'on activated');
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, updatedTab) => {
    if (!changeInfo.url) {
        return;
    }
    updateCurrentTab();
});

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        console.log('should stop tracking time.');
    } else {
        console.log('should continue tracking time');
        currentWindowId = windowId;
        updateCurrentTab();
    }
});

chrome.windows.onRemoved.addListener((windowId) => {
    console.log('on removed', windowId);
});

function updateCurrentTab() {
    chrome.tabs.query({'active': true}, activeTabs => {
        const activeTab = activeTabs.find(tab => tab.windowId === currentWindowId);
        setCurrentUrl(activeTab.url);
    });
}

function setCurrentUrl(newUrl) {
    console.log('changing current url to:', newUrl);
    currentUrl = new URL(newUrl);
    currentUpdateDate = new Date().getTime();
}