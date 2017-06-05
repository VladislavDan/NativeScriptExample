var Rx = require("rxjs/Rx");
var imageCacheModule = require("tns-core-modules/ui/image-cache");
var imageSource = require("tns-core-modules/image-source");
var fs = require("tns-core-modules/file-system");

var ObservableArray = require("data/observable-array").ObservableArray;

function ReposListViewModel(items) {

    var viewModel = new ObservableArray(items);

    var response = function () {
        return Rx.Observable.ajax('https://api.github.com/repositories')
            .map((result) => {
                return result.response;
            })
            .catch((error) => {
                console.log("caught error" + error);
            });
    }();

    viewModel.loadChannel = new Rx.BehaviorSubject();

    viewModel.loadChannel.subscribe((searchText) => {
        Rx.Observable.from(response)
            .map((response) => {
                return response;
            })
            .concatMap(repos => repos)
            .filter((repos) => {
                return searchText != ""
                    ? repos.name.indexOf(searchText) != -1
                    : true;
            })
            //.map((repos) => {
            //    getAvatarFromCache(repos);
            //    return repos;
            //})
            .catch((error) => {
                console.log("caught error" + error);
            })
            .subscribe((repos) => {
                viewModel.push(repos);
            });
    });

    viewModel.clearChannel = new Rx.BehaviorSubject();

    viewModel.clearChannel.subscribe(() => {
        while (viewModel.length) {
            viewModel.pop();
        }
    });

    function getAvatarFromCache(repos) {
        var cache = new imageCacheModule.Cache();
        cache.maxRequests = 5;
        cache.enableDownload();

        var image = cache.get(repos.owner.avatar_url);
        if (image) {
            repos.owner.avatar_url = imageSource.fromNativeSource(image);
        } else {
            cache.push({
                key: repos.owner.avatar_url,
                url: repos.owner.avatar_url,
                completed: (image, key) => {
                    if (repos.owner.avatar_url === key) {
                        repos.owner.avatar_url = imageSource.fromNativeSource(image);
                    }
                }
            });
        }
        cache.disableDownload();
    }

    return viewModel;
}

module.exports = ReposListViewModel;
