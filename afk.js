const discord = require('discord.js')
const schema = require('../../schema/afk-schema')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    let data;
    try {
        data = await schema.findOne({
            userId: message.author.id,
            guildId: message.guild.id,
        })
        if(!data) {
            data = await schema.create({
                userId: message.author.id,
                guildId: message.guild.id,
            })
        }
    } catch(e) {
        console.log(e)
    }

    message.channel.send("You are now afk")
    data.AFK = true
    data.AFK_Reason = args.join(" ")
    await data.save()

}

module.exports.help = {
    name: 'afk',
    aliases: []
}