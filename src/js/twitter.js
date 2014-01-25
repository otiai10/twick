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
if (location.href.match(/^https:\/\/twitter.com\/intent\/tweet\/complete.*$/)) {
    chrome.runtime.sendMessage(null,{purpose: 'tweetCompleted'});
}
setInterval(sendTracking, 1000);
