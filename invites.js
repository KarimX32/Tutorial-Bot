const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    let user = message.mentions.users.first() || message.author
    let invites = await message.guild.fetchInvites();
    let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id)

    if(userInv.size <= 0) {
        return message.channel.send(`${user.username} don't have any invites`)
    }

    let invCodes = userInv.map(x => x.code).join('\n')
    let i = 0;
    userInv.forEach(inv => i += inv.uses)

    const embed = new discord.MessageEmbed()
    .setTitle(`${user.username} Invites`)
    .addField('User Invites', i)
    .addField('Invite Codes', invCodes)
    .setColor('RANDOM')
    .setTimestamp()
    message.channel.send(embed)
}

module.exports.help = {
    name: 'invites',
    aliases: ['inv']
}