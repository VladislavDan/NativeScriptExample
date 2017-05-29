var observableModule = require("data/observable");
var ReposListViewModel = require("./repos-list-view-model");
var page;

var reposList = new ReposListViewModel([]);
var pageData = new observableModule.fromObject({
    reposList: reposList
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;

    reposList.load("");
};

exports.onSubmit = function (args) {
    console.dir(args.object);
    reposList.empty();
    reposList.load(args.object.text);
};

exports.onClear = function () {
    reposList.empty();
    reposList.load("");
};
