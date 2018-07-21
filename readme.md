# Introduction 
The purpose of this project is to inventory all Azure resources in all of Wisney's EA subscriptions. This is a POC and is not intended for production use.

# License
This project is licensed under the terms of the MIT license.

# To run this samplebot
1. Clone or zip repository
2. Within the src directory, run npm install
3. Add a .env and configure the following settings

    CosmosDbHost='https://[account-name].documents.azure.com:443/', 
    CosmosDbKey='[cosmos-db-access-key]'
    CosmosDbDatabaseId='database-id',   
    CosmosDbCollectionId='collection-id'

4. Run node app.js
5. Test the bot using the bot framework emulator (v3 or v4) using http://localhost:3978/api/messages
