// connecting to discord
const Discord = require('discord.js')

// create a new Discord Client 
const Client = new Discord.Client({disableEveryone: true, partials: ['MESSAGE', 'REACTION']});

// we make a new system for the cmds
Client.commands = new Discord.Collection();

// require the fs module
const fs = require('fs');

// connect us to the config.json file
const config = require('./config.json');

const db = require('quick.db')

// it creates a new function for our aliases
Client.aliases = new Discord.Collection();

const cooldown = new Set();

const Canvacord = require('canvacord');

const map = new Map();

const fetch = require('node-fetch')

const snipes = new Discord.Collection()

const ms = require('ms')

const { passGen } = require("ultrax")
require('discord-buttons')(Client)
const { MessageButton, MessageActionRow } = require("discord-buttons")



Client.on('clickButton', async (button) => {
    if(button.id == '1') {

        button.defer()
        const embed = new Discord.MessageEmbed()
        .setTitle("Neat")
        .setDescription("Alright you know what to do!")
        .setColor("GREEN")

        const CHANNEL = new MessageButton()
        .setStyle("url")
        .setLabel("Subscribe")
        .setURL("https://youtube.com/UltraX1")



        button.message.edit({
            embed: embed,
            component: CHANNEL
        })
    }

    if(button.id == '2') {
        button.defer()

        button.channel.send(`${button.clicker.user.tag}, Alright you're stupid`)
    }

    if(button.id == 'AddXRole') {
        button.reply.send(`You got the "x" role!`, true)
        const role = button.guild.roles.cache.get("729670291768213514")
        const member = button.clicker.member
        await member.roles.add(role)
    }

    if(button.id == 'RevXRole') {
        button.reply.send(`Removed "x" role!`, true)
        const role = button.guild.roles.cache.get("729670291768213514")
        const member = button.clicker.member
        await member.roles.remove(role)
    }
});


Client.on('messageDelete', message => {
    snipes.set(message.channel.id, message)

    const LogChannel = Client.channels.cache.get('831515040472760380')
    const DeletedLog = new Discord.MessageEmbed()
    .setTitle("Deleted Message")
    .addField('Deleted by', `${message.author} - (${message.author.id})`)
    .addField("In", message.channel)
    .addField('Content', message.content)
    .setColor('RANDOM')
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    try {
        LogChannel.send(DeletedLog)

    } catch (error) {
        console.log(' ')
    }

})

Client.on('messageUpdate', async(oldMessage, newMessage) => {
    const LogChannel = Client.channels.cache.get('831515040472760380')
    const EditedLog = new Discord.MessageEmbed()
    .setTitle("Edited Message")
    .addField('Edited by', `${oldMessage.author} - (${oldMessage.author.id})`)
    .addField("In", oldMessage.channel)
    .addField('Old Message', oldMessage.content)
    .addField('New Message', newMessage.content)
    .setColor('RANDOM')
    .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
    try{
        await LogChannel.send(EditedLog)
    } catch(e) {
        console.log(' ')
    }

})





Client.on("guildMemberAdd", async member => {
    let guild = Client.guilds.cache.get('728751693503922190')
    let role = guild.roles.cache.get("729670291768213514")

    await member.roles.add(role.id)
})




Client.on('messageReactionAdd', async (reaction, user) => {
    const handleStarboard = async () => {
        const SBChannel = Client.channels.cache.find(channel => channel.name.toLowerCase() === 'starboard');
        const msgs = await SBChannel.messages.fetch({ limit: 100 });
        const SentMessage = msgs.find(msg => 
            msg.embeds.length === 1 ?
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(SentMessage) SentMessage.edit(`${reaction.count} - ⭐`);
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
            .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
            .setColor('YELLOW')
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(SBChannel)
            SBChannel.send('1 - ⭐', embed);
        }
    }
    if(reaction.emoji.name === '⭐') {
        if(reaction.message.channel.name.toLowerCase() === 'starboard') return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
        handleStarboard();
    }
});




Client.on("guildCreate", guild => {
    const embed = new Discord.MessageEmbed()
    .setTitle("I'm added to a new server!")
    .setColor("GREEN")
    .setDescription(`I'm added to ${guild.name}, with ${guild.memberCount}\n\nTotal server: ${Client.guilds.cache.size}\nTotal users: ${Client.users.cache.size}`)
    .setTimestamp()
    const LogChannel = Client.channels.cache.get('831515040472760380')
    LogChannel.send(embed)
})


Client.on("guildDelete", guild => {
    const embed = new Discord.MessageEmbed()
    .setTitle("I left a server")
    .setColor("RED")
    .setDescription(`I left ${guild.name}, that had ${guild.memberCount}\n\nTotal server: ${Client.guilds.cache.size}\nTotal users: ${Client.users.cache.size}`)
    .setTimestamp()
    const LogChannel = Client.channels.cache.get('831515040472760380')
    LogChannel.send(embed)
})






Client.on('guildMemberAdd', async (member) => {
    const captcha = passGen(6)
    try {
        const msg = await member.send(`||${captcha}||, This is your captcha, you have 1m to solve it!`)
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send("You entered the captcha wrong!") 
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: ms('15s'), errors: ['time'] });
            if(response) {
                await msg.channel.send("You entered captcha correctly, You have verified yourself!")
                member.roles.add('729670291768213514')
            }
        } 
        catch (err) {
            await msg.channel.send("You didn't solve the captcha on time, you got kicked from the server")
            await member.kick()
        }
    } 
    catch (err) {
        console.log(err)
    }

    
    await Client.channels.cache.get('826011449176358922').setName(`🌍 Total: ${member.guild.memberCount}`)
    await Client.channels.cache.get('826011498849370133').setName(`👤 Users: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
    await Client.channels.cache.get('826011543447011338').setName(`🤖 Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`)
})


Client.on('guildMemberRemove', async (member) => {
    await Client.channels.cache.get('826011449176358922').setName(`🌍 Total: ${member.guild.memberCount}`)
    await Client.channels.cache.get('826011498849370133').setName(`👤 Users: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
    await Client.channels.cache.get('826011543447011338').setName(`🤖 Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`)
})




// Commands Handler 

// get into the cmds folder
fs.readdirSync('./commands/').forEach(dir => {

    //in the cmds folder, we gonna check for the category
    fs.readdir(`./commands/${dir}`, (err, files) => {

        // console log err (catch err)
        if (err) throw err;

         // checking if the files ends with .js if its a javascript file
        var jsFiles = files.filter(f => f.split(".").pop() === "js");

         // if there is no cmds in the file it will return
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }

        
        jsFiles.forEach(file => {

            // console the loaded cmds 
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`File ${file} was loaded`)

            // gonna let the cmds run
            try {
                Client.commands.set(fileGet.help.name, fileGet);

                // it search in the cmds folder if there is any aliases
                fileGet.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileGet.help.name);
                })

            } catch (err) {
              // catch err in console  
                return console.log(err);
            }
        });
    });
});




// The message that we will get in terminal when we lunch the bot
Client.on("ready", async () => {
    console.log(`${Client.user.username} is Online!`)
    // This Will be the Status Of our Bot
    Client.user.setActivity("UltraX", {type: "WATCHING"})

});






Client.on("message", async (message, guild) => {
    const Blacklisted = db.fetch(`blacklistedUsers_${message.author.id}`)
    if(message.author.Client || message.author.bot) return;
    if(Blacklisted == true) return
    if(message.channel.type === "dm") {
        const dmEmbed = new Discord.MessageEmbed()
        .setTitle('New DM')
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`**User:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**At:** ${new Date()}\n\n**Content:** \`\`\`${message.content}\`\`\``)
        
        const DMC = Client.channels.cache.get('830362736420061225')
        DMC.send(dmEmbed)
    }


    const InviteLinks = ['discord.gg/', 'discord.com/invite/', 'discordapp.com/invite/']

    if(InviteLinks.some(link => message.content.toLowerCase().includes(link))) {
        const UserCode = message.content.split('discord.gg/' || 'discord.com/invite/' || 'discordapp.com/invite/')[1]
        message.guild.fetchInvites().then(invites => {
            let InviteArray = []
            for (let inviteCode of invites) {
                InviteArray.push(inviteCode[0])
            }
            if(!InviteArray.includes(UserCode)) {
                message.delete()
                return message.channel.send("Please dont send link of other servers")
            }
        })

    }


    if(message.channel.id === '831883601942544454') {
        fetch.default(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
        .then(res => res.json())
        .then(data => {
            message.channel.send(data.response)
        })
    }

    // deleting his afk if he send a msg

    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) { // if he has afk
        const oldReason = db.get(`afk-${message.author.id}+${message.guild.id}`) // get the reason 
        await db.delete(`afk-${message.author.id}+${message.guild.id}`) // delete it after u get it
        message.reply(`you aren't afk anymore, that was the reason:\n ${oldReason}`) // send this msg
    }


    // checking if someone mentioned the afk person

    if(message.mentions.members.first()) { // if someone mentioned the person
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) { // db will check if he is afk
            message.channel.send(message.mentions.members.first().user.tag + " : " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) // if yes, it gets from the db the afk msg and send it
        }
     }

    let prefix;
// no one did =setprefix
    let prefixes = await db.fetch(`prefix_${message.guild.id}`);
    if(prefixes == null) {
        prefix = "=" // this will be the default prefix
    } else {
        prefix = prefixes;
    }
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    // it will make the cmd work with him orginal name and his aliases
    let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));

    if(commands) {
        let commandFetch = db.fetch(`commandToggle_${message.guild.id}`)
        if(commandFetch == null) commandFetch = []
        if(commandFetch.includes(commands.help.name)) return message.channel.send("This command is disabled")
        commands.run(Client, message, args, prefix)
    }


    if(message.content.startsWith(`${prefix}snipe`)) {
        let snipe = snipes.get(message.channel.id)
        if(!snipe) return message.channel.send('there is nothing that got deleted')

        const snipeEmbed = new Discord.MessageEmbed()
        .setAuthor(`Message By ${snipe.author.tag}`, snipe.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(snipe.content)
        message.channel.send(snipeEmbed)
    }



    xp(message)
    if(message.content.startsWith(`${prefix}rank`)) {
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
    const rankcard = new Canvacord.Rank()
        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#a81d16", "COLOR")
        .setOverlay("#000000")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("COLOR", "#808080")
        rankcard.build()
        .then(data => {
            const atta = new Discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }

    function xp(message) {
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Congrats ${message.author}, you leveled up, you are now level ${newLevel}`)
        }
    }

    // if a member sent 5 msgs in 5 seconds and every msg hv less then 2 seconds, it gonna mute him!
    if(map.has(message.author.id)) {
        const data = map.get(message.author.id)
        const { lastmsg, timer } = data;
        const diff = message.createdTimestamp - lastmsg.createdTimestamp;
        let msgs = data.msgs
        if(diff > 2000) {
            clearTimeout(timer);
            data.msgs = 1;
            data.lastmsg = message;
            data.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, 5000)
            map.set(message.author.id, data)
        } else {
            ++msgs;
            if(parseInt(msgs) === 5) {
                const rolename = 'mute' || 'muted'
                const role = message.guild.roles.cache.find(roles => roles.name.toLowerCase() === rolename.toLowerCase())
                message.member.roles.add(role)
                message.channel.send(`Muted ${message.author.username}, for spamming`)
                setTimeout(() => {
                    message.member.roles.remove(role)
                    message.channel.send(`Unmuted ${message.author.username}`)
                }, 5000)
            } else {
                data.msgs = msgs;
                map.set(message.author.id, data)
            }
        }
    } else {
        let remove = setTimeout(() => {
            map.delete(message.author.id);
        }, 5000)
        map.set(message.author.id, {
            msgs: 1,
            lastmsg: message,
            timer: remove
        })
    }
});








// Login To Discord with your app's Token

Client.login(config.token)






