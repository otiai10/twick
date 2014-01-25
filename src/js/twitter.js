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
setInterval(sendTracking, 1000);
