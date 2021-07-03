const discord = require('discord.js')
const { MessageMenuOption, MessageMenu, MessageActionRow } = require("discord-buttons")

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return

    const Option1 = new MessageMenuOption()
    .setLabel("Cola")
    .setDescription("A soda drink")
    .setEmoji('🍹')
    .setValue('cola')

    const Option2 = new MessageMenuOption()
    .setLabel("Water")
    .setDescription("Water to drink")
    .setEmoji('812231560957788170')
    .setValue('water')

    const Option3 = new MessageMenuOption()
    .setLabel("Reload")
    .setDescription("Reload the message")
    .setEmoji('831157629421879316')
    .setValue('reload')

    const Menu = new MessageMenu()
    .setID('menu1')
    .setPlaceholder('Choose your drink')
    .addOption(Option1)
    .addOption(Option2)
    .addOption(Option3)
    // .setMaxValues(2)

    const Row1 = new MessageActionRow()
    .addComponent(Menu)


    await message.channel.send("Hello sir", { component: Row1 })//.then(async msg => {
    //     let col = msg.createMenuCollector((b) => b, { time: 5000 })

    //     col.on('collect', (b) => {
    //         console.log(b.id)
    //         b.reply.defer()
    //     })
    
    //     col.on('end', (b) => {
    //         console.log('end')
    //     })
    
    // })




    Client.on('clickMenu', async menu => {

        if(menu.values[0] == 'cola' && menu.values[1] == 'water') {
            await menu.reply.defer()
            return menu.channel.send("1 second the water and cola will be here")
        }

        if(menu.values[0] == 'cola') {
            await menu.reply.defer()
            menu.channel.send("Here is your cola sir")
        }

        if(menu.values[0] == 'water') {
            await menu.reply.defer()
            menu.channel.send("Here is water")
        }

        if(menu.values[0] == 'reload') {
            menu.message.update("No more choices come later, all sold", null)
        }

    })

}

module.exports.help = {
    name: 'menu',
    aliases: []
}