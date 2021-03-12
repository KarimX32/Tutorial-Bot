const discord = require('discord.js')
const economy = require('../../database/economy')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return

    let user = message.mentions.users.first() || message.author

    const guildId = message.guild.id
    const userId = user.id
    const coins = await economy.Coins(guildId, userId)
    message.channel.send(`${user.username} have now ${coins} coins`)
}

module.exports.help = {
    name: 'balance',
    aliases: ['bal']
}