var Rx = require("rxjs/Rx");
var Observable = require('data/observable').Observable;
var observableModule = require("data/observable");

function ReposDetailViewModel() {

    var viewModel = new observableModule.fromObject({
        avatar: "",
        name: "sdfdsf",
        description: ""
    });

    viewModel.setDataChannel = new Rx.BehaviorSubject();

    viewModel.setDataChannel
        .filter((repos) => {
            return repos != undefined;
        })
        .catch((error) => {
            console.log("caught error" + error);
        })
        .subscribe((repos) => {
            viewModel.set("avatar", repos.owner.avatar_url);
            viewModel.set("name", repos.name);
            viewModel.set("description", repos.description);
        });

    return viewModel;
}

module.exports = ReposDetailViewModel;
