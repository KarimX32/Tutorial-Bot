const discord = require('discord.js')
const schema = require('../../schema/user-schema')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(message.author.id !== '501431027013517333') return

    let user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mentions a user!")

    let data;
    try {
        data = await schema.findOne({
            userId: user.id
        })
        if(!data) {
            data = await schema.create({
                userId: user.id
            })
        }
    } catch (error) {
        console.log(error)
    }

    data.blacklisted = false
    await data.save()
    return message.channel.send(`Successfully whitelisted ${user.tag}`)

}

module.exports.help = {
    name: 'whitelist',
    aliases: []
}