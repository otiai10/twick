var TwS = {
    get: function(key){ return localStorage.getItem(key) || ''; },
    set: function(key,value){
        return localStorage.setItem(key, value);
    }
};
window.onload = function(){
    var hashtags = document.getElementById('hashtags');
    hashtags.value = TwS.get('hashtags');
    hashtags.addEventListener('keyup',function(ev){
        TwS.set('hashtags', this.value);
    });
    var rememberPosition = document.getElementById('rememberPosition');
    rememberPosition.checked = TwS.get('rememberPosition');
    rememberPosition.addEventListener('change',function(ev){
        TwS.set('rememberPosition', this.checked);
    });
}
