var Rx = require("rxjs/Rx");

var ObservableArray = require("data/observable-array").ObservableArray;

function ReposListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function () {

        const request = fetch('https://api.github.com/search/repositories?q=a+in:name,description&sort=stars&order=desc')
            .then((respose) => {
                return respose.json();
            });

        return Rx.Observable.from(request)
            .map((response)=> {
                return response.items;
            })
            .concatMap(repos => repos)
            .catch((error) => {
                console.log("caught error, continuing" + error);
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
