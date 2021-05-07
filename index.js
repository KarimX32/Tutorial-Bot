// connecting to discord
const Discord = require('discord.js')

// connect us to the config.json file
const config = require('./config.json');

// create a new Discord Client 
const Client = new Discord.Client({disableEveryone: true});

// we make a new system for the cmds
Client.commands = new Discord.Collection();

// require the fs module
const fs = require('fs');

const mongodb = require('./mongo')()

const PrefixSchema = require('./schema/PrefixSchema')

// it creates a new function for our aliases

Client.aliases = new Discord.Collection();

const cooldown = new Set();

const AFKS = require("./schema/afk-schema")

const userSchema = require("./schema/user-schema")

// Welcome message 

Client.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'cool')
    welcomeChannel.send (`welcome! ${member}`)
})

// Bye Message

Client.on("guildMemberRemove", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'cool')
    welcomeChannel.send (`Goodbye! ${member}`)
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

    if(message.author.Client || message.channel.type === "dm") return;

    let UserData;
    try {
        UserData = await userSchema.findOne({
            userId: message.author.id
        })
        if(!UserData) {
            UserData = await userSchema.create({
                userId: message.author.id
            })
        }
    } catch (error) {
        console.log(error)
    }
    if(UserData.blacklisted == true) return //message.channel.send("you're blacklisted")



    let prefix;
    let data = await PrefixSchema.findOne({
        _id: message.guild.id
    })
    if(data === null) {
        prefix = "="
    } 
    else {
        prefix = data.newPrefix
    } 
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)








    // it will make the cmd work with him orginal name and his aliases
    let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));

    if(commands) commands.run(Client, message, args, prefix);

    
    if(message.content.startsWith(`${prefix}test`)) {
        if(cooldown.has(message.author.id)) {
            message.reply('Please wait you are on cooldown')
        } else {
            message.channel.send('the test command is working!')
            cooldown.add(message.author.id)
            setTimeout(() => {
                cooldown.delete(message.author.id)
            }, 5000);
        }
    }


})








// Login To Discord with your app's Token

Client.login(config.token)

