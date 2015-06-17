var Twitter = {
    baseURL: 'https://twitter.com/intent/tweet?twick=true&',
    genURL: function(tab){
        var parameterString = new Twitter.Params(tab).toString();
        return Twitter.baseURL + parameterString;
    }
};
var Params = Twitter.Params = function(tab, selected){
    this._availableKeys = ['url','via','text','in_reply_to','hashtags','related'];
    this.tab = tab;
    this.params = {
        'text': function(tab) {
            var text = (tab.selectedText) ? '“' + tab.selectedText + '” / ' : '';
            return encodeURIComponent(text + tab.title);
        }(tab),
        'url': encodeURIComponent(tab.url),
        'hashtags': App.getHashtags()
    };
};
Params.prototype.toString = function(){
    var pstr = '';
    for (var key in this.params) {
        pstr += String(key) + '=' + String(this.params[key]);
        pstr += '&';
    }
    return pstr;
};
var App = {
    getHashtags: function(){
        return localStorage.getItem('hashtags') || '';
    },
    getCreateData: function(){
        var track = JSON.parse(localStorage.getItem('track') || null) || {};
        track.position = track.position || {left:100,top:100};
        track.size     = track.size     || {width:550,height:380};
        return {
            width:  track.width || 550,
            height: track.height|| 380,
            left:   track.left  || 0,
            top:    track.top   || 0,
            type:   'popup'
        };
    },
    twitterIntentWindowId: null
}
chrome.browserAction.onClicked.addListener(function(tab){
    var data = App.getCreateData();
    chrome.tabs.executeScript(tab.id, {
        code: 'window.getSelection().toString();'
    }, function(text) {
        tab.selectedText = (text) ? text[0] : '';
        data.url = Twitter.genURL(tab);
        chrome.windows.create(data,function(win){
            App.twitterIntentWindowId = win.id;
        });
    });
});
chrome.runtime.onMessage.addListener(function(message,sender){
    if (message.purpose == 'tweetCompleted') {
        setTimeout(function(){
            if (! App.twitterIntentWindowId) return;
            chrome.windows.remove(App.twitterIntentWindowId);
        },1000);
    }
    if (message.purpose == 'track') {
        if (! localStorage.getItem('rememberPosition')) return;
        localStorage.setItem('track', JSON.stringify(message.data));
    }
});
