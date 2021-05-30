const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, cs) => {
    if(!message.content.startsWith(prefix)) return

    let money = args.join(" ");
    if (!money) return message.channel.send("Enter the amount you want to deposite.");

    let result = await cs.deposite({
        user: message.author,
        guild: message.guild,
        amount: money
    });
    message.channel.send(result);
}

module.exports.help = {
    name: 'dep',
    aliases: []
}