const discord = require('discord.js')


module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return;


    const UltraX = new discord.MessageEmbed()
    .setTitle('This is a a title.') // sets the title for the embed
    .setURL('http://youtube.com/c/UltraX1') // sets the URL for the title
    .setAuthor('UltraX', message.author.displayAvatarURL()) // set the author with his avatar
    .setDescription('This is a Description') // sets the description
    .setColor('#00ff00') // color
    .setThumbnail('https://cdn.osxdaily.com/wp-content/uploads/2016/10/YouTube-icon-full_color-610x430.png') // sets the thumbnail 
    .setImage('https://cdn.osxdaily.com/wp-content/uploads/2016/10/YouTube-icon-full_color-610x430.png') // sets an image 
    .setFooter('This is a example footer', 'https://cdn.osxdaily.com/wp-content/uploads/2016/10/YouTube-icon-full_color-610x430.png') // sets a footer
    .addFields(
        { name: 'Test Number 1', value: 'This is a example value', inline: true}, // Fields, inline: true mean they will be in the same line
        { name: 'Test Number 2', value: 'This is a example value', inline: true},
        { name: 'Test Number 3', value: 'This is a example value'},
        { name: 'Test Number 4', value: 'This is a example value'})
    .setTimestamp() // put when the msg got sent
    

    message.channel.send(UltraX) // sends the embed

}


module.exports.help = {
    name: `embed`,
    aliases: []
};
