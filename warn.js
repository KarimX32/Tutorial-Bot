const discord = require('discord.js')
const schema = require('../../schema/profile-schema')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have enough perm to execute this cmd")

    let user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mention a user to warn!")

    let data;
    try {
        data = await schema.findOne({
            userId: user.id,
            guildId: message.guild.id
        })
        if(!data) {
            data = await schema.create({
                userId: user.id,
                guildId: message.guild.id
            })
        }
    } catch (error) {
        console.log(error)
    }

    data.warns += 1
    await data.save()

    const embed = new discord.MessageEmbed()
    .setDescription(`successfully warned ${user}, and now he have a total of ${data.warns}`)
    .setColor("GREEN")

    message.channel.send(embed)

}

module.exports.help = {
    name: 'warn',
    aliases: []
}