const { MessageEmbed } = require('discord.js')

module.exports.run = async (Client, message, args, prefix, cs) => {
    if(!message.content.startsWith(prefix)) return

    let data = await cs.leaderboard(message.guild.id);
    // This is to get First 10 Users
    data = data.slice(0, 10);
    if (data.length < 1) return message.channel.send("Nobody's in leaderboard yet.");
    const msg = new MessageEmbed()
        .addField(`**Leaderboard**:`, data.map(key => `${(data.findIndex(i => i.guildID === key.guildID && i.userID === key.userID) + 1)}. **${Client.users.cache.get(key.userID) ? Client.users.cache.get(key.userID).username : "Unknown"}#${Client.users.cache.get(key.userID) ? Client.users.cache.get(key.userID).discriminator : "0000"}** - **${key.wallet}** - **${key.bank}**`).join("\n"));
    message.channel.send(msg).catch();
}

module.exports.help = {
    name: 'lb',
    aliases: []
}