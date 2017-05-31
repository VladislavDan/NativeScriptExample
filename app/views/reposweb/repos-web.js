var ReposWebViewModel = require("./repos-web-view-model");
var page;

var reposUrl = new ReposWebViewModel();

exports.reposWebLoaded = function (args) {
    page = args.object;
    page.bindingContext = reposUrl;

    reposUrl.setDataChannel.next(page.navigationContext.url);
};
