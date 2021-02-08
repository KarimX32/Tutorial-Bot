const discord = require('discord.js')



module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return; // this makes sure that the cmd starts with the prefix

    let user = message.mentions.users.first() || message.author;

    let avatar = user.displayAvatarURL({size: 4096, dynamic: true})

    const embed = new discord.MessageEmbed()
    .setTitle(`${user.tag}'s Avatar`)
    .setURL(avatar)
    .setImage(avatar)
    .setColor('RANDOM')
    message.channel.send(embed);
}



module.exports.help = {
    name: `avatar`,
    aliases: ["pfp"]
};
