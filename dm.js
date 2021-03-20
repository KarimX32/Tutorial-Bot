const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    let user = message.mentions.users.first()
    if(!user) return message.channel.send('Please mention a user to DM')

    let dm = args.slice(1).join(" ")
    if(!dm) return message.channel.send("I can't dm an empty message")

    try {
        await user.send(dm)
    } catch (error) {
        return message.channel.send('This user have DMs Closed i can\'t dm him/her')
    }
    message.channel.send("Successfully DM the user")

}

module.exports.help = {
    name: 'dm',
    aliases: []
}