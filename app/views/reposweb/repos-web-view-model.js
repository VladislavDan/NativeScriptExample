var Rx = require("rxjs/Rx");
var observableModule = require("data/observable");

function ReposWebViewModel() {

    var viewModel = new observableModule.fromObject({
        url: "",
        isLoading: true
    });

    viewModel.setDataChannel = new Rx.BehaviorSubject();

    viewModel.setDataChannel
        .filter((url) => {
            return url != undefined;
        })
        .catch((error) => {
            console.log("caught error" + error);
        })
        .subscribe((url) => {
            viewModel.set("url", url);
        });

    viewModel.isLoadingChannel = new Rx.BehaviorSubject();

    viewModel.isLoadingChannel
        .subscribe((isLoading) => {
            viewModel.set("isLoading", isLoading);
        });

    return viewModel;
}

module.exports = ReposWebViewModel;
