const discord = require("discord.js");
const webhook = new discord.WebhookClient('872372881886158879', 'chVPW1AnuzgxiarsxVs3L8oc360jBJXkvc1yZcR81WMetDokh5Drk-WQwEY95LWvF0FK')
const ms = require('ms')
const got = require('got')

module.exports = () => {
    setInterval(function autoMeme() {
    //     const memeEmbed = new discord.MessageEmbed() // creating an embed
    //     got('https://www.reddit.com/r/meme/random/.json').then(response => { // getting the lin that have the memes
    //     let content = JSON.parse(response.body); // setting the json file that hv the memes
    //     let permalink = content[0].data.children[0].data.permalink; // https://reddit/(this is the permalink) [URL]
    //     let memeURL = `https://reddit.com${permalink}`; // getting the meme URL
    //     let memeImage = content[0].data.children[0].data.url; // getting the meme image
    //     let memeTitle = content[0].data.children[0].data.title; // getting the meme Title
    //     let memeUpvotes = content[0].data.children[0].data.ups; // getting how much likes on the meme
    //     let memeDownvotes = content[0].data.children[0].data.downs; // getting how much dislikes on the meme
    //     let memeNumComments = content[0].data.children[0].data.num_comments; // getting how much comments on the meme
    //     memeEmbed.setTitle(`${memeTitle}`) // the title will be ${memeTitle}
    //     memeEmbed.setURL(`${memeURL}`) // gettin the URL of the meme in the embed         
    //     memeEmbed.setImage(memeImage) // gettin the image in the embed
    //     memeEmbed.setColor('RANDOM') // getting a random embed color
    //     memeEmbed.setFooter(`👍 ${memeUpvotes} | 👎 ${memeDownvotes} | 💬 ${memeNumComments}`)
    //     webhook.send({
    //         embeds: [memeEmbed]
    //     })
    // })

    const array = ['quote1', 'quote2', 'quote3']
    let quote = array[Math.floor(Math.random() * array.length)]
    const embed = new discord.MessageEmbed().setDescription(quote)
    webhook.send({
        embeds: [embed]
    })
    }, ms('5s'))
}

