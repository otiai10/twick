var sendTracking = function(){
    var message = {
        purpose: 'track',
        data: {
            width: window.innerWidth,
            height: window.innerHeight,
            left: window.screenLeft,
            top: window.screenTop
        }
    };
    chrome.runtime.sendMessage(null, message);
};
var moveCursorOnTheTop = function() {
    var area = document.getElementsByTagName('textarea');
    if (!area) return;
    area[0].setSelectionRange(0, area[0].value.indexOf('” /') + 1);
};
if (location.href.match(/^https:\/\/twitter.com\/intent\/tweet\/complete.*$/)) {
    chrome.runtime.sendMessage(null,{purpose: 'tweetCompleted'});
}
setInterval(sendTracking, 1000);
setTimeout(moveCursorOnTheTop, 0);
