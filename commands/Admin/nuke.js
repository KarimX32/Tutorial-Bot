const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;

    // if the member don't have this perm return by sending this msg
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have the perms for the nuke command')

    // getting the channel's id that is gonna be nuked
    var channel = Client.channels.cache.get(message.channel.id)

    // getting the position of the channel by the category
    var posisi = channel.position

   // clonning the channel
    channel.clone().then((channel2) => {
        
        // sets the position of the new channel
        channel2.setPosition(posisi)

        // deleting the nuked channel
        channel.delete()

        // sending a msg in the new channel
        channel2.send(`Nuked this channel`).then(
          
            // sends a GIF in the new channel
            channel2.send(`https://tenor.com/view/explosion-explode-clouds-of-smoke-gif-17216934`)
        )
    })
}
    


module.exports.help = {
    name: `nuke`,
    aliases: ['destroy']
}