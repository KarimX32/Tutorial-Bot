const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

    let user = message.mentions.users.first() || message.author;

    var bal = await db.fetch(`money_${message.guild.id}_cash${user.id}`);
    if (bal === null) bal = 0;


    const embed = new discord.MessageEmbed()
    .setTitle(`__${user.username}'s Balance__`)
    .setColor('GREEN')
    .setDescription(`💰 **Balance:** \`${bal}\`$`)
    .setThumbnail(user.displayAvatarURL({dynamic: true}))
    message.channel.send(embed)
}

module.exports.help = {
    name: "balance",
    aliases: ['bal']
}