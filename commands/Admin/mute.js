const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;



// this code check if the member have the perm to mute or the bot hv the perm to mute ppl
    if(!message.member.hasPermission('ADMINISTRATOR')) return;
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
if(member.hasPermission(['ADMINISTRATOR']) && !message.member.hasPermission('ADMINISTRATOR')) return;

//it reorgnize the muted role and the member and add the muted and remove the member role
    let mutedRole = message.guild.roles.cache.get('729068722916032522'); // u put the muted role ID
    let verifiedRole = message.guild.roles.cache.get('729666531067428935'); // the member role ID
    if(mutedRole) {
        member.roles.add(mutedRole);
        member.roles.remove(verifiedRole);
// it will send this message once the bot mute the member
        message.channel.send(`I muted ${member}😂`);
    }

}

module.exports.help = {
    name: `mute`,
    aliases: []
};
