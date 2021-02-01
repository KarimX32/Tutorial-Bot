const Discord = require('discord.js');
const got = require('got')

module.exports.run = async (Client, message, args, prefix) => { // for my cmds handler

    if(!message.content.startsWith(prefix)) return; // checking that the command starts with the prefix, if not return

const memeEmbed = new Discord.MessageEmbed() // creating an embed
    
    got('https://www.reddit.com/r/meme/random/.json').then(response => { // getting the lin that have the memes

        let content = JSON.parse(response.body); // setting the json file that hv the memes

        let permalink = content[0].data.children[0].data.permalink; // https://reddit/(this is the permalink) [URL]

        let memeURL = `https://reddit.com${permalink}`; // getting the meme URL

        let memeImage = content[0].data.children[0].data.url; // getting the meme image

        let memeTitle = content[0].data.children[0].data.title; // getting the meme Title

        let memeUpvotes = content[0].data.children[0].data.ups; // getting how much likes on the meme

        let memeDownvotes = content[0].data.children[0].data.downs; // getting how much dislikes on the meme

        let memeNumComments = content[0].data.children[0].data.num_comments; // getting how much comments on the meme

        memeEmbed.setTitle(`${memeTitle}`) // the title will be ${memeTitle}
        memeEmbed.setURL(`${memeURL}`) // gettin the URL of the meme in the embed         
        memeEmbed.setImage(memeImage) // gettin the image in the embed
        memeEmbed.setColor('RANDOM') // getting a random embed color
        memeEmbed.setFooter(`👍 ${memeUpvotes} | 👎 ${memeDownvotes} | 💬 ${memeNumComments}`)

        message.channel.send(memeEmbed) // sending the embed
    })
}



module.exports.help = {
    name: "meme", // name of the cmd
    aliases: [] // another names for the cmd
}