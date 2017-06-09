var Rx = require("rxjs/Rx");
var Sqlite = require("nativescript-sqlite");

var ReposDetailViewModel = require("../../views/reposlist/repos-list-view-model");

describe("ReposDetailViewModel test:", function () {

    it("Check response result.", function () {
        var testData = [{
            response: 1
        }];

        spyOn(Rx.Observable, "ajax").and.returnValue(Rx.Observable.from(testData));

        var reposDetails = new ReposDetailViewModel();

        reposDetails.__test__.getResponseChannel()
            .subscribe((repos) => {
                expect(Rx.Observable.ajax).toHaveBeenCalled();
                expect(repos).toBe(testData[0].response);
            });
    });

    it("Check response filtered.", function () {

        var testData = [[0, "repoZero", "", "", ""], [1, "repoOne", "", "", ""], [2, "repoTwo", "", "", ""]];

        var database = {
            all: ""
        };

        spyOn(database, "all").and.returnValue(Promise.all(testData));

        var reposDetails = new ReposDetailViewModel();

        reposDetails.__test__.getFilteredRepos(database, "", "One")
            .subscribe((repos) => {
                expect(database.all).toHaveBeenCalled();
                expect(repos).toEqual({
                    id: testData[1][0],
                    name: testData[1][1],
                    avatar: testData[1][2],
                    description: testData[1][3],
                    url: testData[1][4]
                });
            });
    });
});
