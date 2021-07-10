const discord = require('discord.js')
const { Wikipedia } = require("ultrax")
module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return

    let query = args.join(" ")
    if(!query) return message.channel.send("Please include a query")

    // Inistigating the wikipedia class
    const res = new Wikipedia({ 
        message:  message, // The message
        color:  "RED", // Color of embed that will be sent
        query:  query  // what the search query is
    })

    res.fetch()
}

module.exports.help = {
    name: 'wiki',
    aliases: []
}