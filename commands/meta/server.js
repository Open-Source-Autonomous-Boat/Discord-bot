const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
var embed_color = process.env.EMBED;

var name = "server"
module.exports = class ServerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'server',
            aliases: [],
            group: 'meta',
            memberName: 'server',
            description: "Get server stats, such as member count, when the server was created, and more...",
            details: "Get server stats, such as member count, when the server was created, and more...",
            examples: ["server"],

        });
    }

    async run(msg, args) {
        // Necessary for choosing random colours for rich embeds


        var guild = msg.guild;
        msg.channel.send(
            {
                embed: {
                    color: embed_color,
                    author: {
                        name: guild.name,
                        icon_url: guild.iconURL
                    },
                    title: `**Server Stats for ${guild.name}**`,
                    fields: [
                        {
                            name: `**Created At**`,
                            value: `${guild.createdAt}`,
                        },
                        {
                            name: "**Owner**",
                            value: `${guild.owner.user.username}`
                        },
                        {
                            name: "**Member Count**",
                            value: `${guild.memberCount}`
                        },
                      {
                            name: "**Roles Count**",
                            value: `This server has **${guild.roles.cache.size}** roles`
                        },
                      {
                            name: "**Emoji Count**",
                            value: `This server has **${guild.emojis.cache.size}** emojis`
                        },
                      {
                            name: "**Server Location**",
                            value: `${guild.region}`
                        }


                      

                    ]
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};