var Rx = require("rxjs/Rx");

var ReposDetailViewModel = require("../../views/reposlist/repos-list-view-model");

describe("ReposDetailViewModel test:", function () {

    it("Check response result.", function () {
        var testRepos = [{
            response: 1
        }];

        spyOn(Rx.Observable, "ajax").and.returnValue(Rx.Observable.from(testRepos));

        var reposDetails = new ReposDetailViewModel();

        reposDetails.__test__.response()
            .subscribe((repos) => {
                console.dir(repos);
                expect(Rx.Observable.ajax).toHaveBeenCalled();
                expect(repos).toBe(testRepos[0].response);
            });
    });
});
