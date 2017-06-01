var Rx = require("rxjs/Rx");

var ObservableArray = require("data/observable-array").ObservableArray;

function ReposListViewModel(items) {

    var viewModel = new ObservableArray(items);

    var response = function () {
        return Rx.Observable.ajax('https://api.github.com/repositories')
            .map((result) => {
                return result.response;
            })
            .catch((error) => {
                console.log("caught error" + error);
            });
    }();

    viewModel.loadChannel = new Rx.BehaviorSubject();

    viewModel.loadChannel.subscribe((searchText) => {
        Rx.Observable.from(response)
            .map((response) => {
                return response;
            })
            .concatMap(repos => repos)
            .filter((repos) => {
                return searchText != ""
                    ? repos.name.indexOf(searchText) != -1
                    : true;
            })
            .subscribe((repos) => {
                viewModel.push(repos);
            });
    });

    viewModel.clearChannel = new Rx.BehaviorSubject();

    viewModel.clearChannel.subscribe(() => {
        while (viewModel.length) {
            viewModel.pop();
        }
    });

    return viewModel;
}

module.exports = ReposListViewModel;
