const discord = require("discord.js")

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`you don't have perm to do this cmd`)
    if(!message.member.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`i don't have perm to do this!`)

    let reason = args.slice(1).join(" ")
    let userId = args[0]

    if(!reason) reason = 'No reason provided';
    if(!userId) return message.channel.send('Please provide a ID to unban')
    if(isNaN(userId)) return message.channel.send("Please provide a valid ID that is numbers")

    message.guild.fetchBans().then(async bans => {
        if(bans.size === 0) return message.channel.send("No one is banned in this server")
        let BannedUser = bans.find(ban => ban.user.id == userId)
        if(!BannedUser) return message.channel.send('This user isnt banned!')
        await message.guild.members.unban(BannedUser.user, reason).catch(err =>{
            return message.channel.send("Something went wrong!")
        }).then(() => {
            message.channel.send(`successfully unbanned ${userId}`)
        })
    })
}

module.exports.help = {
    name: 'unban',
    aliases: []
}