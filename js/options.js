const buttonDiv = document.getElementById('buttonDiv');

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(urlArray) {
    urlArray.forEach(function (url)  {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.style.backgroundColor = url;
        button.addEventListener('click', function () {
            chrome.storage.sync.set({color: url}, function () {
                console.log(`color is  ${url}`);
            });
        });
        li.appendChild(button);
        buttonDiv.appendChild(li);
    });
}

constructOptions(kButtonColors);