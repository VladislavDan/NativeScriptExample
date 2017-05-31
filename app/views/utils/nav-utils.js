var frameModule = require("tns-core-modules/ui/frame");

function NavUtils() {

    return {
        goBack: function () {
            frameModule.topmost().goBack();
        }
    };
}

module.exports = NavUtils;

