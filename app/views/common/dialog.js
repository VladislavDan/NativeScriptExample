var dialogsModule = require("ui/dialogs");

function Dialog() {

    return {
        show: function (title, message) {
            dialogsModule.alert({
                title: title,
                message: message,
                okButtonText: "OK"
            });
        }
    };
}

module.exports = Dialog;
