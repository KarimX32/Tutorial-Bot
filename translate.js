const discord = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    const txt = args.slice(1).join(" ")
    const lang = args[0]
    if(!lang) return message.channel.send("Please provide a ISO code of the language")
    if(!txt) return message.channel.send("Please provide a text to translate")
    translate(txt, { to: lang }).then(res => {
        const embed = new discord.MessageEmbed()
        .setDescription(res.text)
        .setColor("GREEN")
        message.channel.send(embed); 
      }).catch(err => {
        message.channel.send("Please provide a valid ISO language code")
      });

}

module.exports.help = {
    name: 'translate',
    aliases: []
}

