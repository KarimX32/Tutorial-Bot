const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
        
    if(!message.content.startsWith(prefix)) return;

    let pollChannel = message.mentions.channels.first() // setting the channel to the second thing said in the the command
    if(!pollChannel) return message.channel.send('please say a channel to send the poll'); 
    let polldescription = args.slice(1).join(' ');// setting the description after the channel
    if (!polldescription) return message.channel.send('plese enclude a description') 
    let embedPoll = new discord.MessageEmbed() // creating a new embed
    .setTitle('😮 New Poll!😮 ') // title of the embed
    .setDescription(polldescription) // makeing the descrption that it will be the thing after the embed
    .setColor('YELLOW') // sets the color
    let msgEmbed = await pollChannel.send(embedPoll); // sending the embed in the selected channel
    await msgEmbed.react('👍') // addding reactions
    await msgEmbed.react('👎') // same

}

module.exports.help = {
    name: "poll",
    aliases: []
}
// =poll #channel react if u want me to make a patreon