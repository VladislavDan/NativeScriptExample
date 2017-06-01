var Rx = require("rxjs/Rx");
var observableModule = require("data/observable");

var Dialog = require("./../common/dialog");

function ReposDetailViewModel() {

    var dialog = new Dialog();

    var viewModel = new observableModule.fromObject({
        avatar: "",
        name: "",
        description: "",
        url: ""
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
            setReposData(repos);
        });

    function setReposData(repos) {
        viewModel.set("avatar", repos.owner.avatar_url);
        viewModel.set("name", repos.name);
        viewModel.set("description", repos.description);
        viewModel.set("url", repos.html_url);
    }

    return viewModel;
}

module.exports = ReposDetailViewModel;
