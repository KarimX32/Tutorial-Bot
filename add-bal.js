const discord = require('discord.js');
const economy = require('../../database/economy')
module.exports.run = async (Client, message, args, prefix) => {
     if(!message.content.startsWith(prefix)) return;
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You dont have perm to do this command!')

    let user = message.mentions.members.first()
    let amount = args[0]
    if(!user) return message.channel.send('please mention a user to add coins')
    if(!amount) return message.channel.send('Please enter an amount to add')
    if(isNaN(amount)) return message.channel.send('Please Provide a valid numbers')
    const guildId = message.guild.id
    const userId = user.id
    const newbal = await economy.addCoins(guildId, userId, amount)
    const embed = new discord.MessageEmbed()
    .setDescription(`added ${amount} coins to <@${userId}>, This user have now a total of ${newbal}`)
    .setColor("GREEN")
    message.channel.send(embed)
 }
 



module.exports.help = {
    name: `addcoins`,
    aliases: ['addbal', 'add-bal'] // if someone typed (e.g. =purge 10 or =delete 10) it will do the same as =clear
};
