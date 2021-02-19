const discord = require('discord.js')
const math = require('mathjs')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return;

    var question = args.join(' ') // =calc 1 + 1

    if(!question) return message.channel.send('please provide a maths equation')

    let result;
    try {
        result = math.evaluate(question);


    } catch (e) {
        return message.channel.send('please provide a valid equation') // =calc blblal so it will send this
    }


    return message.channel.send(`${question} = ${result}`)

}




module.exports.help = {
    name: `calculate`,
    aliases: ["calc"]
};
