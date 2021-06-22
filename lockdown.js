const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have enough permission to execute this command")
    if(!message.member.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I dont have enough permissions")

    message.guild.channels.cache.forEach(channel => {
        try {
            channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                SEND_MESSAGES: true
            })
        }catch(e) {
            console.log(e)
            return message.channel.send(`I couldn't lock ${channel}`)
        }
    })

    message.channel.send("Successfully locked all the channels")

}

module.exports.help = {
    name: 'lockdown',
    aliases: []
}