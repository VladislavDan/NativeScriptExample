var observableModule = require("data/observable");
var ReposDetailViewModel = require("./repos-details-view-model");
var page;

var reposDetails = new ReposDetailViewModel();

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = reposDetails;

    reposDetails.setDataChannel.next(page.navigationContext.repos);
};