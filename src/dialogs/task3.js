var builder = require('botbuilder');

var lib = new builder.Library('task3');
lib.dialog('/', [
    function (session) {
        // Prompt the user to select their preferred locale
        session.send('task3 completed!');
        session.beginDialog('common:anotherTask:/');
    }
]);

module.exports.createLibrary = function () {
    return lib.clone();
};