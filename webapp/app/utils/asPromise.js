var Q = require("q");

Function.prototype.asPromise = function(){
    var args = Array.prototype.slice.call(arguments);
    return Q.nfapply(this, args);
}