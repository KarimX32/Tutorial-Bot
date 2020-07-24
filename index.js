// require the discord.js module
const Discord = require('discord.js');

// connect us to the config.json file
const config = require('./config.json');

// create a new Discord Client 
const Client = new Discord.Client({disableEveryone: true});


        

// Login To Discord with your app's Token
Client.login(config.token);

