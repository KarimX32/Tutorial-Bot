const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('you dont have perm to use this cmd')

    const newprefix = args[0] // =setprefix [args0] [args1] [args2] \\ =setprefix ! <= args0

    if(!newprefix) return message.reply('please provide a new prefix')

    if(newprefix.length > 5) return message.channel.send("this prefix is too long")

    message.channel.send(`new prefix set to ${newprefix}`)
    db.set(`prefix_${message.guild.id}`, newprefix);
}

module.exports.help = {
    name: 'setprefix',
    aliases: []
}