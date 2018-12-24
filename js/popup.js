function getAllTabUrls(callback) {
    chrome.tabs.query({ url: "*://*/*"}, function(tabs) {
        const tabUrls = {};
        tabs.forEach(function (tab) {
            tabUrls[tab.url] = tab.id;
        });
        console.log(tabUrls);
        return callback(tabUrls);
    });
}

function goTo(tabId) {
    chrome.tabs.update(tabId, {active: true});
    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    getAllTabUrls(function (urls) {
        const tabList = urls;
        document.querySelectorAll('ul.docks > a').forEach(function (dock) {
            const dockUrl = new URL(dock.attributes.href.value);
            const found = Object.keys(tabList).find(function (tab) {
                return tab.match(dockUrl.hostname);
            });
            if (found !== undefined) {
                console.log(dock);
                // dock.onclick = goTo(tabList[found]);
                dock.addEventListener('click', function () {
                    goTo(tabList[found]);
                });
                dock.childNodes[1].setAttribute('class', 'active dock');
            }
        });
    });
});