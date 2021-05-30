const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix, cs) => {
    if(!message.content.startsWith(prefix)) return

    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else if (args[0]) {
        try {
            user = message.guild.members.cache.get(args[0]).user;

        } catch (error) {
            return message.channel.send("This isnt a valid user")
        }
    } else {
        user.id = "1"
    }

    if (user.bot || user === Client.user) return message.channel.send("This user is a bot.");
    if (!Client.users.cache.get(user.id) || !user) return message.channel.send('Sorry, you forgot to mention somebody.');

    let amount = args[1];
    if (!amount) return message.channel.send("Enter amount of money to add.");
    if (amount.includes("-")) return message.channel.send("You can't send negitive money.")
    let money = parseInt(amount);

    let result = await cs.transferMoney({
        user: message.author,
        user2: user,
        guild: message.guild,
        amount: money
    });
    message.channel.send(result);
}

module.exports.help = {
    name: 'give',
    aliases: []
}