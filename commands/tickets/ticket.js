const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;

    // getting in the ticket category
    const categoryID = message.member.guild.channels.cache.find(c => c.name == "TICKETS")

    // if there is no ticket category return
    if(!categoryID) return;

    // getting the username of the member who created the ticket
    var userName = message.author.username;
    
    // getting the Discriminator (KarimX#9586) of the ticket creator
    var userDiscriminator = message.author.discriminator;

    // making the var for the funtion
    var ticketexist = false;

    // getting all the channels in the server
    message.guild.channels.cache.forEach(channel => {
        
        // making sure that the user dont already have a ticket
        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator){
        
            // setting it to true so there is already a ticket
            ticketexist = true;

            // returning the cmd
            return;
        }
    });

    // if the user already have a ticket return ( dont create another ticket for him)
    if(ticketexist) return;

    // making the ticket channel
    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
        (createdChannel) => {
            // when it creates a ticket, it will create a category and name it ticket and put the ticket there
            createdChannel.setParent(categoryID).then(
                (settedParent) => {
                    // setting the perms for the channel so no one can see it
                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    // setting the perm so the ticket creator can see it and send msgs in it
                    settedParent.updateOverwrite(message.author.id,{
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    // sending a embed when someone creates a ticket 
                    var ticketEmbed = new discord.MessageEmbed()
                    .setTitle(`Welcome in your ticket ${message.author.username}`)
                    .setDescription(`Send here your message or question!`)
                    .setTimestamp()
                    settedParent.send(ticketEmbed)
                }
            ).catch(err => {
                // if err console err
                return console.log(err)
            });
        }
    ).catch(err => {
        // if err console err
        return console.log(err)
    });

}

module.exports.help = {
    name: "ticket",
    aliases: []
}

