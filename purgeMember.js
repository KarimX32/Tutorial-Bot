const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You dont have enough perms to execute this command")
    let member = message.mentions.members.first()
    let amount = args[1]
    if(!member) return message.channel.send("Please mention a user")
    if(!amount) return message.channel.send("Please provide an amount")
    if(isNaN(amount)) return message.channel.send("Please provide a valid amount to be deleted")
    if(amount > 99) return message.channel.send("99 msgs is the limit")
    let AllMessages = await message.channel.messages.fetch()
    let FilteredMessages = await AllMessages.filter(x => x.author.id === member.id)
    let deletedMessages = 0
    FilteredMessages.forEach(msg => {
        if(deletedMessages >= amount) return
        msg.delete()
        deletedMessages++
    })

}

module.exports.help = {
    name: 'pur',
    aliases: []
}