let currentUrl = '';
let lastUpdateDate = null;
let currentWindowId = 0;

chrome.tabs.onActivated.addListener(activeInfo => {
    console.log('on activated');
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        if (chrome.runtime.lastError) {
            console.warn('runtime error', chrome.runtime.lastError);
            updateTimeSpentInWebsite(currentUrl);
            stopTrackingTime();
            return;
        }
        setCurrentUrl(tab.url);
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, updatedTab) => {
    if (!changeInfo.url) {
        return;
    }
    console.log('on updated');
    updateCurrentTab();
});

chrome.windows.onFocusChanged.addListener(windowId => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        // update y ponlo como null.
        console.log('should stop tracking time.');
        updateTimeSpentInWebsite(currentUrl);
        stopTrackingTime();
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
    updateTimeSpentInWebsite(currentUrl);
    currentUrl = new URL(newUrl);
}

function updateTimeSpentInWebsite(url) {
    const currentDate = new Date().getTime();
    if (lastUpdateDate && currentUrl) {
        const timeSpent = (currentDate - lastUpdateDate) / 1000;
        console.log('spent', timeSpent, 's in', url);
    }
    lastUpdateDate = currentDate;
}

function stopTrackingTime() {
    lastUpdateDate = null;
    currentUrl = '';
}