define("gravatar", ["md5"], function (md5) {
    return function getGravatar(email, size){
        size = size || 50;
        return "http://www.gravatar.com/avatar/"+md5(email)+"?s="+size;
    };
});