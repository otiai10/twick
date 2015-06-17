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
    area = area[0];
    var end = area.value.indexOf('” /'); 
    end = (end < 0) ? area.selectionEnd : end + 1;
    area.setSelectionRange(0, end);
};
if (location.href.match(/^https:\/\/twitter.com\/intent\/tweet\/complete.*$/)) {
    chrome.runtime.sendMessage(null,{purpose: 'tweetCompleted'});
}
setInterval(sendTracking, 1000);
setTimeout(moveCursorOnTheTop, 0);
