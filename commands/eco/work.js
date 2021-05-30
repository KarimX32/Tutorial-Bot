const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, cs) => {
    if(!message.content.startsWith(prefix)) return

    let result = await cs.work({
        user: message.author,
        guild: message.guild,
        maxAmount: 1000,
        replies: ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic'],
        cooldown: 25 //25 seconds,

    });

    message.channel.send(result);
}

module.exports.help = {
    name: 'work',
    aliases: []
}