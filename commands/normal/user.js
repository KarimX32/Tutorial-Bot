const discord = require('discord.js'); 
const moment = require("moment");

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // make sure its starts with the prefix

    
    let mentionedMember = message.mentions.members.first() || message.member; // wehnever i type mentioned member that mean message.mentions.members.first() || message.member

    
    var game = mentionedMember.presence.game // whenever i type game, it makes ref. to the game the person is playing

    
    var status = mentionedMember.presence.status; // whenever i type status, it makes ref. to the user's status
    
    // organising the code so it don't look bad
    if(status == 'dnd') status = "Do Not Disturb" // if the person is dnd  so it will type in the embed Do no Distrub
    if(status == 'online') status = "Online"
    if(status == 'offline') status = "Offline"
    if(status === 'idle') status = "Idle"

    
    const roles = mentionedMember.roles.cache // getting the roles of the person
    .sort((a, b) => b.position - a.position)
    .map(role => role.toString())
    .slice(0, -1);

    let displayRoles;

    // if he have less then 20 role, display it
    if(roles.length < 20) {
        displayRoles = roles.join(' ')
        if(roles.length < 1) displayRoles = "None" // if no roles say None

    } else {

        // if he have more then 20 just display 20 roles
        displayRoles = roles.slice(20).join(' ')
    }

    
    const userEmbed = new discord.MessageEmbed() // create an embed
     .setAuthor(`User information of ${mentionedMember.user.username}`, mentionedMember.user.displayAvatarURL({dynamic: true, size: 2048})) // User information of: KarimX and it will display my pfp
     .addField(`**Tag: **`, `${mentionedMember.user.tag}`) // it will show my tags (e.g. KarimX#9586)
     .addField(`**Username: **`, mentionedMember.user.username || "None") // show the username 
     .addField(`**ID: **`, `${mentionedMember.id}`) // show the ID
     .addField(`**Avatar: **`, `[Click here to view Avatar](${mentionedMember.user.displayAvatarURL({ dynamic: true})})`) // show the person avatar in a link
     .addField(`**Status: **`, `${status}`) // the status of the user
     .addField(`**Game: **`, `${game || 'None'}`) // what is he playing
     .addField(`**Account Created At: **`, `${moment(mentionedMember.createdAt).format("DD-MM-YYYY [at] HH:mm")}`) // when did the acc got created
     .addField(`**Joined The Server At: **`, `${moment(mentionedMember.joinedAt).format("DD-MM-YYYY [at] HH:mm")}`) // when did he join the server
     .addField(`**Roles: [${roles.length}]**`, `${displayRoles}`)  // display his roles
    message.channel.send(userEmbed) // sends the embed
    
}

module.exports.help = {
    name: "user",
    aliases: ["who", 'whois']
}