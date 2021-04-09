const Discord = require('discord.js') // defining discord

module.exports.run = async (Client, message, args, prefix) => { // cmd handler
    if(!message.content.startsWith(prefix)) return; // making sure that the msg starts with the prefix

    let role; // defining role as blank so we can define it multiple times

    if (!args[0]) return message.reply('you need to provide a role, name, id') // =role [args0] || if no args[0] send this

    if(args[0] && isNaN(args[0]) && message.mentions.roles.first()) role = message.mentions.roles.first() // if there is args[0] and NaN = no a number and there is a role mentioned in the msg, so the role var will be defined as the role that got mentioned in the msg

    if(args[0] && isNaN(args[0]) && !message.mentions.roles.first()){ // if there is arg[0] and it is not a number and there is no role that got mentioned in the msg so > 

      // so role will be define as this:
      // it gonna search for the role by the name without pinging it
      role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim()) 

      // if it didn't find the role, it gonna send role not found
      if(!message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == args.slice(0).join(" ").toLowerCase().trim())) return message.reply("Role not found")
    }

    // if there is arg[0] + its a Number
    if(args[0] && !isNaN(args[0])){

      // it gonna define role as, so it gonna go the server and search in the roles id for args[0] that should be the role id
      role = message.guild.roles.cache.find(e => e.id == args[0])

      // if it didnt find it, it gonna send this:
      if(!message.guild.roles.cache.has(args[0])) return message.reply("the id is invalid")
    }
  
    // if there is no role var it will send this
    if(!role) return message.reply("You must mention role, give ID, or say the name at least")


  let WithRole; // defining the people with role var

  // if the amount of people who have the role is more then 5 so show this
  if(role.members.size > 5) WithRole = role.members.map(e => `<@${e.id}>`).slice(0,5).join(", ") + ` and ${role.members.size - 5} more members...` 

  // if not show them all
  if(role.members.size < 5) WithRole = role.members.map(e => `<@${e.id}>`).join(", ")
    
  // create an embed
    let embed = new Discord.MessageEmbed()
    .setColor(role.color) // the color of the embed will be the role color
    .setAuthor(message.guild.name, message.guild.iconURL()) 
    .setDescription(`**Role Name:** ${role.name}, (<@&${role.id}>)

    **Role ID:** **\`${role.id}\`**

    **Role Mentionable:** ${role.mentionable.toString().replace("true","Yes").replace("false","No")}

    **Role Members Size:** ${role.members.size || 0}`)

  .addField("Role Members:",WithRole ? WithRole : "No one have the role")
  
    message.channel.send(embed) // then it gonna send the embed
  }

module.exports.help = {
    name: "role",
    aliases: [],
}
