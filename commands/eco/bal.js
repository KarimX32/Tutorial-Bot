const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, cs) => {
    if(!message.content.startsWith(prefix)) return

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    } else if (!args[0]) {
        user = message.author;
    }

    let result = await cs.balance({
        user: user,
        guild: message.guild
    });

    
    message.channel.send(`${user.tag}, \n have $${result.wallet} in you wallet and $${result.bank} in there bank.`);

}

module.exports.help = {
    name: 'bal',
    aliases: []
}