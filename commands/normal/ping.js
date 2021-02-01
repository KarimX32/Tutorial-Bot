const discord = require('discord.js');
const Client = new discord.Client(); // creating a new Client

module.exports.run = async (Client, message, args, prefix) => { // for the cmd handler 

    if(!message.content.startsWith(prefix)) return; // makes sure it starts with the prefix

    message.channel.send(`Finding the bot ping...`).then(msg => { // sends this once you send the cmd
        const ping = msg.createdTimestamp - message.createdTimestamp; // calculation the time between when u send the message and when the bot reply
        msg.edit(`The Ping of the bot is ${ping}ms!`) // it will edit the msg to this after it gets the ping!
    })
}

module.exports.help = {
    name: "ping", // name of the cmd
    aliases: ['ms'] // another names for the cmd
}