var rek = require("rekuire");
var app = rek("app");

module.exports = {
    app: app,
    url: "http://localhost:"+ app.get("port")
};