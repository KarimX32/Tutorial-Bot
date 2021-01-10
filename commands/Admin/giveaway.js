const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {

            if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    
        if(!args[0]) return message.channel.send('You have to say a time!')
        if(!args[0].endsWith("s")&&!args[0].endsWith("h")&&!args[0].endsWith("d")&&!args[0].endsWith("m")) return message.channel.send('You have to say a time!')
        if(isNaN(args[0])) return message.channel.send('You have to say a time!')
    
        let winnerCount = args[1]
        
        let prize = args.slice(2).join(" ")
        if(!args[1]) return message.channel.send('You have to say the total winners that can win!')
        if(!args[2]) return message.channel.send('Say a prize to giveaway!')
        message.delete()
        var ClientEmbed = new Discord.MessageEmbed()
         .setTitle("🎉 **GIVEAWAY** 🎉")
         .setDescription(`
         React with 🎉 to enter!
    
         **Giveaway Prize: **${prize}
         **Giveaway Winners: **${winnerCount}
         **Giveaway Ends: **${args[0]}
         **Giveaway Hosted By: **${message.author}`)
         .setTimestamp(`Ends on ${Date.now()+ms(args[0])}`)
         .setColor("#d98a23")
        var msg = await message.channel.send(ClientEmbed)
        msg.react('🎉')
    
        setTimeout(function () {
    
            var random = 0;
            var winners = [];
            var inList = false;
    
            var peopleReacted = msg.reactions.cache.get("🎉").users.cache.array();
    
            for (let i = 0; i < peopleReacted.length; i++) {
    
                if(peopleReacted[i].id == Client.user.id){
                    peopleReacted.splice(i,1);
                    continue;
                }
            }
    
            if(peopleReacted.length == 0) {
                var non = new Discord.MessageEmbed()
                 .setColor("#ff0000")
                 .setTitle("🎉 **GIVEAWAY ENDS** 🎉")
                 .setDescription(`There are no winners, because no one participated!
                 
                  **Giveaway Hosted By: **${message.author}**`)
                msg.edit(non)
    
                return message.channel.send(`There are no winners, because no one practicipated! :(\n${msg.url}`)
            }
    
            if(peopleReacted.length < winnerCount) {
                var non = new Discord.MessageEmbed()
                 .setColor("#ff0000")
                 .setTitle("🎉 **GIVEAWAY ENDS** 🎉")
                 .setDescription(`There are no winners, because no one participated!
                 
                  **Giveaway Hosted By: **${message.author}`)
                msg.edit(non)
    
                return message.channel.send(`There are no winners, because no one practicipated! :(\n${msg.url}`)
            }
    
            for (let y = 0; y < winnerCount; y++) {
    
                inList = false;
    
                random = Math.floor(Math.random() * peopleReacted.length);
    
                for (let o = 0; o < winners.length; o++) {
    
                    if(winners[o] == peopleReacted[random]){
                        inList = true;
                        y--;
                        break;
                    }
                }
    
                if(!inList){
                    winners.push(peopleReacted[random]);
                }
            }
    
            var response = ``
    
            for (let y = 0; y < winners.length; y++) {
    
                response += `${winners[y]}\n`
                   
                var embed = new Discord.MessageEmbed()
                 .setColor("#d98a23")
                 .setTitle("🎉 **GIVEAWAY ENDS** 🎉")
                 .setDescription(`---------------------------------
    
                 **${prize}**
    
                 **Winners:**
                 ${response}
                 **Giveaway Hosted By: ** ${message.author}`)
                msg.edit(embed)
        
                message.channel.send(`**Congratulations:**\n${response}You've won... **${prize}**.\n${msg.url}`)
            }
            
            
        }, ms(args[0]));
}


module.exports.help = {
    name: `giveaway`,
    aliases: []
};
