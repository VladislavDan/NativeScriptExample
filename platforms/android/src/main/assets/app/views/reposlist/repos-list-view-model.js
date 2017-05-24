var ObservableArray = require("data/observable-array").ObservableArray;

function ReposListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function () {
        return viewModel.push({
            name: "repos1"
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
