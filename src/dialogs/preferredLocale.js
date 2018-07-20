var builder = require('botbuilder');

var lib = new builder.Library('preferredLocale');
lib.dialog('/', [
    function (session) {
        // Prompt the user to select their preferred locale
        builder.Prompts.choice(session, 
            "choose langauge | elige lengua | pilih bahasa | Velg språk | xuǎnzé yǔyán", 
            "English|Español|Bahasa Indonesia|Norsk|Zhōngwén");
    },
    function (session, results) {
        // Update preferred locale
        var locale;
        switch (results.response.entity) {
            case 'English':
                locale = 'en';
                break;
            case 'Español':
                locale = 'es';
                break;
            case 'Bahasa Indonesia':
                locale = 'in';
                break;
            case 'Norsk':
                locale = 'nn';
                break;
            case 'Zhōngwén':
                locale = 'zh';
                break;
        }
        session.preferredLocale(locale, function (err) {
            if (!err) {
                // Locale files loaded
                session.endDialog('[locale_updated]');

                console.log('redirecting to mainMenu dialog');
                session.beginDialog('mainMenu:/');
            } else {
                // Problem loading the selected locale
                session.error(err);
            }
        });
    }
]);

module.exports.createLibrary = function () {
    return lib.clone();
};