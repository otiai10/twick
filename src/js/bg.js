var Twitter = {
    baseURL: 'https://twitter.com/intent/tweet?',
    genURL: function(tab){
        var parameterString = new Twitter.Params(tab).toString();
        return Twitter.baseURL + parameterString;
    }
};
var Params = Twitter.Params = function(tab){
    this._availableKeys = ['url','via','text','in_reply_to','hashtags','related'];
    this.tab = tab;
    this.params = {
        'text': encodeURIComponent(tab.title),
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
    }
}
chrome.browserAction.onClicked.addListener(function(tab){
    var data = App.getCreateData();
    data.url = Twitter.genURL(tab);
    chrome.windows.create(data);
});
chrome.runtime.onMessage.addListener(function(message,sender){
    if (localStorage.getItem('rememberPosition')) {
        localStorage.setItem('track', JSON.stringify(message.data));
    }
});