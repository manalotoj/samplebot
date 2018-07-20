var restify = require('restify');
var builder = require('botbuilder');
var azure = require('botbuilder-azure'); 
require('dotenv-extended').load();

console.log("host: " + process.env.CosmosDbHost);
console.log("key: " + process.env.CosmosDbKey);
console.log("database: " + process.env.CosmosDbDatabaseId);
console.log("collection: " + process.env.CosmosDbCollectionId);

var documentDbOptions = {
    host: process.env.CosmosDbHost,
    masterKey: process.env.CosmosDbKey,
    database: process.env.CosmosDbDatabaseId,  
    collection: process.env.CosmosDbCollectionId
};

var docDbClient = new azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new azure.AzureBotStorage({ gzipData: false }, docDbClient);

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// listen for messages from users
server.post('/api/messages', connector.listen());

// initialize bot with locale settings
var bot = new builder.UniversalBot(connector, {
    localizerSettings: { 
        defaultLocale: "zh" 
    }
}).set('storage', cosmosStorage);

// define dialog libraries
bot.library(require('./dialogs/preferredLocale').createLibrary());
bot.library(require('./dialogs/common').createLibrary());
bot.library(require('./dialogs/mainMenu').createLibrary());
bot.library(require('./dialogs/task1').createLibrary());
bot.library(require('./dialogs/task2').createLibrary());
bot.library(require('./dialogs/task3').createLibrary());
// add root dialog

bot.dialog('/', [
    function (session, args) {
        console.log('begin root dialog');
        return session.beginDialog('preferredLocale:/');
    }
]);

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        console.log('members added');
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, '/');
            }
        });
    }
});