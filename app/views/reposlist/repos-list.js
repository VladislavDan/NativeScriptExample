var observableModule = require("data/observable");
var permissions = require("nativescript-permissions");
var connectivity = require("connectivity");

var ReposListViewModel = require("./repos-list-view-model");
var NavUtils = require("./../utils/nav-utils");
var Dialog = require("./../common/dialog");

var navUtils = new NavUtils();
var dialog = new Dialog();
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
    updateData();
};

exports.reposItemTap = function (args) {
    var tappedItemIndex = args.index;
    var repos = reposList.getItem(tappedItemIndex);

    navUtils.openPage("views/reposdetails/repos-details", {repos: repos});
};

connectivity.startMonitoring(function onConnectionTypeChanged(newConnectionType) {
    switch (newConnectionType) {
        case connectivity.connectionType.none:
            dialog.show("Connection Error", "Not connection. Enable internet connection in settings");
            updateData();
            break;
        case connectivity.connectionType.wifi:
            updateData();
            console.log("Connection type changed to WiFi.");
            break;
        case connectivity.connectionType.mobile:
            updateData();
            console.log("Connection type changed to mobile.");
            break;
    }
});

function updateData(isOffline) {
    if(isOffline){
        reposList.clearChannel.next();
        reposList.loadOfflineChannel.next("");
    }else{
        reposList.clearChannel.next();
        reposList.loadChannel.next("");
    }
}
