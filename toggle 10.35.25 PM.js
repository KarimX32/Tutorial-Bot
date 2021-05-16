const discord = require('discord.js')
const db = require("quick.db")

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You dont have perm to execute this command")

    function cmdName(x) {
        let a = false
        Client.commands.forEach(y => {
            if(y.help.name === x) a = y.help.name;
        });
        return a
    }
    // =toggle on/off cmdName 
    if(!args[1]) return message.channel.send("Please provide a command name")
    if(args[1] === 'toggle') return message.channel.send("You can't disable this command")

    if(args[0] == 'on') {
        if(!await cmdName(args[1])) return message.channel.send("No command found with that name!")
        let commandFetch = db.fetch(`commandToggle_${message.guild.id}`)
        if(commandFetch == null) commandFetch = []
        if(!commandFetch.includes(await cmdName(args[1]))) return message.channel.send('This command is already on')
        const Filtered = commandFetch.filter(x => x !== args[1])
        db.set(`commandToggle_${message.guild.id}`, Filtered)
        return message.channel.send("Successfully enabled this command!")
    } 

    else if(args[0] == 'off') {
        if(!await cmdName(args[1])) return message.channel.send("No command found with that name!")
        let commandFetch = db.fetch(`commandToggle_${message.guild.id}`)
        if(commandFetch == null) commandFetch = []
        if(commandFetch.includes(await cmdName(args[1]))) return message.channel.send('This command is already off')
        db.push(`commandToggle_${message.guild.id}`, cmdName(args[1]))
        return message.channel.send("Successfully disabled this command!")
    } 
    
    else return message.channel.send('Please specify on/off')

}

module.exports.help = {
    name: 'toggle',
    aliases: []
}