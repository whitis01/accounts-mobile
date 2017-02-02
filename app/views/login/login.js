// Includes for modules
var frameModule = require("ui/frame");
// var Observable = require("data/observable").Observable;
//
// var user = new Observable({
//     email: "try@try.com",
//     password: "1234"
// });

// User Defined Models
var UserViewModel = require("../../shared/view-models/user-view-model");

var user = new UserViewModel();
var config = require("../../shared/config");

// login local vars
var page;
var email;
var click;


exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = user;
};

exports.click = function() {
    console.log('Before Text');
    click = user.local();
    console.log(config.localUrl);
};

exports.signIn = function() {
    email = page.getViewById('email');
    console.log(email.text);
};

exports.register = function () {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};