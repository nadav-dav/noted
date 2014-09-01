var rek = require("rekuire");
var asPromise = rek("asPromise");

var Dao = (function () {

    function Dao(Model) {
        this.Model = Model;
    }

    Dao.prototype.save = function (data) {
        var instance = new this.Model(data);
        return instance.save.bind(instance).asPromise()
    };

    Dao.prototype.findOne = function (id) {
        return this.Model.findOne.bind(this.Model).asPromise({_id: id})
    };

    Dao.prototype.update = function (id, data) {
        return this.Model.update.bind(this.Model).asPromise({_id: id} , data)
    };

    Dao.prototype.remove = function (id) {
        return this.Model.remove.bind(this.Model).asPromise({_id: id});
    };

    return Dao;
})();

module.exports = Dao;