var utilityModule = require("utils/utils");
var frameModule = require("tns-core-modules/ui/frame");

var NavUtils = require("./../utils/nav-utils");
var ReposDetailViewModel = require("./repos-details-view-model");

var page;
var navUtils = new NavUtils();

var reposDetails = new ReposDetailViewModel();

exports.reposDetailsLoaded = function (args) {
    page = args.object;
    page.bindingContext = reposDetails;

    reposDetails.setDataChannel.next(page.navigationContext.repos);
};

exports.openReposBrowserTap = function () {
    console.log(reposDetails.get("url"));
    utilityModule.openUrl(reposDetails.get("url"));
};

exports.openReposViewerTap = function () {
    navUtils.openPage("views/reposweb/repos-web", {url: reposDetails.get("url")});
};

exports.goBack = function () {
    navUtils.goBack();
};