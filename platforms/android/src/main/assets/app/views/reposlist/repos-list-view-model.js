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

    viewModel.load = function (searchText) {

        return Rx.Observable.from(response)
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
                return Rx.Observable.empty();
            })
            .subscribe((repos) => {
                viewModel.push(repos);
            });
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = ReposListViewModel;
