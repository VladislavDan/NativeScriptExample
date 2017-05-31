var webViewModule = require("tns-core-modules/ui/web-view");

var ReposWebViewModel = require("./repos-web-view-model");
var NavUtils = require("./../utils/nav-utils");

var page;

var reposUrl = new ReposWebViewModel();

var navUtils = new NavUtils();

exports.reposWebLoaded = function (args) {
    page = args.object;
    page.bindingContext = reposUrl;

    reposUrl.setDataChannel.next(page.navigationContext.url);

    page.getViewById("wv_repos_viewer").on(webViewModule.WebView.loadFinishedEvent, (args) => {
        reposPageLoadFinished(args);
    });

    console.log("Page start load");
    reposUrl.isLoadingChannel.next(true);
};

exports.goBack = function () {
    navUtils.goBack();
};

function reposPageLoadFinished(args) {
    if (!args.error) {
        console.log("Page loaded");
    } else {
        console.log("Error loading " + args.url + ": " + args.error);
    }
    reposUrl.isLoadingChannel.next(false);
}


