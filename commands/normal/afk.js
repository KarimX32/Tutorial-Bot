const discord = require('discord.js')
const db = require('quick.db')


module.exports.run = async (Client, message, args, prefix) => {
    
    if(!message.content.startsWith(prefix)) return;

    const content = args.join(" ")
    await db.set(`afk-${message.author.id}+${message.guild.id}`, content)
    message.channel.send(`you are now afk.\nReason: ${content}`)
    
}

module.exports.help = {
    name: `afk`,
    aliases: []
};
