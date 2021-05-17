const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;

var name = "delete"
module.exports = class CatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "delete",
            aliases: [],
            group: 'moderation',
            memberName: 'delete',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['ADMINISTRATOR'],
            description: "deletes a private channel for you  ",
            details: "deletes a private channel for you ",
            examples: ["delete"],
            cooldown: 7000,
          args: [
                    {
          key: 'reason',
          prompt: 'Are you sure you wanna **__DELETE THIS CHANNEL?!__** (respond with anything to continue, and `cancel` to not do it) \n',
          type: 'string'
          
        },
            {
          key: 'last',
          prompt: 'You are **100%** sure you wanna **__DELETE THIS CHANNEL?!__** (respond with anything to continue) \n',
          type: 'string'
          
        }
          ]
          
          

        });
    }

     async run(msg, { user }) {
       
       const member = msg.author;
        


  msg.channel.delete();

member.send('You succesfuly delted a channel!')

       const logembed = new Discord.MessageEmbed()
          .addField(`**User: <@!${msg.author.id}> Deleted a channel!**`, `Blame him for that!`)
          .setTimestamp()
          .setColor(embed_color);
    
        msg.client.channels.cache.get(log_channel).send({ embed: logembed});
       
    
        
    }
    };

