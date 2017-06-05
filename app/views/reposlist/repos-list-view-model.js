var Rx = require("rxjs/Rx");
var imageCacheModule = require("tns-core-modules/ui/image-cache");
var imageSource = require("tns-core-modules/image-source");
var fs = require("tns-core-modules/file-system");
var Sqlite = require("nativescript-sqlite");

var ObservableArray = require("data/observable-array").ObservableArray;

function ReposListViewModel(items) {

    const DATA_BASE = "repos.db";

    const TABLE = "ReposTable";

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

    var createTable = function () {
        new Sqlite(DATA_BASE, function (err, db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS " + TABLE + " (id INTEGER PRIMARY KEY ASC, name TEXT, avatar TEXT, description TEXT, url TEXT)", [], function (err) {
                console.log("TABLE CREATED");
            });
        });
    }();

    var cacheRepos = function () {
        new Sqlite(DATA_BASE, function (err, db) {
            db.all("SELECT * FROM " + TABLE + " ORDER BY id", [], function (err, rs) {
                rs.length > 0 ? updateRepos(response) : insertRepos(response);
            });
        });
    }();

    viewModel.loadChannel = new Rx.BehaviorSubject();

    viewModel.loadChannel.subscribe((searchText) => {
        new Sqlite(DATA_BASE, function (err, db) {
            Rx.Observable.from(db.all("SELECT * FROM " + TABLE + " ORDER BY id", []))
                .concatMap(repos => repos)
                .map((repos) => {
                    return {
                        id: repos[0],
                        name: repos[1],
                        avatar: repos[2],
                        description: repos[3],
                        url: repos[4]
                    }
                })
                .filter((repos) => {
                    return searchText != ""
                        ? repos.name.indexOf(searchText) != -1
                        : true;
                })
                .catch((error) => {
                    console.log("caught error" + error);
                })
                .subscribe((repos) => {
                    viewModel.push(repos);
                });
        });
    });

    viewModel.clearChannel = new Rx.BehaviorSubject();

    viewModel.clearChannel.subscribe(() => {
        while (viewModel.length) {
            viewModel.pop();
        }
    });

    function insertRepos(response) {
        new Sqlite(DATA_BASE, function (err, db) {
            Rx.Observable.from(response)
                .concatMap(repos => repos)
                .subscribe((repos) => {
                    db.execSQL("INSERT INTO " + TABLE + " (id, name, avatar, description, url) VALUES (?,?,?,?,?)",
                        [repos.id, repos.name, repos.owner.avatar_url, repos.description, repos.html_url], function (err, id) {
                            console.log("The new record id is inserted: " + id);
                        });
                });
        });
    }

    function updateRepos(response) {
        new Sqlite(DATA_BASE, function (err, db) {
            Rx.Observable.from(response)
                .concatMap(repos => repos)
                .subscribe((repos) => {
                    db.execSQL("UPDATE " + TABLE + " SET name = ?, avatar = ?, description = ?, url = ? WHERE id = ?",
                        [repos.name, repos.owner.avatar_url, repos.description, repos.html_url, repos.id], function (err, count) {
                            console.log("The new record updated: " + repos.id);
                        });
                });
        });
    }

    return viewModel;
}

module.exports = ReposListViewModel;
