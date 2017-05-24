var observableModule = require("data/observable");
var ReposListViewModel = require("./repos-list-view-model");
var page;

var reposList = new ReposListViewModel([]);
var pageData = new observableModule.fromObject({
    reposList: reposList
});

exports.loaded = function(args) {
    console.log("Loaded");
    page = args.object;
    page.bindingContext = pageData;

    reposList.empty();
    reposList.load();
};

exports.listViewItemTap = function() {
    console.log("Item tapped!");
};
