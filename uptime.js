const ms = require('parse-ms')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    let time = ms(Client.uptime)
    message.channel.send(`I have been online for ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`)
}

module.exports.help = {
    name: 'uptime',
    aliases: []
}