var Rx = require("rxjs/Rx");

var ObservableArray = require("data/observable-array").ObservableArray;

function ReposListViewModel(items) {

    var viewModel = new ObservableArray(items);

    var response = function () {
        return fetch('https://api.github.com/repositories')
            .then((respose) => {
                return respose.json();
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
            .catch((error) => {
                console.log("caught error" + error);
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
