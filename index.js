// require the discord.js module
const Discord = require('discord.js');

// connect us to the config.json file
const config = require('./config.json');

// create a new Discord Client 
const Client = new Discord.Client({disableEveryone: true});

// The message that we will get in terminal when we lunch the bot
Client.on("ready", async () => {
    console.log(`${Client.user.username} is Online!`)

    // This Will be the Status Of our Bot
    Client.user.setActivity("UltraX", {type: "WATCHING"})
});

Client.on("message", async message => {
    if(message.author.Client || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)


    // If Someone Send =hi the bot will respond by Hello There!
    if(cmd === `${prefix}hi`) {
        return message.channel.send("Hello There!")
    }

    // if someone say =hello the bot will mention/ping him then say hello, how are you?
    if(cmd === `${prefix}hello`) {
        return message.reply("hello, how are you?")
    }

})
   

        

// Login To Discord with your app's Token
Client.login(config.token);

