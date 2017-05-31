var Rx = require("rxjs/Rx");
var observableModule = require("data/observable");

function ReposWebViewModel() {

    var viewModel = new observableModule.fromObject({
        url: ""
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

    return viewModel;
}

module.exports = ReposWebViewModel;
