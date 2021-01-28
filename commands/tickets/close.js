const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;

    // getting the tickets category
    const categoryID = message.member.guild.channels.cache.find(c => c.name == "TICKETS")
    
    // if no ticket category return
    if(!categoryID) return;

    // only ppl with this perm can close the ticket 
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

    // if the channel is a ticket then...
    if(message.channel.parentID == categoryID){
    
        // deletes the ticket / channel
        message.channel.delete();
    
    // if its not a ticket channel return
    } else {
        return;
    }
}
module.exports.help = {
    name: "close",
    aliases: []
}