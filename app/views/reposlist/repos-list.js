var observableModule = require("data/observable");
var ReposListViewModel = require("./repos-list-view-model");
var frameModule = require("tns-core-modules/ui/frame");

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

    openDetailsPage(repos);
};

function openDetailsPage(repos) {
    var navigationEntry = {
        moduleName: "views/reposdetails/repos-details",
        context: {
            repos: repos
        },
        animated: false
    };
    frameModule.topmost().navigate(navigationEntry);
}
