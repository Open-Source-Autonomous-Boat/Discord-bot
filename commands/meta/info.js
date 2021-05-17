const commando = require('discord.js-commando');
const Discord = require('discord.js');
var owner_discord_id = process.env.OWNER_DISCORD_ID;
const oneLine = require('common-tags').oneLine;
var embed_color = process.env.EMBED;
const fetch = require('node-fetch');
const sqlite = require('sqlite');
const client = new Discord.Client();
sqlite.open("./database.sqlite3");


var name = "info"
module.exports = class InfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: [],
            group: 'meta',
            memberName: 'info',
            description: "Get info on what Mr.Media was coded with.",
            details: "Get info on what Mr.Media was coded with.",
            examples: ["info"]
        });
    }

    async run(msg, { text }) {
        
        // Check Prefix
        var guild_id = msg.channel.guild.id
        var channel_type = msg.channel.type;
        console.log(guild_id)
        var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
        var prefix;


        if (channel_type == "dm") {
            prefix = ""
        }
        else {
            // If undefined, then no special prefixes corresponding to that server were found.
            if (row === undefined) {
                prefix = this.client.commandPrefix;
            }
            else {
                var settings = row.settings;
                var jsonSettings = JSON.parse(settings);
                prefix = jsonSettings.prefix;
            }
        }

        msg.channel.send(
            {
                embed: {
                    color: embed_color,
                    author: {
                        name: this.client.user.username,
                        icon_url: this.client.user.avatarURL
                    },
                    title: `**About Beyond**`,
                    description: "Hey I am OSAB, a discord bot desinged to manage this server!",
                    fields: [{
                        name: "**Command Prefix**",
                        value: `Beyonds's prefix is **${prefix}** or just mention me before a command @OSAB`
                    },
                    {
                        name: "**Get Started**",
                        value: "To get started, just type `" + prefix + "help`"
                    },
                    {
                        name: "**Visit our website!**",
                        value: "https://osab.xyz"
                    }
                            
                   
                    ],
                    footer: {
                        icon_url: this.client.user.avatarURL,
                        text: "Coded by Sirius#3615"
                    }
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
}; 