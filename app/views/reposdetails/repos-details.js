var utilityModule = require("utils/utils");
var frameModule = require("tns-core-modules/ui/frame");
var ReposDetailViewModel = require("./repos-details-view-model");
var page;

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
    openWebPage(reposDetails.get("url"));
};

function openWebPage(url) {
    var navigationEntry = {
        moduleName: "views/reposweb/repos-web",
        context: {
            url: url
        },
        animated: false
    };
    frameModule.topmost().navigate(navigationEntry);
}