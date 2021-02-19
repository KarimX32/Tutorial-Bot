const discord = require('discord.js');
const Client = new discord.Client(); // creating a new Client
const cooldown = new Set();

module.exports.run = async (Client, message, args, prefix) => { // for the cmd handler 

    if(!message.content.startsWith(prefix)) return; // makes sure it starts with the prefix
       
    if(cooldown.has(message.author.id)) {
        message.reply('Please wait 5 seconds between using the command, because you are on cooldown')
    } else {

        message.channel.send(`Finding the bot ping...`).then(msg => { // sends this once you send the cmd
            const ping = msg.createdTimestamp - message.createdTimestamp; // calculation the time between when u send the message and when the bot reply
            msg.edit(`The Ping of the bot is ${ping}ms!`) // it will edit the msg to this after it gets the ping!
        }) 

        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, 5000); // here will be the time in miliseconds 5 seconds = 5000 miliseconds
    }

}

module.exports.help = {
    name: "ping", // name of the cmd
    aliases: ['ms']
}