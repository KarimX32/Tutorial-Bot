const discord = require('discord.js')
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return

    const embed = new discord.MessageEmbed()
    .setTitle("Reaction Role")
    .setColor("GREEN")
    .setDescription("Click on the button below to get the 'x' role")

    const add = new MessageButton()
    .setStyle("green")
    .setLabel("Add")
    .setID("AddXRole")



    const remove = new MessageButton()
    .setStyle("grey")
    .setLabel("remove")
    .setID("RevXRole")


    const row = new MessageActionRow()
    .addComponent([add, remove])


    message.channel.send({component: row, embed: embed})


}

module.exports.help = {
    name: 'rr',
    aliases: []
}