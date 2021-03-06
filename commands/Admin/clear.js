const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
     if(!message.content.startsWith(prefix)) return;

     // check if the person has perm.
     if (!message.member.permissions.has("MANAGE_MESSAGES", "ADMINSTRATOR")) // sets the perm.
     return message.channel.send(
         `You do not have correct permissions to do this action, ${message.author.username}` // return this msg if the user dont hv perm
     );

 // if he didnt say how much msgs he wanna delete (e.g. =clear )
 if (!args[0]) {
     return message.reply(`Please enter a amount between 1 to 100`) // of he didnt provide a number to delete send this
 }
 
 // defining the delete amount
 let deleteAmount;
 
 // if the args is higher then 100 set the deleted amount to 100, because you can't delete more then 100 per time
 if (parseInt(args[0]) > 100 ) {
     deleteAmount = 100;


 } else {


    // (e.g. =clear blala ) if someone didn't say a number to delete it will send this!
     if(isNaN(args[0])) return message.channel.send('Yo mate say a number to delete messages!')
    
     // else if the args is not higher then 100 just set the deleted msgs to args 
     deleteAmount = parseInt(args[0]);
 }
 
 // deleteing the total msgs (the amount you want) from the channel
 message.channel.bulkDelete(deleteAmount, true);

 // sends a msg when the msgs are deleted
 message.reply(`**Successfully** Deleted ***${deleteAmount}*** Messages.`)
 }
 



module.exports.help = {
    name: `clear`,
    aliases: ['purge', 'delete'] // if someone typed (e.g. =purge 10 or =delete 10) it will do the same as =clear
};
