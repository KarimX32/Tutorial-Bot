const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, cs) => {
    if(!message.content.startsWith(prefix)) return

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        user = message.guild.members.cache.get(args[0]).user;
    }

    if (user.bot || user === Client.user) return message.channel.send("This user is a bot.");
    if (!user) return message.channel.send('Sorry, you forgot to mention somebody.');
    
    let result = await cs.rob({
        user: message.author,
        user2: user,
        guild: message.guild,
        minAmount: 2,
        successPercentage: 5,
        cooldown: 25 //25 seconds
    });

    message.channel.send(result);
}

module.exports.help = {
    name: 'rob',
    aliases: []
}