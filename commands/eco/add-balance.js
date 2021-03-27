const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

    var user = message.mentions.users.first() || message.author

    let addMoney = args[0] // =addbal args[0] args[1]

    if(!addMoney) return message.channel.send('Please Provide a amount of money!')

    if(isNaN(addMoney)) return message.channel.send('Please provide a valid number!') // =addbal ds @user

    db.add(`money_${message.guild.id}_cash_${user.id}`, addMoney)

    var bal = await db.fetch(`money_${message.guild.id}_cash_${user.id}`);
    if (bal === null) bal = 0;

    const embed = new discord.MessageEmbed()
    .setTitle('Done!')
    .setDescription(`Successfully added ${addMoney} to ${user}\nThis user have now a total of ${bal}$`)
    .setColor('RANDOM')
    .setTimestamp()
    .setThumbnail(user.displayAvatarURL())
    message.channel.send(embed)

}

module.exports.help = {
    name: "add-balance",
    aliases: ['addbal', 'addbalance']
}