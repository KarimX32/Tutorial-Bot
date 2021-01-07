const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
    
    if(!message.content.startsWith(prefix)) return;

    message.channel.send(`hello my brother`)
    
}

module.exports.help = {
    name: `hello`
};
