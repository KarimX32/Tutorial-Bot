const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(message.author.id !== '501431027013517333') return;
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mentions a user to whitelist")
    const Blacklisted = db.fetch(`blacklistedUsers_${user.id}`)
    if(Blacklisted == false) return message.channel.send("This user is already whitelisted")
    message.channel.send(`Successfully removed ${user.username} from the blacklisted users`)
    db.set(`blacklistedUsers_${user.id}`, false)

}

module.exports.help = {
    name: 'whitelist',
    aliases: []
}