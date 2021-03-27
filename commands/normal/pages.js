const discord = require('discord.js')
const pagination = require('discord.js-pagination');

module.exports.run = async (Client, message, prefix, args) => {
    if(!message.content.startsWith(prefix)) return;

    const page1 = new discord.MessageEmbed()
    .setTitle('Page 1')
    .setDescription('this is an example desc for page 1')

    const page2 = new discord.MessageEmbed()
    .setTitle('page 2')
    .setDescription('this is an example for page 2')

    const page3 = new discord.MessageEmbed()
    .setTitle('Page 3')
    .setDescription('this is an example for page 3')


    const pages = [
        page1,
        page2,
        page3
    ]

    const emoji = ["⏪", "⏩"]

    const timeout = '10000'

    pagination(message, pages, emoji, timeout)
}

module.exports.help = {
    name: 'pages',
    aliases: []
}