var frameModule = require("tns-core-modules/ui/frame");

function NavUtils() {

    return {
        goBack: function () {
            frameModule.topmost().goBack();
        },
        openPage: function (moduleName, context) {
            var navigationEntry = {
                moduleName: moduleName,
                context: context,
                animated: false
            };
            frameModule.topmost().navigate(navigationEntry);
        }
    };
}

module.exports = NavUtils;

