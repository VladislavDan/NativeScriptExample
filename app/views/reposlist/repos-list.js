var observableModule = require("data/observable");
var frameModule = require("tns-core-modules/ui/frame");

var ReposListViewModel = require("./repos-list-view-model");
var NavUtils = require("./../utils/nav-utils");

var navUtils = new NavUtils();
var page;

var reposList = new ReposListViewModel([]);
var pageData = new observableModule.fromObject({
    reposList: reposList
});

exports.reposListLoaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;

    reposList.loadChannel.next("");
};

exports.reposSearchSubmit = function (args) {
    reposList.clearChannel.next();
    reposList.loadChannel.next(args.object.text);
};

exports.reposSearchClear = function () {
    reposList.clearChannel.next();
    reposList.loadChannel.next("")
};

exports.reposItemTap = function(args) {
    var tappedItemIndex = args.index;
    var repos = reposList.getItem(tappedItemIndex);

    navUtils.openPage("views/reposdetails/repos-details", {repos: repos});
};
