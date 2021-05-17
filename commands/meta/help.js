const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
var embed_color = process.env.EMBED;
const Discord = require('discord.js');

sqlite.open("./database.sqlite3");

var name = "help"
module.exports = class HelpCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['cmd'],
            group: 'meta',
            memberName: 'help',
            description: "Get a comprehensive list of Mr.Space's commands.",
            details: oneLine`
            Get a comprehensive list of Mr.Space's commands.
            `
        });

    }
  
  
    async run(msg, args) {
        var commands_info = require("../../assets/commands_info.json")
        var channel_type = msg.channel.type;

        

        var prefix;
        var prefix_message = "";
        if (channel_type === "dm") {
            prefix = ""
          
              }
        else if (channel_type === "group") {
            prefix = "@OSAB"
        }
        else {
            // Check Prefix
            var guild_id = msg.channel.guild.id
            console.log(guild_id)
            var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);


            // If undefined, then no special prefixes corresponding to that server were found.
            if (row === undefined) {
                prefix = this.client.commandPrefix;
            }
            else {
                var settings = row.settings;
                var jsonSettings = JSON.parse(settings);
                prefix = jsonSettings.prefix;
            }

            prefix_message = `Just prepend the prefix ${prefix} before any of the following commands:`
        }
       


        if (args.length === 0) {

            // Command Categories
            var search_cmds = "`yt` , `ask` , `img` , `define` , `google` "
            var mod_cmds = "`kick` , `ban` , `purge` , `mute` , `unmute` , `set-nickname` or `nick` , `user` "
            var staff_cmds = " `dm` , `announce` , `set-status` , `poll` , `embed` , `delete` "
            var meta_cmds = "`info` , `server` , `help` , `mail` , `user`"
         
        const helpEmbed = new Discord.MessageEmbed()
            .setColor(embed_color)
            .setTitle("OSAB's Commands")
            .setURL('https://osab.xyz/')
            .setAuthor('OSAB', this.client.user.avatarURL)
            .setDescription(prefix_message)
            .setThumbnail(this.client.user.avatarURL)
            .addFields(
                { name: '**Search Commands** ', value: search_cmds },
                { name: '**Meta Commamds** ', value: meta_cmds},
                { name: '**Moderation Commands**', value: mod_cmds},
                { name: '**Staff Commands** ' , value: staff_cmds},
               )
        
            .setTimestamp()
            .setFooter('!help <command>')

                msg.channel.send({
                embed: helpEmbed
            })

        }

        // Else, they want detailed info on a command.
        else {
            console.log(args);

            var cmd_info = commands_info.commands[0][args];

            console.log(cmd_info)
            if (cmd_info === undefined) {
                msg.reply("❌ Command not found. :(")
            }
            else {
                var args_example_lookup = args + "_examples"
                var examples = commands_info.examples[0][args_example_lookup];
                msg.channel.send({
                    embed: {
                        color: embed_color,
                        author: {
                            name: "Beyond",
                            icon_url: this.client.user.avatarURL
                        },
                        title: `Command Info: ${args}`,
                        description: `${cmd_info}`,
                        fields: [{
                            name: "Examples",
                            value: "`" + `${prefix}${examples}` + "`"
                            
                        },
                        {
                            name: "Prefix ",
                            value: `My  prefix is ${prefix} so prepend this before the command.`
                        }
                        ],
                        footer: {
                            icon_url: this.client.user.avatarURL ,
                            text: "Coded by Sirius#3615"
                        }
                    }
                });
            }
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
}