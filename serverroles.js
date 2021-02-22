const discord = require('discord.js');
const { reducedPlanckConstantDependencies } = require('mathjs');

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)

    let rolesdisplay;
    if(roles.length < 70) {
        rolesdisplay = roles.join(" ")
    } else {
        rolesdisplay = roles.slice(70).join(" ")
    }

    const { guild } = message

    const icon = guild.iconURL()

    const embed = new discord.MessageEmbed()
    .setTitle('Server Roles')
    .setThumbnail(icon)
    .addField(`Roles [${roles.length - 1}]`, rolesdisplay) // Roles [10]
    message.channel.send(embed)
}

module.exports.help = {
    name: 'server-roles',
    aliases: ['serverroles']
}