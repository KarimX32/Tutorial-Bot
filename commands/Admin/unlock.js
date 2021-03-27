const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You don't have permission to do this command!")

    let msg = await message.channel.send("Loading...")

    try {
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        })
        msg.edit("Successfully unlocked the channel!")
    }catch(e) {
        console.log(e)
    }
}

module.exports.help = {
    name: 'unlock',
    aliases: []
}