var builder = require('botbuilder');

var lib = new builder.Library('mainMenu');
lib.dialog('/', [    
    function (session) {
        const choices = 
            session.localizer.gettext(session.preferredLocale(), "[task1]", "mainMenu") +
            '|' + session.localizer.gettext(session.preferredLocale(), "[task2]", "mainMenu") +
            '|' + session.localizer.gettext(session.preferredLocale(), "[task3]", "mainMenu");

        // Prompt the user to select their preferred locale
        builder.Prompts.choice(session, 
            "[task_prompt]", choices);
    },
    function (session, results) {
        console.log("response :" + results.response.entity);
        switch (results.response.entity) {
            case session.localizer.gettext(session.preferredLocale(), "[task1]", "mainMenu"):
                session.beginDialog("task1:/");
                break;
            case session.localizer.gettext(session.preferredLocale(), "[task2]", "mainMenu"):
                session.beginDialog("task2:/");
                break;
            case session.localizer.gettext(session.preferredLocale(), "[task3]", "mainMenu"):
                session.beginDialog("task3:/");
                break;
        }
    }    
]);

module.exports.createLibrary = function () {
    return lib.clone();
};