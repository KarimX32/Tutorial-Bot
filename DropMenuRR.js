const discord = require('discord.js')
const { MessageActionRow, MessageMenu, MessageMenuOption } = require("discord-buttons")
module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return

    const opt1 = new MessageMenuOption().setValue('DR1').setLabel("unverified").setDescription("Please click to get/remove the role")
    const opt2 = new MessageMenuOption().setValue('DR2').setLabel("highest shit").setDescription("Please click to get/remove the role")
    const opt3 = new MessageMenuOption().setValue('DRreturn').setLabel("Hold").setDescription("Used to select the same role again")

    const menu = new MessageMenu().setPlaceholder('Click to select a role').setID('DR').addOptions([opt1, opt2, opt3])
    const Row = new MessageActionRow().addComponent(menu)
    message.channel.send("hey there, lets start by getting you some roles", Row)

}

module.exports.help = {
    name: 'DR',
    aliases: []
}