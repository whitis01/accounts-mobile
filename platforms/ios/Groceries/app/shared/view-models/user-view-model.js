var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        email: info.email || "try@try.com",
        password: info.password || "1234",
        click: info.click || "time"
    });

    viewModel.register = function() {
        return fetchModule.fetch(config.apiUrl + "Users", {
            method: "POST",
            body: JSON.stringify({
                Username: viewModel.get("email"),
                Email: viewModel.get("email"),
                Password: viewModel.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors);
    };

    viewModel.login = function() {
        return fetchModule.fetch(config.apiUrl + "oauth/token", {
            method: "POST",
            body: JSON.stringify({
                username: viewModel.get("email"),
                password: viewModel.get("password"),
                grant_type: "password"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                config.token = data.Result.access_token;
            });
    };

    viewModel.local = function() {
        var r = fetchModule.fetch(config.localUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        var j = fetchModule.request;

        var out = "start :: ";
        for (var i in j) {
            out += i + ": " + j[i] + "\n";
        }
        out += " :: end";

        console.log(out);

        return r;
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = User;