var builder = require('botbuilder');

var lib = new builder.Library('common');
lib.dialog('anotherTask', [
    function (session) {
        session.save();
        builder.Prompts.confirm(session, '[another_task_prompt]');
    },
    function (session, args) {
        if (!args.response) {
            session.endDialog("[thank_you_messsage]");
        }
        else {
            session.beginDialog("mainMenu:/");
        }
    }    
]);

module.exports.createLibrary = function () {
    return lib.clone();
};