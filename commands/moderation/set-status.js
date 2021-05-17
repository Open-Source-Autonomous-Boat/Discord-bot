const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const JSONdb = require('simple-json-db');
const db = new JSONdb('./database.json');
var embed_color = process.env.EMBED;
var log_channel = process.env.LOGGING_CHANNEL_ID;


module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'set-status',
      aliases: [],
      memberName: 'ser-status',
      group: 'moderation',
      description:
        'Set bot status',
      guildOnly: true,
      userPermissions: ['ADMINISTRATOR'],
      clientPermissions: ['MANAGE_ROLES'],
      args: [
        {
          key: 'type',
          prompt:
            'Please select what is the type of the status! (PLAYING , WATCHING , LISTENING) ! \n',
          type: 'string'
        },
        {
          key: 'text',
          prompt: 'What should the status say? \n',
          type: 'string',
          
          
        }
      ]
    });
  }

  async run(message, { type, text }) {
    
   const if_has_txt = db.has('status_txt');
    const if_has_type = db.has('status_type');
    
    if (if_has_txt === true) {
      if (if_has_type === true){
        db.delete('status_txt');
        db.delete('status_type');
        
        db.set('status_txt', text);
        db.set('status_type', type);
      }
    } else {
        db.set('status_txt', text);
        db.set('status_type', type);
    }
    
      
        const muteEmbed = new Discord.MessageEmbed()
          .addField('🖊️ Status set to:', text)
          .addField('Status', type)
          .addField('Moderator', `<@${message.author.id}>`)
          .setTimestamp()
          .setColor(embed_color);
        message.channel.send(muteEmbed);
      
      message.client.channels.cache.get(log_channel).send({ embed: muteEmbed});
    
    await process.exit();
      
  }
};