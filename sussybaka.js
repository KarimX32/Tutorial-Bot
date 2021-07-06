const discord = require('discord.js')
const x = require("ultrax")

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    let user = message.mentions.users.first() || message.author
    let avatar = user.displayAvatarURL({format: "png"})
    let sussybaka = new x.sussyBaka(avatar)
    const Image = await sussybaka.get();

    message.channel.send(Image)
}

module.exports.help = {
    name: 'sussybaka',
    aliases: ['sb']
}