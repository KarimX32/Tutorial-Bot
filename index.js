const Discord = require('discord.js')
const config = require('./config.json');
const Client = new Discord.Client({disableEveryone: true});
Client.commands = new Discord.Collection();
const fs = require('fs');
require("./mongo")()
Client.aliases = new Discord.Collection();
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
cs.connect(config.mongoPath);

fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }
        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`File ${file} was loaded`)
            try {
                Client.commands.set(fileGet.help.name, fileGet);
                fileGet.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileGet.help.name);
                })
            } catch (err) {
                return console.log(err);
            }
        });
    });
});




Client.on("ready", async () => {
    console.log(`${Client.user.username} is Online!`)
    Client.user.setActivity("UltraX", {type: "WATCHING"})
});



Client.on("message", async message => {
    if(message.author.Client || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));
    if(commands) commands.run(Client, message, args, prefix, cs);
})


Client.login(config.token);